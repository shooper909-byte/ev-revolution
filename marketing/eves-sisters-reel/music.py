# Writes out/music.wav: an original 18s slow R&B beat at 80 BPM (no samples,
# nothing to license). The reel's cuts land on its beats; it drops out under
# "Let them wonder." (14.0-15.0s) and hits again on the end card.
import numpy as np, wave, os
SR = 44100; DUR = 18.0; BEAT = 0.75; BAR = 4 * BEAT
n = int(SR * DUR); t = np.arange(n) / SR
mix = np.zeros((n, 2))
rng = np.random.default_rng(7)
def hz(m): return 440 * 2 ** ((m - 69) / 12)
def put(sig, at, gain=1.0, pan=0.0):
    i = int(at * SR); sig = sig[: max(0, n - i)]
    mix[i:i + len(sig), 0] += sig * gain * (1 - max(0, pan))
    mix[i:i + len(sig), 1] += sig * gain * (1 + min(0, pan))
DROP = (14.0, 15.0)
def live(at): return not (DROP[0] - 0.01 <= at < DROP[1] - 0.01)

# drums
def kick():
    d = np.arange(int(.45 * SR)) / SR; f = 45 + 110 * np.exp(-d * 28)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-d * 7)
def snap():
    d = np.arange(int(.25 * SR)) / SR; nz = rng.standard_normal(len(d))
    nz = np.convolve(nz, [1, -0.9], 'same')  # brighten
    return nz * np.exp(-d * 30) * .5 + np.sin(2 * np.pi * 1900 * d) * np.exp(-d * 60) * .15
def hat(open_=False):
    d = np.arange(int((.18 if open_ else .05) * SR)) / SR; nz = np.diff(rng.standard_normal(len(d) + 1))
    return nz * np.exp(-d * (14 if open_ else 90)) * .25
for bar in range(6):
    b0 = bar * BAR
    for k in [0, 1.5, 2.75]:            # syncopated R&B kick
        if live(b0 + k * BEAT) and not (bar == 0 and k == 0 and False): put(kick(), b0 + k * BEAT, .9)
    for s in [1, 3]:
        if live(b0 + s * BEAT): put(snap(), b0 + s * BEAT, .55, .1)
    for h in range(16):                 # swung 16th hats with accents
        at = b0 + h * BEAT / 4 + (0.03 if h % 2 else 0)
        if live(at): put(hat(h == 14), at, .55 if h % 4 == 2 else .3, -.3)

# chords: Am9 | Fmaj7 | Dm9 | Em7 | Am9 (drop) | Fmaj9 -> end
chords = [(57, [57, 60, 64, 67, 71]), (53, [53, 57, 60, 64, 67]), (50, [50, 53, 57, 60, 64]),
          (52, [52, 55, 59, 62, 66]), (57, [57, 60, 64, 67, 71]), (53, [53, 57, 60, 64, 67, 72])]
for bar, (root, notes) in enumerate(chords):
    b0 = bar * BAR; L = BAR + .6 if bar < 5 else DUR - b0
    d = np.arange(int(L * SR)) / SR
    env = np.clip(d / .08, 0, 1) * np.exp(-d * .35)
    trem = 1 + .25 * np.sin(2 * np.pi * 4.5 * d)          # rhodes-ish tremolo
    pad = sum(np.sin(2 * np.pi * hz(m) * d) + .3 * np.sin(4 * np.pi * hz(m) * d) * np.exp(-d * 3) for m in notes)
    put(pad * env * trem * .07, b0, 1, .15)
    # 808 bass on the kicks, gliding into each note
    for k in [0, 1.5, 2.75]:
        at = b0 + k * BEAT
        if not live(at) or at >= DUR: continue
        bd = np.arange(int(.7 * SR)) / SR
        f = hz(root - 24) * (1 + .3 * np.exp(-bd * 40))
        put(np.tanh(1.5 * np.sin(2 * np.pi * np.cumsum(f) / SR)) * np.exp(-bd * 2.5) * .4, at)

# drop: everything breathes out, a reverse swell pulls into the end card
sw_len = DROP[1] - DROP[0]; d = np.arange(int(sw_len * SR)) / SR
swell = rng.standard_normal(len(d)); swell = np.convolve(swell, np.ones(6) / 6, 'same')
put(swell * (d / sw_len) ** 4 * .15, DROP[0])
d = np.arange(int(2.5 * SR)) / SR      # impact on the end card
put((np.sin(2 * np.pi * 42 * d) * np.exp(-d * 2) + rng.standard_normal(len(d)) * np.exp(-d * 9) * .3) * .8, DROP[1])
# shimmer on the brand reveal and end card
for at, m in [(8.25, 88), (15.0, 88), (16.9, 91), (17.2, 95)]:
    d = np.arange(int(2 * SR)) / SR
    put(np.sin(2 * np.pi * hz(m) * d) * np.exp(-d * 2.2) * .12, at, 1, .4 if m % 2 else -.4)

# glue: short stereo reverb taps, soft clip, fade out
wet = np.zeros_like(mix)
for dly, g, side in [(.11, .3, 0), (.23, .22, 1), (.37, .16, 0), (.53, .1, 1)]:
    k = int(dly * SR); wet[k:, side] += mix[:-k, 1 - side] * g
mix = np.tanh((mix + wet) * 1.2)
mix *= np.clip((DUR - t) / 1.2, 0, 1)[:, None]
mix = mix / np.abs(mix).max() * .85
os.makedirs("out", exist_ok=True)
with wave.open("out/music.wav", "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype("<i2").tobytes())
