# Writes out/voiceover.wav: each line spoken by Kokoro TTS (Apache-2.0) and
# placed at the moment its caption appears. Needs `pip install kokoro-onnx
# soundfile` and the model files (see README); pass their folder as argv[1].
import sys, os, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

MODEL_DIR = sys.argv[1] if len(sys.argv) > 1 else "."
VOICE, SPEED, DUR = os.environ.get("VO_VOICE", "af_nicole"), 1.06, 18.0

# (start second, text[, speed]). Breathy, close-mic read; matches the captions.
LINES = [
    (0.15, "She's been glowing lately."),
    (1.65, "Everyone's asking why."),
    (3.4, "She's not telling."),
    (4.7, "Some things are better shared..."),
    (6.9, "between sisters."),
    (8.45, "Eve's Sisters."),
    (9.6, "Private care, for every stage of you."),
    (12.6, "Your turn is coming."),
    (14.0, "Let them wonder."),
    (15.4, "Join early access."),
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
