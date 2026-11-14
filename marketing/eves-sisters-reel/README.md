# Eve's Sisters — "Let Them Wonder" (18s reel)

`out/eves-sisters-let-them-wonder.mp4`: 1080×1920 (9:16), 30 fps, 18 s, H.264 + AAC,
−14 LUFS. Built for Instagram/Facebook Reels and Stories ads, and it also fits TikTok and Shorts.
It drives viewers to **evevolutionhealth.com/early-access**.

## Why it's built this way

| Choice | Reason |
| --- | --- |
| Hook in the first second: a close-up and "She's been glowing lately." | Meta counts a play at 3 s and treats hook rate as a quality signal; guides put the scroll-stop window at about 1.5 s. |
| 18 s | Ad guides recommend 15–30 s for Reels. This is long enough for the story and short enough to be watched to the end. |
| Cuts on every beat (80 BPM) and a gold flash on each cut | Fast, rhythmic editing holds attention, and the slow tempo keeps it sultry, not frantic. |
| Burned-in captions that match the voiceover | Many people watch with sound off, and Instagram's auto-captions are unreliable. |
| Polished, cinematic look instead of UGC | UGC tends to win in beauty overall, but luxury is the exception, and Reels views for luxury brands have been growing fastest. |
| Text kept 270–1250 px from the top, with 70 px side margins | Keeps it clear of the Reels UI (top ~14%, bottom ~35%, sides ~6%). Check in the Ads Manager preview before launch. |
| Tasteful sensuality: bare shoulders, silk, a couple, no nudity, no health claims | Stays inside Meta's adult-content and personal-health ad policies. |

Sources: [SmartSites](https://www.smartsites.com/blog/best-practices-for-high-performing-instagram-reels-ads-in-2026/),
[Digital Applied](https://www.digitalapplied.com/blog/instagram-reels-ads-2026-creative-strategy-guide),
[eMarketer](https://www.emarketer.com/content/industry-kpis--video-views-luxury-brands-shift-toward-instagram-reels--while-tiktok-slows),
[Webtonic](https://www.webtonic.io/blog/beauty-skincare-video-marketing-statistics),
[AdNabu safe zones](https://blog.adnabu.com/meta-ads/meta-safe-zones/). Most of these are agency
or vendor blogs, so treat the numbers as directional and A/B test hooks.

## Script (voice: Kokoro `af_nicole`, a breathy close-mic read)

| Time | Picture | Voice and caption |
| --- | --- | --- |
| 0:00 | "Your Turn" portrait, extreme close-up | She's been glowing lately. |
| 0:01.5 | Eyes closed, silk off the shoulder | Everyone's asking why. |
| 0:03 | Two quick close-ups | She's not telling. |
| 0:04.5 | Couple, tender moment | Some things are better shared… |
| 0:06.75 | Three women, slow pan | …between sisters. |
| 0:08.25 | Logo reveal with gold shine | Eve's Sisters. |
| 0:09.75 | Three portraits, one per beat | Private care, for every stage of you. |
| 0:12 | Face lifted to the light | Your turn is coming. |
| 0:13.5 | "Your Turn" portrait. The music drops out. | **Let them wonder.** |
| 0:15 | End card. The beat hits. | Join early access · evevolutionhealth.com/early-access · Link in bio |

## Re-rendering

`reel.html` holds the edit (shots, captions and timing). Then run:
`node render.cjs` → `python3 music.py` → `python voiceover.py <kokoro model dir>` (see the
mrs-collection-commercial README for Kokoro setup), and mix with:

```bash
ffmpeg -y -i out/video-silent.mp4 -i out/music.wav -i out/voiceover.wav -filter_complex \
 "[1:a]lowpass=f=9000,volume=0.5[m];[2:a]aresample=44100,aformat=channel_layouts=stereo,highpass=f=90,equalizer=f=3000:t=q:w=1:g=4,acompressor=threshold=-20dB:ratio=3:attack=5:release=80,aecho=0.8:0.5:60:0.1,asplit=2[v][key];[m][key]sidechaincompress=threshold=0.02:ratio=8:attack=20:release=300[duck];[duck][v]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=8[a]" \
 -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart out/eves-sisters-let-them-wonder.mp4
```
