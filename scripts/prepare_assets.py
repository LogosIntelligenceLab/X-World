"""Prepare web derivatives without changing the manuscript or source recordings."""
from pathlib import Path
import argparse
import json
import subprocess
import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--paper-root', type=Path, default=ROOT.parent / 'ICLR2027_XWorld')
args = parser.parse_args()
paper = args.paper_root
assets = ROOT / 'docs' / 'assets'
for directory in ('images', 'videos', 'posters', 'papers'):
    (assets / directory).mkdir(parents=True, exist_ok=True)

figures = {
    'overview': 'build/figure-typography/pipeline-consistent.pdf',
    'multi-view-blocks': 'build/arxiv/figures/genie-mask-trimmed.pdf',
    'robot-platform': 'build/arxiv/figures/real-world-setup-ppt.pdf',
    'real-world-results': 'build/arxiv/figures/real-world-results-original-bars.pdf',
    'view-and-prefix-analysis': 'build/arxiv/figures/additional-results-original-bars.pdf',
    'video-predictions': 'build/arxiv/figures/video-generation-ppt.pdf',
    'real-world-predictions': 'build/arxiv/figures/real-video-ppt.pdf',
}
audit = {'figures': [], 'videos': []}
for name, relative in figures.items():
    source = paper / relative
    doc = fitz.open(source)
    page = doc[0]
    width = 2200 if name not in ('video-predictions', 'real-world-predictions') else 1600
    pix = page.get_pixmap(matrix=fitz.Matrix(width / page.rect.width, width / page.rect.width), alpha=False)
    output = assets / 'images' / f'{name}.webp'
    Image.frombytes('RGB', [pix.width, pix.height], pix.samples).save(output, 'WEBP', lossless=True, method=6)
    audit['figures'].append({'file': output.relative_to(ROOT).as_posix(), 'source': relative, 'width': pix.width, 'height': pix.height, 'bytes': output.stat().st_size})

tasks = [
    ('stack-bowl-and-block', '01_stack_bowl_and_block.mp4'),
    ('bottle-to-trash', '02_put_bottle_into_trash_can.mp4'),
    ('pour-teapot', '03_pour_water_from_teapot.mp4'),
    ('bowl-to-tray', '04_move_bowl_into_tray.mp4'),
    ('stack-blocks', '05_stack_two_blocks.mp4'),
    ('clear-table', '06_clear_the_table.mp4'),
]
for slug, original in tasks:
    source = paper / 'supplementary-material' / original
    target = assets / 'videos' / f'{slug}.mp4'
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', str(source), '-map', '0:v:0', '-c:v', 'copy', '-an', '-movflags', '+faststart', str(target)], check=True)
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-ss', '2', '-i', str(source), '-frames:v', '1', '-quality', '92', str(assets / 'posters' / f'{slug}.webp')], check=True)
    info = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration:stream=width,height,codec_name', '-of', 'json', str(target)]))
    audit['videos'].append({'file': target.relative_to(ROOT).as_posix(), 'source': original, 'stream_copied': True, 'metadata': info, 'bytes': target.stat().st_size})
(ROOT / '_local').mkdir(exist_ok=True)
(ROOT / '_local' / 'media-audit.json').write_text(json.dumps(audit, indent=2), encoding='utf-8')
print(json.dumps({'figures': len(audit['figures']), 'videos': len(audit['videos']), 'total_asset_bytes': sum(p.stat().st_size for p in assets.rglob('*') if p.is_file())}))
