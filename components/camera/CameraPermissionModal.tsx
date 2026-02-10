'use client';

import React from 'react';

interface CameraPermissionModalProps {
  onGranted: () => void;
  onDenied: () => void;
}

export default function CameraPermissionModal({
  onGranted,
  onDenied,
}: CameraPermissionModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-sm w-full border border-blue-400/30 backdrop-blur-sm">
        {/* 헤더 */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <span className="text-3xl">🎥</span>
            <span>카메라 권한 요청</span>
          </h2>
        </div>

        {/* 콘텐츠 */}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <p className="text-gray-200 font-semibold leading-relaxed">
              Iron Man 인터페이스를 사용하기 위해 웹카메라 접근 권한이 필요합니다.
            </p>

            {/* 권한 설명 */}
            <div className="bg-blue-900/20 border border-blue-400/30 rounded-lg p-4 space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-blue-400 font-bold text-lg mt-1">✓</span>
                <div>
                  <p className="text-blue-100 font-semibold">카메라 접근</p>
                  <p className="text-gray-300 text-sm">
                    실시간 얼굴 인식 및 모션 추적
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-blue-400 font-bold text-lg mt-1">✓</span>
                <div>
                  <p className="text-blue-100 font-semibold">MediaPipe 적용</p>
                  <p className="text-gray-300 text-sm">
                    고급 AI 감지 모델 활용
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-blue-400 font-bold text-lg mt-1">✓</span>
                <div>
                  <p className="text-blue-100 font-semibold">개인정보 보호</p>
                  <p className="text-gray-300 text-sm">
                    모든 처리는 로컬에서만 진행됩니다
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm italic border-l-2 border-yellow-400 pl-3">
              💡 팁: 이 페이지를 나가거나 다른 탭으로 전환하면 카메라 스트림이 자동으로
              정지됩니다.
            </p>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 p-6 bg-gray-900/50 rounded-b-2xl border-t border-gray-700">
          <button
            onClick={onDenied}
            className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold rounded-lg transition-colors duration-200"
          >
            거부
          </button>

          <button
            onClick={onGranted}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/50"
          >
            동의
          </button>
        </div>

        {/* 주의 사항 */}
        <div className="px-6 pb-6">
          <p className="text-xs text-gray-500 text-center">
            권한을 거부해도 나중에 언제든지 다시 요청할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
