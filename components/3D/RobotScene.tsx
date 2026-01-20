'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei'; // 필요한 것만 남김
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// --------------------------------------------------------------------------
// 1. 실제 3D 모델 로드 컴포넌트
// --------------------------------------------------------------------------
function OptimusRobot({ isHologram=true }: { isHologram: boolean }) {
  const { scene } = useGLTF('/models/robot.glb');
  const robotRef = useRef<THREE.Group>(null);
  const headBone = useRef<THREE.Object3D | null>(null);
  const spineBone = useRef<THREE.Object3D | null>(null);

const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // 초기 상태 설정: 모든 재질을 "홀로그램" 상태로 만듦
scene.traverse((obj) => {
  if (!(obj instanceof THREE.Mesh)) return;

  const mesh = obj; // 여기서부터 mesh.material 접근 가능
  const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

  mats.forEach((mat) => {
    if (!(mat instanceof THREE.MeshStandardMaterial)) return;

    mat.emissive = new THREE.Color("#070606");
    mat.emissiveIntensity = 3;
    mat.metalness = 0;
    mat.roughness = 0;
    mat.transparent = true;
    mat.opacity = 0.3;
    mat.needsUpdate = true;
  });
});
  }, [scene]);


  // ✅ "isHologram" prop이 false가 되면 실체화 애니메이션 시작
  useGSAP(() => {
    if (isHologram) return; // 아직 홀로그램 상태면 대기

    if (tl.current) tl.current.kill(); // 기존 애니메이션 있으면 제거

    tl.current = gsap.timeline();

    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
        const mesh = obj; // 여기서부터 mesh.material 접근 가능
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

  mats.forEach((mat) => {
    if (!(mat instanceof THREE.MeshStandardMaterial)) return;
  tl.current?.to( mat,{    
    emissiveIntensity : 0,
    metalness : 0.8,
    roughness : 0.2,
    transparent : true,
    opacity : 1,
    duration:3.0,
    ease:"power3.inOut",
    onUpdate: () => { mat.needsUpdate = true; }
  },0)
  });

});

  }, [isHologram]); // isHologram 값이 바뀔 때 실행

  
  useFrame((state) => {
    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;

    if (headBone.current) {
      headBone.current.rotation.y = THREE.MathUtils.lerp(headBone.current.rotation.y, mouseX * 0.6, 0.1);
      headBone.current.rotation.x = THREE.MathUtils.lerp(headBone.current.rotation.x, -mouseY * 0.6, 0.1);
    }

    if (spineBone.current) {
      spineBone.current.rotation.y = THREE.MathUtils.lerp(spineBone.current.rotation.y, mouseX * 0.3, 0.1);
      spineBone.current.rotation.x = THREE.MathUtils.lerp(spineBone.current.rotation.x, -mouseY * 0.3, 0.1);
    }
  });

  return <primitive object={scene} ref={robotRef} />;
}




// --------------------------------------------------------------------------
// 2. 메인 모델 래퍼 컴포넌트 (이것이 최종 Export 됩니다)
// --------------------------------------------------------------------------
type RobotModelProps = React.JSX.IntrinsicElements['group'];

export default function RobotScene({ isHologram, ...props }: { isHologram: boolean } & RobotModelProps) { // 이름 변경 및 export default
  const groupRef = useRef<THREE.Group>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  const headBone = useRef<THREE.Object3D | null>(null);
  const spineBone = useRef<THREE.Object3D | null>(null);

  const [mouseTrackingEnabled, setMouseTrackingEnabled] = useState(false);

  useGSAP(() => {
    const head = groupRef.current?.getObjectByName('mixamorigHead')
    const spine = groupRef.current?.getObjectByName('mixamorigSpine')

    if (!groupRef.current) return;

    if (head) {
      headBone.current=head
    }

    if (spine) {
      spineBone.current=spineBone
    }
    // A. 등장 애니메이션 (위치)
    gsap.fromTo(groupRef.current.position, 
      { y: 0 }, 
      { y: -1.8, 
        duration: 1, 
        ease: 'power3.out', 
        onComplete: () => {
          // 실체화 완료 시 마우스 추적 시작
        setMouseTrackingEnabled(true);
        }
       } // 위치값 StudioStage에 맞게 조정 (-1.2 추천)
    );

    // B. 등장 애니메이션 (크기)
    gsap.fromTo(groupRef.current.scale, 
      { x: 0, y: 0, z: 0 }, 
      { x: 1.5, y: 1.5, z: 1.5, duration: 1.8, ease: 'back.out(1.2)', delay: 0.2 }
    );



    // D. 마우스 추적
    xTo.current = gsap.quickTo(groupRef.current.rotation, 'y', { duration: 0.8, ease: 'power2' }); // 반응 속도 조절
    yTo.current = gsap.quickTo(groupRef.current.rotation, 'x', { duration: 0.8, ease: 'power2' });

  }, { scope: groupRef });

useFrame((state) => {
    if (xTo.current && yTo.current) {
      // 마우스 움직임 범위 조절
      xTo.current(state.mouse.x * 0.2);
      yTo.current(-state.mouse.y * 0.1);
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      
      <OptimusRobot isHologram={isHologram} />

      {/* UI 텍스트 */}
      <Html position={[0.8, 1.7, 0]} transform occlude distanceFactor={2} style={{ pointerEvents: 'none' }}>
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm border-l-2 border-[#00ffcc] pl-3 pr-4 py-2 rounded-r-lg">
            <div className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse shadow-[0_0_10px_#00ffcc]"></div>
            <span className="text-[#00ffcc] font-mono text-xs tracking-widest uppercase">System Online</span>
          </div>
          <div className="bg-black/60 backdrop-blur-sm border-l-2 border-white/50 pl-3 pr-4 py-1 rounded-r-lg ml-4">
             <span className="text-white/70 font-mono text-[0.65rem] uppercase">Status: Scanning User</span>
          </div>
        </div>
      </Html>
    </group>
  );
}