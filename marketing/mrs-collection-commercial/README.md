# The Mrs. Collection — 30-second commercial

`out/mrs-collection-commercial.mp4`: 1080×1920 (9:16) vertical, 30 fps, 30 s,
H.264 + AAC, for Instagram Reels, Stories, TikTok and YouTube Shorts.

## Storyboard

| Time | Scene | On screen |
| --- | --- | --- |
| 0:00–0:04 | Sisterhood rooftop, slow push-in | *You make room for everyone.* / **Now make room for you.** |
| 0:04–0:08 | Plum title card, gold sparks | INTRODUCING · **The Mrs. Collection** · *Make room for a little more you.* |
| 0:08–0:13 | Mrs. Jones portrait | THE MRS. COLLECTION · I · **Mrs. Jones** · Private care, centered on you. |
| 0:13–0:18 | Mrs. Golden portrait | II · **Mrs. Golden** · Care shaped around your whole story. |
| 0:18–0:22 | Mrs. Robinson portrait | III · **Mrs. Robinson** · Let them wonder. |
| 0:22–0:26 | Three stacked portraits | **Three signatures.** … *One sisterhood.* |
| 0:26–0:30 | Eve's Sisters logo end card | Explore the Mrs. Collection · evevolutionwellness.com · @EVEVOLUTIONHEALTH · disclaimer |

## Optional voiceover (≈60 words, fits under the music)

> You make room for everyone. Now… make room for you.
> Introducing the Mrs. Collection.
> Mrs. Jones — private care, centered on you.
> Mrs. Golden — care shaped around your whole story.
> Mrs. Robinson — let them wonder.
> Three signatures. One sisterhood.
> Explore the Mrs. Collection at evevolutionwellness.com.

## Editing and re-rendering

- `commercial.html` is the whole spot: open it in a browser to watch it loop.
  Copy, timings (`S` in the script) and layout all live there.
- `node render.cjs` renders `out/video-silent.mp4` (≈2 min, uses the
  preinstalled Playwright Chromium); `node render.cjs --stills 3,10` saves
  stills for checking.
- `python3 music.py` writes `out/music.wav`, an original synthesized pad, so
  there is nothing to license. Mux it with:

  ```bash
  ffmpeg -y -i out/video-silent.mp4 -i out/music.wav -c:v copy -c:a aac -b:a 192k \
    -af "lowpass=f=5000,loudnorm=I=-20:TP=-2" -shortest -movflags +faststart \
    out/mrs-collection-commercial.mp4
  ```

Photography comes from `public/images/mrs-collection/` and the approved
campaign renders. Fonts: Cormorant Garamond and Montserrat (SIL OFL).
