import React, { useState, useEffect } from "react";
import "../styles/Calc.css";
function Calc() {
  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState(1);
  const [from, setFrom] = useState("USD");
  const [amount, setAmount] = useState("1");
  const [calculatedAmount, setCalculatedAmount] = useState(1);

  const fromChange = (e) => {
    setFrom(e.target.value);
  };

  const amountChange = (e) => {
    const inputAmount = e.target.value;
    setAmount(inputAmount);

    try {
      const result = new Function(`return ${inputAmount}`)();
      if (typeof result === "number" && !isNaN(result)) {
        setCalculatedAmount(result);
      }
    } catch (e) {}
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.frankfurter.app/latest?from=${from}&to=KRW`)
      .then((response) => response.json())
      .then((json) => {
        setRate(json.rates.KRW);
        setLoading(false);
      });
  }, [from]);

  return (
    <div className="main">
      <h1>환율 계산기</h1>

      <div className="cal">
        <div className="cal-row">
          <span>기준 통화 선택</span>
          <select value={from} onChange={fromChange}>
            <option value="USD">미국 달러 (USD)</option>
            <option value="EUR">유로 (EUR)</option>
            <option value="GBP">영국 파운드 (GBP)</option>
            <option value="AUD">호주 (AUD)</option>
            <option value="JPY">일본 엔 (JPY)</option>
            <option value="CNY">중국 위안 (CNY)</option>
          </select>
        </div>

        <div className="cal-row">
          <div className="input-group">
            <span>{from} 입력:</span>
            <input
              type="text"
              value={amount}
              onChange={amountChange}
              placeholder="금액 입력"
            />
          </div>
          <p className="helper-text">
            * 사칙연산 입력이 가능합니다. (예: 10+20)
          </p>
        </div>

        <hr className="divider" />

        <div className="calc-result">
          <span className="from-amount">
            {calculatedAmount.toLocaleString()} {from}
          </span>
          <span className="to-amount">
            {loading
              ? "변환 중..."
              : `= ${(calculatedAmount * rate).toLocaleString(undefined, { minimumFractionDigits: 2 })} 원`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Calc;
