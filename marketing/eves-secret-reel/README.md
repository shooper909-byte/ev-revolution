# Eve's Secret — "Shh" (20s reel)

`out/eves-secret-shh.mp4`: 1080×1920 (9:16), 30 fps, 20 s, −14 LUFS. It introduces Eve's Secret
and drives viewers to the early access form at **evevolutionwellness.us/eves-secret**.

It uses the same research-backed build as the "Let Them Wonder" reel (see that README):
- a hook in the first second ("Shh…" over a shush close-up)
- every cut on the beat (84 BPM)
- burned-in captions
- text kept inside the Reels safe zones
- a cinematic luxury look

## Script (voice: Kokoro `af_nicole`, whispered)

| Time | Picture | Voice and caption |
| --- | --- | --- |
| 0:00 | Shush close-up | Shh… |
| 0:01 | Second shush close-up | Can you keep a secret? |
| 0:03 | Eyes closed, lips parted, silk | She's been smiling… for no reason. |
| 0:06 | Couple | And someone noticed. |
| 0:07 | Four close-ups, one per beat | Desire. · Confidence. · Intimacy. · Yours. |
| 0:10 | Title card with gold shine | Introducing… Eve's Secret. (Soft. Sensual. Elevated.) |
| 0:12.6 | "Shh" group, slow pan | Discreet care, from clinicians who get it. |
| 0:15 | Hero group. The music drops out on the last beat. | Some secrets are worth sharing. |
| 0:17 | End card. The beat hits. | Unlock the secret · evevolutionwellness.us/eves-secret · Early access · Link in bio · 18+ disclaimer |

## Before running it as a paid ad

Meta allows sexual-wellness ads only when they focus on health rather than pleasure, target
18+, and avoid "sexually suggestive" imagery. The lingerie and lace shots (the shush
close-ups and group shots) can trip the adult-content review. Post it organically as is. For
paid ads, expect review, and keep a tamer cut ready that swaps those shots for the portrait,
couple and title shots.

## Re-rendering

`node render.cjs` → `python3 music.py` → `python voiceover.py <kokoro model dir>`, then mix
with the same ffmpeg command as in `../eves-sisters-reel/README.md`, writing
`out/eves-secret-shh.mp4`.
