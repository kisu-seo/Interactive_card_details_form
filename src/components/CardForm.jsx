// --- Component: CardForm ---
import React from 'react';

/**
 * CardForm 컴포넌트는 사용자의 카드 정보를 입력받고 유효성 검사를 수행합니다.
 * @param {Object} props - 부모 컴포넌트로부터 전달받은 프로퍼티
 * @param {Object} props.formData - 카드 입력 데이터 상태
 * @param {Function} props.setFormData - 카드 입력 데이터 상태 변경 함수
 * @param {Object} props.errors - 오류 메시지 상태
 * @param {Function} props.setErrors - 오류 메시지 상태 변경 함수
 * @param {Function} props.onSubmitSuccess - 제출 성공 처리 함수
 */
export default function CardForm({ formData, setFormData, errors, setErrors, onSubmitSuccess }) {
  
  // --- 입력 처리 핸들러 (Input Handlers) ---
  
  // 1. 소유자 이름 입력 처리
  const handleNameChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, name: value }));
    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
  };

  // 2. 카드 번호 입력 처리 (4자리마다 공백 삽입)
  const handleNumberChange = (e) => {
    const value = e.target.value;
    // 공백 제거 후 16자리 제한
    const rawValue = value.replace(/\s/g, '');
    const truncated = rawValue.slice(0, 16);
    
    // 4자리 단위로 공백 추가 포맷팅 (글자 종류 무관)
    let formatted = '';
    for (let i = 0; i < truncated.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += truncated[i];
    }

    setFormData(prev => ({ ...prev, number: formatted }));
    if (errors.number) setErrors(prev => ({ ...prev, number: '' }));
  };

  // 3. 만료일(월) 입력 처리 (최대 2자리)
  const handleMonthChange = (e) => {
    const value = e.target.value.slice(0, 2);
    setFormData(prev => ({ ...prev, month: value }));
    if (errors.month) setErrors(prev => ({ ...prev, month: '' }));
  };

  // 4. 만료일(연) 입력 처리 (최대 2자리)
  const handleYearChange = (e) => {
    const value = e.target.value.slice(0, 2);
    setFormData(prev => ({ ...prev, year: value }));
    if (errors.year) setErrors(prev => ({ ...prev, year: '' }));
  };

  // 5. CVC 입력 처리 (최대 3자리)
  const handleCvcChange = (e) => {
    const value = e.target.value.slice(0, 3);
    setFormData(prev => ({ ...prev, cvc: value }));
    if (errors.cvc) setErrors(prev => ({ ...prev, cvc: '' }));
  };

  // --- 유효성 검사 및 제출 핸들러 (Submit Validation) ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { name: '', number: '', month: '', year: '', cvc: '' };
    let hasError = false;

    // 1. 카드 소유자 이름 검증
    if (!formData.name.trim()) {
      newErrors.name = "Can't be blank";
      hasError = true;
    }

    // 2. 카드 번호 검증
    const rawNumber = formData.number.replace(/\s/g, '');
    if (!formData.number.trim()) {
      newErrors.number = "Can't be blank";
      hasError = true;
    } else if (/[^\d]/.test(rawNumber)) {
      newErrors.number = "Wrong format, numbers only";
      hasError = true;
    } else if (rawNumber.length < 16) {
      newErrors.number = "Must be 16 digits";
      hasError = true;
    }

    // 3. 만료일(월) 검증
    if (!formData.month.trim()) {
      newErrors.month = "Can't be blank";
      hasError = true;
    } else if (/[^\d]/.test(formData.month)) {
      newErrors.month = "Numbers only";
      hasError = true;
    } else {
      const monthNum = parseInt(formData.month, 10);
      if (monthNum < 1 || monthNum > 12) {
        newErrors.month = "Invalid month";
        hasError = true;
      }
    }

    // 4. 만료일(연) 검증
    if (!formData.year.trim()) {
      newErrors.year = "Can't be blank";
      hasError = true;
    } else if (/[^\d]/.test(formData.year)) {
      newErrors.year = "Numbers only";
      hasError = true;
    }

    // 5. CVC 검증
    if (!formData.cvc.trim()) {
      newErrors.cvc = "Can't be blank";
      hasError = true;
    } else if (/[^\d]/.test(formData.cvc)) {
      newErrors.cvc = "Wrong format, numbers only";
      hasError = true;
    } else if (formData.cvc.length < 3) {
      newErrors.cvc = "Must be 3 digits";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      onSubmitSuccess();
    }
  };

  // --- 유효성 검사 기반 border(테두리) 스타일 생성 도우미 함수 ---
  const getInputWrapperClass = (errorMsg) => {
    const base = "rounded-lg p-[1px] transition-all duration-200";
    if (errorMsg) {
      return `${base} bg-error`; // 에러 시 빨간색 테두리
    }
    // 포커스 시 보라색 그라디언트 테두리 적용, 기본은 회색 테두리
    return `${base} bg-neutral-light-gray focus-within:bg-gradient-to-r focus-within:from-active-start focus-within:to-active-end`;
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-[380px] flex flex-col gap-[20px] px-[24px] py-[32px] lg:px-0 lg:py-0 lg:max-w-[380px]"
      noValidate
    >
      {/* === 카드 소유자 이름 입력 === */}
      <div className="flex flex-col gap-[8px]">
        <label 
          htmlFor="cardholder-name" 
          className="text-[12px] tracking-[0.15em] font-bold text-neutral-dark-violet uppercase"
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
            className="w-full h-[45px] bg-neutral-white px-[16px] rounded-[7px] text-[18px] text-neutral-dark-violet placeholder-neutral-gray/50 border-none outline-none"
          />
        </div>
        {errors.name && (
          <span 
            id="name-error" 
            role="alert" 
            className="text-error text-[12px] font-medium mt-[2px]"
          >
            {errors.name}
          </span>
        )}
      </div>

      {/* === 카드 번호 입력 === */}
      <div className="flex flex-col gap-[8px]">
        <label 
          htmlFor="card-number" 
          className="text-[12px] tracking-[0.15em] font-bold text-neutral-dark-violet uppercase"
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
            className="w-full h-[45px] bg-neutral-white px-[16px] rounded-[7px] text-[18px] text-neutral-dark-violet placeholder-neutral-gray/50 border-none outline-none"
          />
        </div>
        {errors.number && (
          <span 
            id="number-error" 
            role="alert" 
            className="text-error text-[12px] font-medium mt-[2px]"
          >
            {errors.number}
          </span>
        )}
      </div>

      {/* === 만료일 및 CVC 가로 배치 레이아웃 === */}
      <div className="flex gap-[20px]">
        {/* 만료일 입력 필드 세트 */}
        <div className="flex flex-col gap-[8px] flex-1">
          <span className="text-[12px] tracking-[0.15em] font-bold text-neutral-dark-violet uppercase">
            Exp. Date (MM/YY)
          </span>
          <div className="flex gap-[8px]">
            {/* 월 (MM) */}
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
                  className="w-full h-[45px] bg-neutral-white text-center rounded-[7px] text-[18px] text-neutral-dark-violet placeholder-neutral-gray/50 border-none outline-none"
                />
              </div>
            </div>

            {/* 연 (YY) */}
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
                  className="w-full h-[45px] bg-neutral-white text-center rounded-[7px] text-[18px] text-neutral-dark-violet placeholder-neutral-gray/50 border-none outline-none"
                />
              </div>
            </div>
          </div>
          {(errors.month || errors.year) && (
            <span 
              id="expiry-error" 
              role="alert" 
              className="text-error text-[12px] font-medium mt-[2px]"
            >
              {errors.month || errors.year}
            </span>
          )}
        </div>

        {/* CVC 입력 필드 */}
        <div className="flex flex-col gap-[8px] flex-1">
          <label 
            htmlFor="card-cvc" 
            className="text-[12px] tracking-[0.15em] font-bold text-neutral-dark-violet uppercase"
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
              className="w-full h-[45px] bg-neutral-white px-[16px] rounded-[7px] text-[18px] text-neutral-dark-violet placeholder-neutral-gray/50 border-none outline-none"
            />
          </div>
          {errors.cvc && (
            <span 
              id="cvc-error" 
              role="alert" 
              className="text-error text-[12px] font-medium mt-[2px]"
            >
              {errors.cvc}
            </span>
          )}
        </div>
      </div>

      {/* === 확인 버튼 === */}
      <button
        type="submit"
        className="w-full h-[53px] bg-neutral-dark-violet text-neutral-white rounded-lg font-medium text-[18px] cursor-pointer mt-[12px] transition-all duration-200 hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-active-start"
      >
        Confirm
      </button>
    </form>
  );
}
