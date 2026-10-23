# X-World: Transferring Video Priors to Variable-View Robot Control

### [Project](https://logosintelligencelab.github.io/X-World/) | [PDF](docs/assets/papers/X-World.pdf) | [BibTeX](#bibtex)

> **X-World: Transferring Video Priors to Variable-View Robot Control**  
> [Chun Gu](https://sulvxiangxin.github.io/), [Xiaofei Wei](https://waboutme.github.io/), [Yiming Chen](https://openreview.net/profile?id=~Yiming_Chen9), [Juntong Zhang](https://juntongz.github.io/), [Li Zhang](https://lzrobots.github.io/)†  
> †Corresponding author: [lizhangfd@fudan.edu.cn](mailto:lizhangfd@fudan.edu.cn)

School of Data Science, Fudan University · Shanghai Innovation Institute · [Logos Intelligence Lab](https://github.com/LogosIntelligenceLab)

Official project website and manuscript for X-World. The website includes the method overview, benchmark and ablation results, and six real-world bimanual manipulation demonstrations.

X-World connects a variable-view video backbone to a shared action expert through fixed-length tokens. It reaches 98.5% mean success on LIBERO, 76.5% on zero-shot LIBERO-Plus, and 81.7% across six real-world tasks.

## Website

The static website is in [`docs/`](docs/). GitHub Pages publishes from `main` → `/docs`, following the organization’s [TIDE project](https://github.com/LogosRoboticsGroup/TIDE) layout.

For local preview:

```sh
python -m http.server 8765 --bind 127.0.0.1 --directory docs
```

Open `http://127.0.0.1:8765/`. Edit `docs/index.html`, `docs/styles.css`, and `docs/app.js` to update the page. See [MAINTENANCE.md](MAINTENANCE.md) for media and release notes.

## BibTeX

```bibtex
@misc{gu2026xworld,
  title = {X-World: Transferring Video Priors to Variable-View Robot Control},
  author = {Gu, Chun and Wei, Xiaofei and Chen, Yiming and Zhang, Juntong and Zhang, Li},
  year = {2026},
  note = {Preprint}
}
```

The arXiv identifier will be added when available.

## Acknowledgements

The page’s visual direction is inspired by [TIDE](https://logosroboticsgroup.github.io/TIDE/). X-World research figures, results, and recordings come from the accompanying manuscript and supplementary material.
