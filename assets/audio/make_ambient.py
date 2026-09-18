#!/usr/bin/env python3
"""Generate a soft, seamless-looping ambient pad WAV (stdlib only, no deps).

Produces assets/audio/ambient-loop.wav: warm wedding-ambient pad,
22.05 kHz mono 16-bit, ~32 s, crossfaded ends so it loops cleanly.
"""
import math
import os
import random
import struct
import wave

SR = 22050
DUR = 32.0
N = int(SR * DUR)
CROSSFADE = int(SR * 1.6)

# A gentle progression: Cmaj9 -> Am9 -> Fmaj9 -> G6  (frequencies in Hz)
CHORDS = [
    [130.81, 196.00, 246.94, 329.63, 392.00],   # C  E  B  D  G
    [110.00, 164.81, 220.00, 261.63, 329.63],   # A  E  A  C  E
    [87.31, 174.61, 220.00, 261.63, 349.23],    # F  F  A  C  F
    [98.00, 196.00, 246.94, 293.66, 392.00],    # G  G  B  D  G
]
SEG = DUR / len(CHORDS)

buf = [0.0] * N
rng = random.Random(20261121)

for idx, chord in enumerate(CHORDS):
    start = int(idx * SEG * SR)
    stop = int((idx + 1) * SEG * SR) + int(0.9 * SR)
    stop = min(stop, N)
    length = stop - start
    if length <= 0:
        continue
    fade = int(0.9 * SR)
    for i in range(length):
        t = i / SR
        # slow attack / release envelope keeps chords bleeding into each other
        env = min(1.0, i / fade, (length - i) / fade) ** 1.5
        if env <= 0:
            continue
        v = 0.0
        for k, f in enumerate(chord):
            # two detuned partials per note -> chorus-like width
            detune = 1.0 + (rng.random() - 0.5) * 0.0016
            phase = 2 * math.pi * f * t
            v += math.sin(phase)
            v += 0.7 * math.sin(phase * detune * 2)
            # very slow amplitude breathing per voice
            v *= 0.85 + 0.15 * math.sin(2 * math.pi * (0.06 + 0.017 * k) * t)
        v /= len(chord) * 1.7
        # sub-octave warmth
        v += 0.10 * math.sin(2 * math.pi * (chord[0] / 2.0) * t)
        buf[start + i] += v * env

# airy noise layer (very low, filtered by simple one-pole smoothing)
smooth = 0.0
for i in range(N):
    smooth += (rng.uniform(-1.0, 1.0) - smooth) * 0.02
    buf[i] += smooth * 0.05

# normalise to a comfortable listening level
peak = max(abs(x) for x in buf) or 1.0
gain = 0.62 / peak
buf = [x * gain for x in buf]

# crossfade the tail into the head for a seamless loop
for i in range(CROSSFADE):
    a = i / CROSSFADE
    head = buf[i]
    tail = buf[N - CROSSFADE + i]
    buf[i] = head * a + tail * (1 - a)
buf = buf[: N - CROSSFADE]

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ambient-loop.wav")
os.makedirs(os.path.dirname(out), exist_ok=True)
with wave.open(out, "wb") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(b"".join(
        struct.pack("<h", max(-32768, min(32767, int(s * 32767)))) for s in buf
    ))
print("wrote", out, os.path.getsize(out), "bytes", "%.1fs" % (len(buf) / SR))
