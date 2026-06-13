// --- Component: App (Root) ---
import React, { useState } from 'react';
import CardView from './components/CardView';
import CardForm from './components/CardForm';
import CompleteView from './components/CompleteView';

/**
 * App 컴포넌트는 대화형 카드 상세 정보 폼의 루트 컴포넌트입니다.
 * 상태를 단방향으로 흐르게 관리하여 CardView와 CardForm을 조립합니다.
 */
export default function App() {
  // --- 카드 데이터 상태 관리 ---
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    month: '',
    year: '',
    cvc: ''
  });

  // --- 유효성 검사 오류 메시지 상태 ---
  const [errors, setErrors] = useState({
    name: '',
    number: '',
    month: '',
    year: '',
    cvc: ''
  });

  // --- 최종 제출 완료 여부 상태 ---
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- 폼 등록 성공 시 핸들러 ---
  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
  };

  // --- 초기화 후 첫 화면으로 되돌아가는 핸들러 ---
  const handleReset = () => {
    setFormData({
      name: '',
      number: '',
      month: '',
      year: '',
      cvc: ''
    });
    setErrors({
      name: '',
      number: '',
      month: '',
      year: '',
      cvc: ''
    });
    setIsSubmitted(false);
  };

  return (
    <main className="flex flex-col lg:flex-row min-h-screen w-full bg-white relative">
      {/* === 좌측/상단 카드 시각화 영역 === */}
      <CardView formData={formData} />

      {/* === 우측/하단 카드 정보 입력 폼 및 결과 영역 === */}
      <section className="flex-1 flex items-center justify-center pt-[91px] pb-[44px] lg:py-spacing-0 lg:px-spacing-500">
        {!isSubmitted ? (
          <CardForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            onSubmitSuccess={handleSubmitSuccess}
          />
        ) : (
          <CompleteView onReset={handleReset} />
        )}
      </section>
    </main>
  );
}
