# Writes out/voiceover.wav: each line spoken by Kokoro TTS (Apache-2.0) and
# placed at the moment its scene appears. Needs `pip install kokoro-onnx
# soundfile` and the model files (see README); pass their folder as argv[1].
import sys, os, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

MODEL_DIR = sys.argv[1] if len(sys.argv) > 1 else "."
VOICE, SPEED, DUR = os.environ.get("VO_VOICE", "af_heart"), 0.92, 30.0

# (start second, text[, speed]). Spelled for the ear: "Missus", "Eve Evolution".
LINES = [
    (0.45, "You make room for everyone."),
    (2.05, "Now, make room for you."),
    (4.75, "Introducing... the Missus Collection."),
    (8.55, "Missus Jones. Private care, centered on you."),
    (13.35, "Missus Golden. Care shaped around your whole story."),
    (18.15, "Missus Robinson. Let them wonder."),
    (22.75, "Three signatures. One sisterhood."),
    (25.7, "Explore the Missus Collection, at Eve Evolution wellness dot com.", 1.0),
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
