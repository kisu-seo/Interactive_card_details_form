/* === CardView / Card Visualization Component (카드 시각화 컴포넌트) === */
import React from 'react';

// --- Helper Functions (도우미 함수) ---

/**
 * 카드 번호의 공백을 모두 제거하고, 총 16자리가 되도록 우측에 '0'을 채운(Padding) 뒤
 * 4자리씩 분할하여 4개의 블록을 담은 배열로 반환합니다.
 *
 * @param {string} number - Original Card Number (입력창으로부터 전달받은 원본 카드 번호)
 * @returns {string[]} Formatted Card Blocks (4자리 단위로 분할된 4개의 카드 번호 블록 배열)
 */
const getCardNumberBlocks = (number) => {
  const raw = (number || '').replace(/\s/g, '');
  const padded = raw.padEnd(16, '0');
  return [
    padded.slice(0, 4),
    padded.slice(4, 8),
    padded.slice(8, 12),
    padded.slice(12, 16)
  ];
};

/**
 * CardView 컴포넌트는 사용자가 입력한 카드 정보를 실시간으로 신용카드 플레이트 이미지 상에 반영하여 시각화합니다.
 * 해상도별(모바일 default, 태블릿 md, 중형 데스크톱 lg, 와이드 데스크톱 xl)로 정교한 오프셋 및 겹침 배치를 제공합니다.
 *
 * @component (컴포넌트)
 * @param {Object} props - Props (컴포넌트 속성 값)
 * @param {Object} props.formData - Card Form State Data (카드 폼 상태 데이터)
 */
export default function CardView({ formData }) {
  // --- Data Placeholder Processing (데이터 기본값 처리) ---
  const cardNumberBlocks = getCardNumberBlocks(formData.number);
  const cardName = formData.name || 'JANE APPLESEED';
  const cardMonth = formData.month || '00';
  const cardYear = formData.year || '00';
  const cardCvc = formData.cvc || '000';

  return (
    <div
      className="relative w-full h-[240px] md:h-[350px] bg-[url('/images/bg-main-mobile.png')] bg-cover bg-no-repeat lg:bg-[url('/images/bg-main-desktop.png')] lg:h-screen lg:w-[483px] shrink-0"
      aria-label="신용카드 시각화 영역"
    >
      {/* === Card Back (뒷면 카드) === */}
      <div
        className="absolute top-[32px] right-[16px] w-[286px] h-[157px] bg-[url('/images/bg-card-back.png')] bg-cover rounded-[8px] shadow-2xl transition-all duration-300
                   md:top-[32px] md:right-[112px] md:left-auto md:translate-x-0 md:w-[447px] md:h-[245px] md:rounded-[12px]
                   lg:top-[420px] lg:left-[140px] lg:right-auto lg:w-[447px] lg:h-[245px] lg:rounded-[12px]
                   xl:top-[466px] xl:left-[258px]"
        role="img"
        aria-label="신용카드 뒷면 이미지"
      >
        <span
          className="absolute top-[70px] right-[35px] text-preset-7 text-white font-medium
                     md:top-[111px] md:right-[50px] md:text-preset-4
                     lg:top-[111px] lg:right-[50px] lg:text-preset-4"
        >
          {cardCvc}
        </span>
      </div>

      {/* === Card Front (앞면 카드) === */}
      <div
        className="absolute top-[126px] left-[16px] w-[286px] h-[157px] bg-[url('/images/bg-card-front.png')] bg-cover rounded-[8px] p-spacing-200 flex flex-col justify-between shadow-2xl z-10 transition-all duration-300
                   md:top-[171px] md:left-[112px] md:translate-x-0 md:w-[447px] md:h-[245px] md:rounded-[12px] md:py-spacing-300 md:px-spacing-400
                   lg:top-[150px] lg:left-[80px] lg:w-[447px] lg:h-[245px] lg:rounded-[12px] lg:p-spacing-400
                   xl:top-[189px] xl:left-[164px]"
        role="img"
        aria-label="신용카드 앞면 이미지"
      >
        {/* --- Card Logo (카드 로고) --- */}
        <div className="flex items-center gap-[10px]">
          <img
            src="/images/card-logo.svg"
            alt="카드 로고 아이콘"
            className="h-[30px] w-auto md:h-[47px] lg:h-[47px]"
          />
        </div>

        {/* --- Card Details (카드 상세 정보) --- */}
        <div className="flex flex-col gap-[12px] w-[245px] md:w-[383px] md:gap-spacing-300 lg:w-[383px] lg:gap-spacing-300">
          {/* 카드 번호 */}
          <div
            className="flex justify-between w-full text-preset-2 text-white font-medium md:text-preset-1 lg:text-preset-1"
            aria-label={`카드 번호: ${cardNumberBlocks.join(' ')}`}
          >
            {cardNumberBlocks.map((block, idx) => (
              <span key={idx}>{block}</span>
            ))}
          </div>

          {/* 소유자 이름 및 만료일 */}
          <div className="flex justify-between items-center text-preset-7 text-white uppercase md:text-preset-4 lg:text-preset-4 font-medium">
            <span aria-label={`카드 소유자 이름: ${cardName}`}>
              {cardName}
            </span>
            <span aria-label={`만료 날짜: ${cardMonth}월 ${cardYear}년`}>
              {cardMonth}/{cardYear}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
