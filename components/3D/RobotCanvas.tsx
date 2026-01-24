'use client'; 

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Center } from '@react-three/drei';
import { Suspense, useState } from 'react';
 // 파일명 오타 수정 (Studo -> Studio 확인!)
import RobotScene from './RobotScene';
import StudioStage from './StudoStage';
import SciFiDoors from './SiFidoor';
import { useGLTF } from '@react-three/drei';
import RobotPartHighlighter from './RobotPartHighlighter';

export default function RobotCanvas() {
  const [isHologram, setIsHologram] = useState(true);
  const { scene } = useGLTF('/models/robot.glb');

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* SF 도어 애니메이션 */}
      <SciFiDoors onOpenComplete={() => setIsHologram(false)} />
      
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 1 
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={45} />
        
        {/* 1. 배경 및 조명 (StudioStage) */}
        <StudioStage />

        {/* 2. 로봇 모델 (RobotScene) */}
        <Suspense fallback={null}>
          <Center>
            <RobotScene scene={scene} isHologram={isHologram} /> 
          </Center>
        </Suspense>

        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* 평면 UI 레이아웃 */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 10, 
        pointerEvents: 'none' 
      }}>
        <RobotPartHighlighter scene={scene} />
      </div>
    </div>
  );
}