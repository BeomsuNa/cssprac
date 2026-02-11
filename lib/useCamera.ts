import { useEffect, useRef, useState } from 'react';

interface UseCameraOptions {
  onStreamReady?: (stream: MediaStream) => void;
  onError?: (error: Error) => void;
  autoStart?: boolean;
}

export const useCamera = (options: UseCameraOptions = {}) => {
  const { onStreamReady, onError, autoStart = false } = options;
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 카메라 시작
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setIsActive(true);
      setError(null);
      onStreamReady?.(stream);

      return stream;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      setIsActive(false);
      onError?.(error);
      throw error;
    }
  };

  // 카메라 중지
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsActive(false);
  };

  // 자동 시작 설정
  useEffect(() => {
    if (autoStart) {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [autoStart]);

  // 언마운트 시 정리
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return {
    videoRef,
    isActive,
    error,
    startCamera,
    stopCamera,
    stream: streamRef.current,
  };
};

// 웹카메라 감지
export const useCameraDetection = () => {
  const [detected, setDetected] = useState<boolean | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasCamera = devices.some((device) => device.kind === 'videoinput');
        setDetected(hasCamera);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        setDetected(false);
      }
    };

    checkCamera();

    // 기기 변경 감지
    navigator.mediaDevices.addEventListener('devicechange', checkCamera);

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', checkCamera);
    };
  }, []);

  return { detected, error };
};

// MediaPipe 통합을 위한 훅 (나중에 확장)
type UseCameraWithMediaPipeOptions = UseCameraOptions & {
  modelAssetPath?: string;
  onResults?: (results: any) => void;
};

export const useCameraWithMediaPipe = (options: UseCameraWithMediaPipeOptions = {}) => {
  const { modelAssetPath, onResults, ...cameraOptions } = options as UseCameraWithMediaPipeOptions;
  const camera = useCamera(cameraOptions);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediapipeInstance = useRef<any>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;

    const initMediaPipe = async () => {
      if (!camera.isActive || !camera.videoRef.current) return;

      try {
        const mp = await import('@mediapipe/tasks-vision');

        const fileset = await mp.FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
        );

        const handLandmarker = await mp.HandLandmarker.createFromOptions(fileset, {
          baseOptions: {
            modelAssetPath:
              modelAssetPath ||
              'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
          },
          runningMode: 'VIDEO',
        });

        mediapipeInstance.current = handLandmarker;

        const loop = async () => {
          if (!mounted || !camera.videoRef.current) return;

          try {
            const now = performance.now();
            const results = handLandmarker.detectForVideo(camera.videoRef.current, now);
            onResults?.(results);

            const canvas = canvasRef.current;
            if (canvas && camera.videoRef.current) {
              const ctx = canvas.getContext('2d');
              if (ctx) {
                canvas.width = camera.videoRef.current.videoWidth || camera.videoRef.current.clientWidth;
                canvas.height = camera.videoRef.current.videoHeight || camera.videoRef.current.clientHeight;
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // 손 랜드마크 그리기 (여러 손 처리)
                const hands = results?.landmarks || results?.landmarks || [];
                if (hands && hands.length) {
                  ctx.fillStyle = 'lime';
                  ctx.strokeStyle = 'rgba(0,255,0,0.6)';
                  ctx.lineWidth = 2;

                  hands.forEach((landmarks: any[]) => {
                    // 포인트
                    landmarks.forEach((lm: any) => {
                      const x = lm.x * canvas.width;
                      const y = lm.y * canvas.height;
                      ctx.beginPath();
                      ctx.arc(x, y, 3, 0, Math.PI * 2);
                      ctx.fill();
                    });

                    // 간단한 연결선 (예: 손가락 연속 연결)
                    const connections = [
                      [0, 1, 2, 3, 4],
                      [0, 5, 6, 7, 8],
                      [0, 9, 10, 11, 12],
                      [0, 13, 14, 15, 16],
                      [0, 17, 18, 19, 20],
                    ];

                    connections.forEach((chain) => {
                      ctx.beginPath();
                      chain.forEach((idx: number, i: number) => {
                        const lm = landmarks[idx];
                        if (!lm) return;
                        const x = lm.x * canvas.width;
                        const y = lm.y * canvas.height;
                        if (i === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                      });
                      ctx.stroke();
                    });
                  });
                }
              }
            }
          } catch (e) {
            console.warn('MediaPipe frame error', e);
          }

          rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);
      } catch (e) {
        console.error('MediaPipe init error', e);
      }
    };

    if (camera.isActive) {
      initMediaPipe();
    }

    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (mediapipeInstance.current?.close) mediapipeInstance.current.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera.isActive]);

  return {
    ...camera,
    canvasRef,
  };
};
