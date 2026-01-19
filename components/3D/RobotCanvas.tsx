'use client'; 

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Center } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
 // 파일명 오타 수정 (Studo -> Studio 확인!)
import RobotScene from './RobotScene';
import StudioStage from './StudoStage';

export default function RobotCanvas() {
  const [isHologram, setIsHologram] = useState(true);

    useEffect(() => {
    const t = setTimeout(() => setIsHologram(false), 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <Canvas shadows dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={45} />
      
      {/* 1. 배경 및 조명 (StudioStage) */}
      <StudioStage />

      {/* 2. 로봇 모델 (RobotScene) */}
      <Suspense fallback={null}>
        <Center>
          <RobotScene isHologram={isHologram} /> 
        </Center>
      </Suspense>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}