/* === CompleteView / Submit Success View Component (제출 성공 화면 컴포넌트) === */
import React from 'react';

/**
 * CompleteView 컴포넌트는 모든 카드 정보가 유효성 검사를 성공적으로 통과하고 제출되었을 때
 * 스크린에 렌더링되는 가입 완료 안내 화면입니다.
 *
 * @component (컴포넌트)
 * @param {Object} props - Props (컴포넌트 속성 값)
 * @param {Function} props.onReset - Reset Handler Function (이전 카드 입력 폼으로 돌아가기 위한 리셋 핸들러 함수)
 */
export default function CompleteView({ onReset }) {
  return (
    <div 
      className="w-full max-w-[380px] flex flex-col items-center justify-center text-center px-spacing-300 py-spacing-0 md:px-spacing-0 md:py-spacing-0 lg:px-spacing-0 lg:py-spacing-0"
      role="region"
      aria-label="제출 성공 안내"
    >
      {/* === Complete Icon (완료 체크 아이콘) === */}
      <img 
        src={`${import.meta.env.BASE_URL}images/icon-complete.svg`} 
        alt="제출 완료 완료 아이콘" 
        className="w-[80px] h-[80px] mb-spacing-400"
      />

      {/* === Success Header (성공 헤더) === */}
      <h1 className="text-preset-1 font-medium text-purple-950 uppercase mb-spacing-200">
        Thank You!
      </h1>

      {/* === Success Description (성공 설명) === */}
      <p className="text-preset-3 lg:text-[16px] text-gray-400 font-medium mb-spacing-600">
        We've added your card details
      </p>

      {/* === Continue Button (계속하기 버튼) === */}
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
