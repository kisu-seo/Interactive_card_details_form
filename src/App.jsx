/* === App / Root Component (최상위 컴포넌트) === */
import React, { useState } from 'react';
import CardView from './components/CardView';
import CardForm from './components/CardForm';
import CompleteView from './components/CompleteView';

// --- Constants (상수 정의) ---

/**
 * @typedef {Object} CardFormData
 * @property {string} name - Cardholder Name (카드 소유자 이름)
 * @property {string} number - Formatted Card Number (공백이 포함된 16자리 카드 번호)
 * @property {string} month - Expiry Month (2자리 만료월)
 * @property {string} year - Expiry Year (2자리 만료연도)
 * @property {string} cvc - Card Verification Value (3자리 보안 코드)
 */
const INITIAL_FORM_DATA = {
  name: '',
  number: '',
  month: '',
  year: '',
  cvc: ''
};

/**
 * @typedef {Object} CardFormErrors
 * @property {string} name - 소유자 이름 유효성 검사(Validation) 오류 메시지
 * @property {string} number - 카드 번호 유효성 검사(Validation) 오류 메시지
 * @property {string} month - 만료월 유효성 검사(Validation) 오류 메시지
 * @property {string} year - 만료연도 유효성 검사(Validation) 오류 메시지
 * @property {string} cvc - CVC 유효성 검사(Validation) 오류 메시지
 */
const INITIAL_ERRORS = {
  name: '',
  number: '',
  month: '',
  year: '',
  cvc: ''
};

/**
 * App 컴포넌트는 대화형 카드 정보 입력 시스템의 루트(Root) 파일입니다.
 * 상태(State)를 최상위 부모에서 통합적으로 관리하며, 단방향 데이터 바인딩(One-way Data Binding) 구조로
 * 카드 시각화 영역(CardView)과 입력 폼 영역(CardForm / CompleteView)에 데이터를 공급합니다.
 *
 * @component (컴포넌트)
 */
export default function App() {
  // --- State Management (상태 관리) ---

  /** @type {[CardFormData, React.Dispatch<React.SetStateAction<CardFormData>>]} Card Input Values State (카드 입력 값 상태) */
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  /** @type {[CardFormErrors, React.Dispatch<React.SetStateAction<CardFormErrors>>]} Validation Errors State (유효성 검사 에러 메시지 상태) */
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} Form Submitted State (폼 제출 성공 여부 상태) */
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- Callback Handlers (콜백 핸들러) ---

  /**
   * 모든 유효성 검사(Validation)를 통과하고 폼을 제출(Submit)했을 때 실행되는 Callback Handler (콜백 핸들러) 함수입니다.
   * 성공 화면(CompleteView)으로 컴포넌트를 전환(State Transition)합니다.
   */
  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
  };

  /**
   * 제출 완료(Success) 화면에서 다시 카드 정보 입력 폼(Form)으로 돌아갈 때 상태(State)를 초기화하는 Handler (핸들러) 함수입니다.
   * 모든 카드 데이터 정보와 에러 상태를 초기 값(INITIAL_FORM_DATA / INITIAL_ERRORS)으로 리셋(Reset)합니다.
   */
  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors(INITIAL_ERRORS);
    setIsSubmitted(false);
  };

  return (
    <main className="flex flex-col lg:flex-row min-h-screen w-full max-w-[1440px] mx-auto bg-white relative">
      {/* === 좌측/상단 카드 시각화 영역 === */}
      <CardView formData={formData} />

      {/* === 우측/하단 카드 정보 입력 폼 및 결과 영역 === */}
      <section className="flex-1 flex items-center justify-center pt-[91px] pb-[44px] md:pt-[145px] md:pb-[70px] lg:py-spacing-0 lg:px-spacing-0 lg:justify-center xl:justify-end xl:pr-[225px]">
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
