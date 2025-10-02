# Vidéo & Audio IA — Runway & ElevenLabs

## Runway Gen-4
- Prompt exemple :
```
Un dragon cyberpunk vole dans un ciel néon, style Blade Runner, plan caméra aérien.
```
- Génération cohérente multi-scènes.

## ElevenLabs
- Installation :
```bash
pip install elevenlabs
```
- Exemple :
```python
from elevenlabs import generate, play
audio = generate("Bonjour le monde", voice="Antoine", model="eleven_multilingual_v3")
play(audio)
```
