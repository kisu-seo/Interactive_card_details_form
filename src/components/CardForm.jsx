/* === CardForm / Card Detail Form Component (카드 상세 폼 컴포넌트) === */
import React from 'react';

// --- Formatting & Validation Helpers (포맷팅 및 유효성 검사 도우미) ---

/**
 * 카드 번호 문자열에서 모든 공백을 제거한 후, 4자리 블록 단위로 자동 공백(Space)을 삽입합니다.
 * 모바일 및 웹 브라우저에서 가독성을 높이기 위해 16자리 숫자 길이로 제한합니다.
 *
 * @function (함수)
 * @param {string} value - User Input Card Number (가공되지 않은 사용자 입력 카드 번호 문자열)
 * @returns {string} Real-time Formatted Card Number (4자리마다 공백이 삽입된 실시간 포맷팅 카드 번호 문자열)
 */
const formatCardNumber = (value) => {
  const rawValue = value.replace(/\s/g, '');
  const truncated = rawValue.slice(0, 16);
  let formatted = '';
  for (let i = 0; i < truncated.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formatted += ' ';
    }
    formatted += truncated[i];
  }
  return formatted;
};

/**
 * 신용카드 정보 입력 데이터에 대해 전체적인 유효성 검사(Validation)를 일괄 처리합니다.
 * 빈 값 체크, 숫자 이외 형식 입력 제한, 고정 자릿수(16자리 카드번호, 2자리 월/연도, 3자리 CVC)를 엄격히 검증합니다.
 *
 * @function (함수)
 * @param {CardFormData} formData - Current Card Form Data (사용자가 입력한 현재 카드 폼 데이터)
 * @returns {{ errors: CardFormErrors, hasError: boolean }} Error State Object (오류 상태 객체 및 에러 포함 여부)
 */
const validateCardForm = (formData) => {
  const errors = { name: '', number: '', month: '', year: '', cvc: '' };
  let hasError = false;

  // 1. 소유자 이름 검증 (Cardholder Name Validation)
  if (!formData.name.trim()) {
    errors.name = "Can't be blank";
    hasError = true;
  }

  // 2. 카드 번호 검증 (Card Number Validation)
  const rawNumber = formData.number.replace(/\s/g, '');
  if (!formData.number.trim()) {
    errors.number = "Can't be blank";
    hasError = true;
  } else if (/[^\d]/.test(rawNumber)) {
    errors.number = "Wrong format, numbers only";
    hasError = true;
  } else if (rawNumber.length < 16) {
    errors.number = "Must be 16 digits";
    hasError = true;
  }

  // 3. 만료일(MM, 월) 검증 (Expiry Month Validation)
  if (!formData.month.trim()) {
    errors.month = "Can't be blank";
    hasError = true;
  } else if (/[^\d]/.test(formData.month)) {
    errors.month = "Numbers only";
    hasError = true;
  } else {
    const monthNum = parseInt(formData.month, 10);
    if (monthNum < 1 || monthNum > 12) {
      errors.month = "Invalid month";
      hasError = true;
    }
  }

  // 4. 만료일(YY, 연) 검증 (Expiry Year Validation)
  if (!formData.year.trim()) {
    errors.year = "Can't be blank";
    hasError = true;
  } else if (/[^\d]/.test(formData.year)) {
    errors.year = "Numbers only";
    hasError = true;
  }

  // 5. CVC 검증 (Card Verification Value Validation)
  if (!formData.cvc.trim()) {
    errors.cvc = "Can't be blank";
    hasError = true;
  } else if (/[^\d]/.test(formData.cvc)) {
    errors.cvc = "Wrong format, numbers only";
    hasError = true;
  } else if (formData.cvc.length < 3) {
    errors.cvc = "Must be 3 digits";
    hasError = true;
  }

  return { errors, hasError };
};

/**
 * CardForm 컴포넌트는 사용자의 카드 정보를 개별적으로 입력받고,
 * 각 인풋의 변경을 실시간 핸들링하며 최종 서브밋 시 유효성 검사 처리를 수행합니다.
 *
 * @component (컴포넌트)
 * @param {Object} props - Props (컴포넌트 속성 값)
 * @param {CardFormData} props.formData - Card Form State Data (카드 폼 상태 데이터)
 * @param {React.Dispatch<React.SetStateAction<CardFormData>>} props.setFormData - Card Data State Setter (카드 데이터 상태 변경 함수)
 * @param {CardFormErrors} props.errors - Error Message State Data (오류 메시지 상태 데이터)
 * @param {React.Dispatch<React.SetStateAction<CardFormErrors>>} props.setErrors - Error Message State Setter (오류 메시지 상태 변경 함수)
 * @param {Function} props.onSubmitSuccess - Submit Success Callback Function (유효성 검사 통과 시의 제출 완료 콜백 함수)
 */
export default function CardForm({ formData, setFormData, errors, setErrors, onSubmitSuccess }) {

  // --- Input Change Handlers (입력 변경 이벤트 핸들러) ---

  /**
   * 카드 소유자 이름 입력창의 값 변경을 처리합니다. 에러 메시지가 표시 중인 경우 이를 초기화합니다.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Event Object (이벤트 객체)
   */
  const handleNameChange = (e) => {
    setFormData(prev => ({ ...prev, name: e.target.value }));
    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
  };

  /**
   * 카드 번호 입력창의 값 변경을 처리합니다. 실시간으로 4자리 공백 포맷팅을 수행합니다.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Event Object (이벤트 객체)
   */
  const handleNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, number: formatted }));
    if (errors.number) setErrors(prev => ({ ...prev, number: '' }));
  };

  /**
   * 카드 만료일(월, MM) 입력창의 값 변경을 처리합니다. 2자리 길이 한계를 보장합니다.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Event Object (이벤트 객체)
   */
  const handleMonthChange = (e) => {
    const value = e.target.value.slice(0, 2);
    setFormData(prev => ({ ...prev, month: value }));
    if (errors.month) setErrors(prev => ({ ...prev, month: '' }));
  };

  /**
   * 카드 만료일(연, YY) 입력창의 값 변경을 처리합니다. 2자리 길이 한계를 보장합니다.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Event Object (이벤트 객체)
   */
  const handleYearChange = (e) => {
    const value = e.target.value.slice(0, 2);
    setFormData(prev => ({ ...prev, year: value }));
    if (errors.year) setErrors(prev => ({ ...prev, year: '' }));
  };

  /**
   * 카드 CVC 보안 코드 입력창의 값 변경을 처리합니다. 3자리 길이 한계를 보장합니다.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Event Object (이벤트 객체)
   */
  const handleCvcChange = (e) => {
    const value = e.target.value.slice(0, 3);
    setFormData(prev => ({ ...prev, cvc: value }));
    if (errors.cvc) setErrors(prev => ({ ...prev, cvc: '' }));
  };

  // --- Form Submit Validation (폼 제출 유효성 검사) ---

  /**
   * 폼 서브밋(Submit) 시 유효성 검사를 트리거하고 통과 시 완료 상태로 전이합니다.
   * @param {React.FormEvent<HTMLFormElement>} e - Form Event Object (폼 이벤트 객체)
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors: newErrors, hasError } = validateCardForm(formData);
    setErrors(newErrors);

    if (!hasError) {
      onSubmitSuccess();
    }
  };

  // --- Helper Classes Generator (동적 스타일 클래스 생성 헬퍼 함수) ---

  /**
   * 각 인풋을 감싸는 컨테이너에 에러 유무 및 포커스 상태에 맞춰 동적 1px 테두리 클래스명을 부여합니다.
   *
   * @param {string} errorMsg - Error Message Content (해당 입력 필드의 현재 에러 메시지 내용)
   * @returns {string} Dynamic Tailwind CSS Classes (동적 테두리 스타일링을 위한 테일윈드 CSS 클래스 문자열)
   */
  const getInputWrapperClass = (errorMsg) => {
    const base = "rounded-[8px] w-full h-[45px] flex items-center bg-white transition-all duration-200";
    if (errorMsg) {
      return `${base} border-red-400-error`; // 에러 시 빨간색 1px 테두리
    }
    // 포커스 시 보라색 그라디언트 2 테두리 1px 적용, 기본은 회색 1px 테두리
    return `${base} border-gray-200-normal focus-within:border-gradient-2-active`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[380px] flex flex-col gap-spacing-300 px-spacing-300 md:px-spacing-0 py-spacing-0 lg:px-spacing-0 lg:py-spacing-0 lg:max-w-[380px]"
      noValidate
    >
      <div className="flex flex-col gap-spacing-100">
        <label
          htmlFor="cardholder-name"
          className="text-preset-5 font-bold text-purple-950 uppercase"
        >
          Cardholder Name
        </label>
        <div className={getInputWrapperClass(errors.name)}>
          <input
            type="text"
            id="cardholder-name"
            placeholder="e.g. Jane Appleseed"
            value={formData.name}
            onChange={handleNameChange}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="w-full h-full bg-transparent px-spacing-200 text-preset-3 text-purple-950 placeholder-purple-950/25 border-none outline-none"
          />
        </div>
        {errors.name && (
          <span
            id="name-error"
            role="alert"
            className="text-red-400 text-preset-6 font-medium mt-0"
          >
            {errors.name}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-spacing-100">
        <label
          htmlFor="card-number"
          className="text-preset-5 font-bold text-purple-950 uppercase"
        >
          Card Number
        </label>
        <div className={getInputWrapperClass(errors.number)}>
          <input
            type="text"
            id="card-number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="e.g. 1234 5678 9123 0000"
            value={formData.number}
            onChange={handleNumberChange}
            aria-invalid={errors.number ? "true" : "false"}
            aria-describedby={errors.number ? "number-error" : undefined}
            className="w-full h-full bg-transparent px-spacing-200 text-preset-3 text-purple-950 placeholder-purple-950/25 border-none outline-none"
          />
        </div>
        {errors.number && (
          <span
            id="number-error"
            role="alert"
            className="text-red-400 text-preset-6 font-medium mt-0"
          >
            {errors.number}
          </span>
        )}
      </div>

      {/* === Expiry Date & CVC Layout (만료일 및 CVC 가로 배치 레이아웃) === */}
      <div className="flex gap-spacing-200 md:gap-spacing-300 lg:gap-spacing-200">
        {/* --- Expiry Date Area (만료일 입력 영역) --- */}
        <div className="flex flex-col gap-spacing-100 flex-1 md:w-[168px] md:flex-none lg:flex-1">
          <span className="text-preset-5 font-bold text-purple-950 uppercase">
            Exp. Date (MM/YY)
          </span>
          <div className="flex gap-spacing-100">
            {/* --- Expiry Month Input (만료 월 입력) --- */}
            <div className="flex-1">
              <div className={getInputWrapperClass(errors.month)}>
                <label htmlFor="card-expiry-month" className="sr-only">만료 월 (2자리)</label>
                <input
                  type="text"
                  id="card-expiry-month"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="MM"
                  value={formData.month}
                  onChange={handleMonthChange}
                  aria-invalid={errors.month ? "true" : "false"}
                  aria-describedby={errors.month ? "expiry-error" : undefined}
                  className="w-full h-full bg-transparent text-center md:text-left md:px-spacing-200 text-preset-3 text-purple-950 placeholder-purple-950/25 border-none outline-none"
                />
              </div>
            </div>

            {/* --- Expiry Year Input (만료 연도 입력) --- */}
            <div className="flex-1">
              <div className={getInputWrapperClass(errors.year)}>
                <label htmlFor="card-expiry-year" className="sr-only">만료 연도 (2자리)</label>
                <input
                  type="text"
                  id="card-expiry-year"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="YY"
                  value={formData.year}
                  onChange={handleYearChange}
                  aria-invalid={errors.year ? "true" : "false"}
                  aria-describedby={errors.year ? "expiry-error" : undefined}
                  className="w-full h-full bg-transparent text-center md:text-left md:px-spacing-200 text-preset-3 text-purple-950 placeholder-purple-950/25 border-none outline-none"
                />
              </div>
            </div>
          </div>
          {(errors.month || errors.year) && (
            <span
              id="expiry-error"
              role="alert"
              className="text-red-400 text-preset-6 font-medium mt-0"
            >
              {errors.month || errors.year}
            </span>
          )}
        </div>

        {/* --- CVC Input Area (CVC 입력 영역) --- */}
        <div className="flex flex-col gap-spacing-100 flex-1">
          <label
            htmlFor="card-cvc"
            className="text-preset-5 font-bold text-purple-950 uppercase"
          >
            CVC
          </label>
          <div className={getInputWrapperClass(errors.cvc)}>
            <input
              type="text"
              id="card-cvc"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="e.g. 123"
              value={formData.cvc}
              onChange={handleCvcChange}
              aria-invalid={errors.cvc ? "true" : "false"}
              aria-describedby={errors.cvc ? "cvc-error" : undefined}
              className="w-full h-full bg-transparent px-spacing-200 text-preset-3 text-purple-950 placeholder-purple-950/25 border-none outline-none"
            />
          </div>
          {errors.cvc && (
            <span
              id="cvc-error"
              role="alert"
              className="text-red-400 text-preset-6 font-medium mt-0"
            >
              {errors.cvc}
            </span>
          )}
        </div>
      </div>

      {/* === Confirm Button (확인 버튼) === */}
      <button
        type="submit"
        className="w-full h-[53px] bg-purple-950 text-white rounded-lg font-medium text-preset-3 cursor-pointer mt-spacing-0 md:mt-spacing-200 transition-all duration-200 hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#6348FE]"
      >
        Confirm
      </button>
    </form>
  );
}
