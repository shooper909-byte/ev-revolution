# Writes out/music.wav: a 30s ambient pad (no samples, no licensing) that
# swells under the title and resolves on the end card.
import numpy as np, wave, os
SR = 44100; DUR = 30.0
t = np.arange(int(SR * DUR)) / SR
def hz(m): return 440 * 2 ** ((m - 69) / 12)
# Dmaj9 -> Bm11 -> Gmaj7#11 -> Aadd9 -> Dmaj9, one chord per scene-ish
chords = [(0, [50, 57, 61, 64, 66]), (6.5, [47, 54, 57, 62, 64]), (13, [43, 50, 54, 59, 61]),
          (19.5, [45, 52, 57, 59, 64]), (25.5, [50, 57, 62, 66, 69, 73])]
out = np.zeros_like(t)
for i, (start, notes) in enumerate(chords):
    end = chords[i + 1][0] if i + 1 < len(chords) else DUR
    a, r = 1.8, 2.2  # slow attack and overlapping release
    env = np.clip((t - start) / a, 0, 1) * np.clip((end + r - t) / r, 0, 1)
    env = env ** 1.5
    for j, m in enumerate(notes):
        f = hz(m)
        for det in (-0.12, 0.0, 0.12):  # light chorus
            ph = 2 * np.pi * f * (1 + det / 100) * t + j
            tone = np.sin(ph) + 0.25 * np.sin(2 * ph) + 0.08 * np.sin(3 * ph)
            out += env * tone * (0.5 if j == 0 else 0.32) / 3
# shimmer: soft high bell notes on each name reveal
for s, m in [(4.9, 81), (8.6, 78), (13.4, 81), (18.2, 85), (26.6, 86)]:
    e = np.where(t >= s, np.exp(-(t - s) * 1.4), 0)
    out += 0.18 * e * np.sin(2 * np.pi * hz(m) * (t - s))
# cheap reverb: a few decaying taps
wet = np.zeros_like(out)
for d, g in [(0.13, .35), (0.29, .25), (0.47, .18), (0.71, .12), (1.03, .08)]:
    n = int(d * SR); wet[n:] += g * out[:-n]
out = out + wet
out *= np.clip(t / 1.5, 0, 1) * np.clip((DUR - t) / 2.0, 0, 1)
out = out / np.abs(out).max() * 0.5
stereo = np.stack([out, np.roll(out, int(0.012 * SR))], 1)
os.makedirs("out", exist_ok=True)
with wave.open("out/music.wav", "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((stereo * 32767).astype("<i2").tobytes())
