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
export const useCameraWithMediaPipe = (options: UseCameraOptions = {}) => {
  const camera = useCamera(options);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 나중에 MediaPipe 모델 초기화 및 감지 로직 추가
  useEffect(() => {
    if (camera.isActive && camera.stream) {
      // MediaPipe 처리 로직이 여기에 들어갈 예정
      console.log('Camera stream ready for MediaPipe processing');
    }
  }, [camera.isActive, camera.stream]);

  return {
    ...camera,
    canvasRef,
  };
};
