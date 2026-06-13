// --- Component: CompleteView ---
import React from 'react';

/**
 * CompleteView 컴포넌트는 카드 정보가 성공적으로 제출되었을 때 보여지는 성공 메시지 화면입니다.
 * @param {Object} props - 프로퍼티
 * @param {Function} props.onReset - 처음 입력 폼으로 되돌아가는 초기화 함수
 */
export default function CompleteView({ onReset }) {
  return (
    <div 
      className="w-full max-w-[380px] flex flex-col items-center justify-center text-center px-spacing-300 py-spacing-500 lg:px-spacing-0 lg:py-spacing-0"
      role="region"
      aria-label="제출 성공 안내"
    >
      {/* === 완료 체크 아이콘 === */}
      <img 
        src="/images/icon-complete.svg" 
        alt="제출 완료 완료 아이콘" 
        className="w-[80px] h-[80px] mb-[35px] animate-bounce"
      />

      {/* === 성공 헤더 === */}
      <h1 className="text-preset-1 font-bold text-purple-950 uppercase mb-spacing-200">
        Thank You!
      </h1>

      {/* === 성공 설명 === */}
      <p className="text-[16px] text-gray-400 font-medium mb-spacing-600">
        We've added your card details
      </p>

      {/* === 계속하기 버튼 (처음 상태로 회귀) === */}
      <button
        type="button"
        onClick={onReset}
        className="w-full h-[53px] bg-purple-950 text-white rounded-lg font-medium text-preset-3 cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#6348FE]"
      >
        Continue
      </button>
    </div>
  );
}
