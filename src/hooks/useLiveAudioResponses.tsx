import { useEffect, useRef, useState } from 'react';

interface ApiResponse {
    text: string;
    timestamp: number;
}

export function useLiveAudioRecorder() {
    const [responses, setResponses] = useState<ApiResponse[]>([]);
    const [combinedAudioUrl, setCombinedAudioUrl] = useState<string | null>(null); // temp for testing
    const [blobs, setBlobs] = useState<Blob[]>([]); // temp for testing

    const mediaRecorder = useRef<MediaRecorder | null>(null);

    useEffect(() => {
        let isMounted = true;
        let stream: MediaStream;

        const mockSendToApi = async (blob: Blob): Promise<ApiResponse> => {
            // Simulate network latency and a fake transcription result
            await new Promise((r) => setTimeout(r, 500));
            return {
                text: `Transcribed audio chunk at ${new Date().toLocaleTimeString()}`,
                timestamp: Date.now(),
            };
        };

        const startRecording = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });

                mediaRecorder.current.ondataavailable = async (event: BlobEvent) => {
                    if (event.data.size > 0) {

                        try {
                            const response = await mockSendToApi(event.data);
                            if (isMounted) {
                                setResponses((prev) => [...prev, response]);
                            }
                            console.log('API response:', response);
                        } catch (error) {
                            console.error('Error sending blob to API:', error);
                        }

                        setBlobs((prev) => [...prev, event.data]); // temp for testing
                        console.log('New audio blob received:', event.data); // temp for testing
                    }
                };

                mediaRecorder.current.start(1000); // Emit data every 1000ms (1 second)
            } catch (err) {
                console.error('Error accessing microphone:', err);
            }
        };

        startRecording();

        return () => {
            isMounted = false;
            if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
                mediaRecorder.current.stop();
            }
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    // temp for testing Combine all blobs into one and create a single audio URL
    const createCombinedAudio = () => {
        if (blobs.length === 0) return null;

        const combinedBlob = new Blob(blobs, { type: 'audio/webm' });
        const url = URL.createObjectURL(combinedBlob);
        setCombinedAudioUrl(url);
        return url;
    };

    // needs to be implemented
    const createCombinedTranscript = () => {

    }

    return { responses, blobs, combinedAudioUrl, createCombinedAudio };
}