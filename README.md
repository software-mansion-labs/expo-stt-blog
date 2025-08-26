# Expo STT Blog

A real-time speech-to-text mobile application built with Expo and React Native. This app uses on-device AI models for real-time voice transcription without requiring internet connectivity.

## Features

- 🎙️ **Real-time Speech Transcription**: Live voice-to-text conversion using Whisper Tiny EN model
- 📱 **Cross-platform**: Works on iOS and Android
- 🔒 **Privacy-focused**: On-device processing - no data sent to servers
- ⚡ **Low latency**: Optimized for real-time performance with 100ms audio chunks
- 🎛️ **Audio optimizations**: Configured for optimal speech recording quality

## Technologies Used

- **Expo** (~53.0.22) - Development platform
- **React Native** (0.79.6) - Mobile framework
- **react-native-audio-api** (^0.7.1) - Audio recording and processing
- **react-native-executorch** (^0.5.1) - On-device AI model execution
- **Whisper Tiny EN** - Lightweight speech recognition model

## Prerequisites

- Node.js (14 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)
- Xcode (for iOS development)
- Android Studio (for Android development)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/software-mansion-labs/expo-stt-blog.git
cd expo-stt-blog
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android
```

## Permissions

The app requires microphone permissions for speech recording:

### iOS
- Microphone access is automatically requested with the message: "This app requires microphone access for real-time speech transcription."

### Android
- `RECORD_AUDIO` - Required for audio recording
- `MODIFY_AUDIO_SETTINGS` - Required for optimal audio configuration

## Usage

1. Launch the app
2. Grant microphone permissions when prompted
3. Tap "Start Recording" to begin real-time transcription
4. Speak into your device's microphone
5. Watch as your speech is converted to text in real-time
6. Tap "Stop Recording" to end the session

## Technical Details

### Audio Configuration
- **Sample Rate**: 16kHz (optimized for Whisper model)
- **Buffer Size**: 1600 samples (100ms chunks)
- **iOS Audio Session**: Configured for speech with `playAndRecord` category and `spokenAudio` mode

### Model Information
- Uses Whisper Tiny EN model for English speech recognition
- On-device processing ensures privacy and works offline
- Supports both committed (finalized) and non-committed (provisional) transcriptions

## Project Structure

```
expo-stt-blog/
├── App.tsx                 # Main application component
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── assets/               # App icons and images
├── android/              # Android-specific files
├── ios/                  # iOS-specific files
└── node_modules/         # Dependencies
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Performance Tips

- Use the app in a quiet environment for best transcription accuracy
- Keep the device close to your mouth when speaking
- Speak clearly and at a moderate pace
- Ensure your device has sufficient storage and memory

## Acknowledgments

- [Expo](https://expo.dev/) - Development platform
- [React Native Audio API](https://github.com/software-mansion/react-native-audio-api) - Audio processing
- [React Native Executorch](https://github.com/software-mansion/react-native-executorch) - On-device AI
- [OpenAI Whisper](https://openai.com/research/whisper) - Speech recognition model