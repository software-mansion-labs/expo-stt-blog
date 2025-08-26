import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AudioManager, AudioRecorder } from 'react-native-audio-api';
import { useSpeechToText, WHISPER_TINY_EN } from 'react-native-executorch';

export default function App() {
  const [recorder] = useState(
    () =>
      new AudioRecorder({
        sampleRate: 16000,        // Whisper's expected sample rate
        bufferLengthInSamples: 1600,  // 100ms chunks for real-time processing
      })
  );

  const model = useSpeechToText({
    model: WHISPER_TINY_EN,
  });

  useEffect(() => {
    // Configure audio session for optimal speech recording
    AudioManager.setAudioSessionOptions({
      iosCategory: 'playAndRecord',
      iosMode: 'spokenAudio',     // Optimized for speech
      iosOptions: ['allowBluetooth', 'defaultToSpeaker'],
    });
    
    // Request recording permissions at runtime
    AudioManager.requestRecordingPermissions();
  }, []);

  const handleStartStreaming = async () => {
    // Set up audio buffer processing
    recorder.onAudioReady(async ({ buffer }) => {
      // Convert Float32Array to regular array for model processing
      const bufferArray = Array.from(buffer.getChannelData(0));
      model.streamInsert(bufferArray);
    });

    // Begin recording
    recorder.start();

    try {
      // Start streaming transcription with overlapping chunks
      await model.stream();
    } catch (error) {
      console.error('Transcription error:', error);
      // Handle model errors gracefully
      handleStopStreaming();
    }
  };

  const handleStopStreaming = () => {
    recorder.stop();
    model.streamStop();
  };

  return (
    <View style={styles.container}>
      <Text style={{color: 'black', fontWeight: 'bold'}}>{model.committedTranscription}{' '}<Text style={{color: 'gray', fontStyle: 'italic'}}>{model.nonCommittedTranscription}</Text></Text>

      <View>
        <Button
          onPress={model.isGenerating ? handleStopStreaming : handleStartStreaming}
          title={model.isGenerating ? "Stop Recording" : "Start Recording"}
          disabled={!model.isReady}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50
  },
});
