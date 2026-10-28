# The Mrs. Collection — 30-second commercial

`out/mrs-collection-commercial.mp4`: 1080×1920 (9:16) vertical, 30 fps, 30 s,
H.264 + AAC, voiceover over a music bed, mixed to −16 LUFS, for Instagram
Reels, Stories, TikTok and YouTube Shorts.
`out/mrs-collection-commercial-music-only.mp4` is the same cut without the voice.

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

## Voiceover

Warm female voice (Kokoro TTS, voice `af_heart`, Apache-2.0, free for
commercial use). Each line starts as its scene appears:

| Time | Line |
| --- | --- |
| 0:00 | You make room for everyone. Now, make room for you. |
| 0:04 | Introducing… the Mrs. Collection. |
| 0:08 | Mrs. Jones. Private care, centered on you. |
| 0:13 | Mrs. Golden. Care shaped around your whole story. |
| 0:18 | Mrs. Robinson. Let them wonder. |
| 0:22 | Three signatures. One sisterhood. |
| 0:25 | Explore the Mrs. Collection, at evevolutionwellness.com ("Eve Evolution wellness dot com"). |

The script is in `voiceover.py`, spelled for the ear ("Missus"). To record a
human voice instead, read the same lines to these timings and replace
`out/voiceover.wav`.

## Editing and re-rendering

- `commercial.html` is the whole spot: open it in a browser to watch it loop.
  Copy, timings (`S` in the script) and layout all live there.
- `node render.cjs` renders `out/video-silent.mp4` (≈2 min, uses the
  preinstalled Playwright Chromium); `node render.cjs --stills 3,10` saves
  stills for checking.
- `python3 music.py` writes `out/music.wav`, an original synthesized pad, so
  there is nothing to license.
- Voiceover: in a virtualenv, `pip install kokoro-onnx soundfile`, download
  `kokoro-v1.0.onnx` and `voices-v1.0.bin` from the
  [kokoro-onnx releases](https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0),
  then `python voiceover.py <model folder>` writes `out/voiceover.wav`
  (`VO_VOICE=bf_emma` etc. picks another voice).
- Final mix (music ducks under the voice):

  ```bash
  ffmpeg -y -i out/video-silent.mp4 -i out/music.wav -i out/voiceover.wav -filter_complex \
    "[1:a]lowpass=f=5000,volume=0.55[m];[2:a]aresample=44100,aformat=channel_layouts=stereo,highpass=f=80,acompressor=threshold=-18dB:ratio=3:attack=5:release=80,asplit=2[v][key];[m][key]sidechaincompress=threshold=0.03:ratio=6:attack=40:release=500[duck];[duck][v]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=9[a]" \
    -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart \
    out/mrs-collection-commercial.mp4
  ```

Photography comes from `public/images/mrs-collection/` and the approved
campaign renders. Fonts: Cormorant Garamond and Montserrat (SIL OFL).
