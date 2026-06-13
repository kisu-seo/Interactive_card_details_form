// --- Component: CardView ---
import React from 'react';

/**
 * CardView 컴포넌트는 카드 입력 정보를 실시간으로 보여주는 컴포넌트입니다.
 * 모바일 화면에서는 상단 겹침 배치, 데스크톱 화면에서는 좌측 겹침 배치를 수행합니다.
 * @param {Object} props - 부모 컴포넌트로부터 전달받은 프로퍼티
 * @param {Object} props.formData - 카드 폼 입력 데이터
 */
export default function CardView({ formData }) {
  // --- 데이터 기본값 처리 (Placeholder) ---
  const cardNumber = formData.number || '0000 0000 0000 0000';
  const cardName = formData.name || 'JANE APPLESEED';
  const cardMonth = formData.month || '00';
  const cardYear = formData.year || '00';
  const cardCvc = formData.cvc || '000';

  return (
    <div 
      className="relative w-full h-[240px] bg-[url('/images/bg-main-mobile.png')] bg-cover bg-no-repeat lg:h-screen lg:w-[483px] shrink-0"
      aria-label="신용카드 시각화 영역"
    >
      {/* === 뒷면 카드 (Card Back) === */}
      <div 
        className="absolute top-[32px] right-[16px] w-[286px] h-[157px] bg-[url('/images/bg-card-back.png')] bg-cover rounded-[8px] shadow-2xl transition-all duration-300
                   lg:top-[469px] lg:left-[258px] lg:right-auto lg:w-[447px] lg:h-[245px] lg:rounded-[12px]"
        role="img"
        aria-label="신용카드 뒷면 이미지"
      >
        <span 
          className="absolute top-[70px] right-[35px] text-[9px] tracking-[0.15em] text-neutral-white font-medium
                     lg:top-[111px] lg:right-[50px] lg:text-[14px]"
        >
          {cardCvc}
        </span>
      </div>

      {/* === 앞면 카드 (Card Front) === */}
      <div 
        className="absolute top-[126px] left-[16px] w-[286px] h-[157px] bg-[url('/images/bg-card-front.png')] bg-cover rounded-[8px] p-[16px] flex flex-col justify-between shadow-2xl z-10 transition-all duration-300
                   lg:top-[187px] lg:left-[164px] lg:w-[447px] lg:h-[245px] lg:rounded-[12px] lg:p-[32px]"
        role="img"
        aria-label="신용카드 앞면 이미지"
      >
        {/* --- 카드 로고 --- */}
        <div className="flex items-center gap-[10px]">
          <img 
            src="/images/card-logo.svg" 
            alt="카드 로고 아이콘" 
            className="h-[30px] w-auto lg:h-[47px]" 
          />
        </div>

        {/* --- 카드 디테일 정보 --- */}
        <div className="flex flex-col gap-[12px] lg:gap-[24px]">
          {/* 카드 번호 */}
          <div 
            className="text-[18px] tracking-[0.15em] text-neutral-white font-medium break-all
                       lg:text-[28px]"
            aria-label={`카드 번호: ${cardNumber}`}
          >
            {cardNumber}
          </div>

          {/* 소유자 이름 및 만료일 */}
          <div className="flex justify-between items-center text-[9px] tracking-[0.15em] text-neutral-white uppercase lg:text-[14px]">
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
