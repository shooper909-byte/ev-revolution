# Writes out/voiceover.wav: each line spoken by Kokoro TTS (Apache-2.0) and
# placed at the moment its caption appears. Needs `pip install kokoro-onnx
# soundfile` and the model files (see README); pass their folder as argv[1].
import sys, os, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

MODEL_DIR = sys.argv[1] if len(sys.argv) > 1 else "."
VOICE, SPEED, DUR = os.environ.get("VO_VOICE", "af_nicole"), 1.12, 20.0
B = 60 / 84  # one beat of the 84 BPM edit

# (start second, text[, speed]). Whispered, close-mic read; matches the captions.
LINES = [
    (0.15, "Shh."),
    (1.25, "Can you keep a secret?"),
    (3.0, "She's been smiling... for no reason."),
    (6.0, "And someone noticed.", 1.2),
    (10 * B + .05, "Desire.", 1.25),
    (11 * B + .05, "Confidence.", 1.25),
    (12 * B + .05, "Intimacy.", 1.25),
    (13 * B + .05, "Yours.", 1.25),
    (14 * B + .15, "Introducing... Eve's Secret."),
    (12.6, "Discreet care, from clinicians who get it.", 1.2),
    (15.65, "Some secrets are worth sharing."),
    (18.1, "Unlock the secret."),
]

kokoro = Kokoro(os.path.join(MODEL_DIR, "kokoro-v1.0.onnx"), os.path.join(MODEL_DIR, "voices-v1.0.bin"))
SR = 24000
track = np.zeros(int(SR * DUR), dtype=np.float32)
for start, text, *speed in LINES:
    audio, sr = kokoro.create(text, voice=VOICE, speed=(speed or [SPEED])[0], lang="en-us")
    assert sr == SR
    # trim leading/trailing silence so the start time is where the word lands
    nz = np.flatnonzero(np.abs(audio) > 0.01)
    audio = audio[max(nz[0] - 240, 0): nz[-1] + 2400]
    i = int(start * SR)
    end = i + len(audio)
    print(f"{start:5.2f}-{end / SR:5.2f}s  {text}")
    if end > len(track):
        raise SystemExit(f"line runs past {DUR}s: {text}")
    track[i:end] += audio
os.makedirs("out", exist_ok=True)
sf.write("out/voiceover.wav", track / max(1e-6, np.abs(track).max()) * 0.9, SR)
