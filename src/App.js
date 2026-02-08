import React, { useState, useEffect } from "react";

function App() {
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
    <div>
      <h1>환율 계산기</h1>
      <h3>기준 통화 선택</h3>
      <select value={from} onChange={fromChange}>
        <option value="USD">미국 달러 (USD)</option>
        <option value="EUR">유로 (EUR)</option>
        <option value="GBP">영국 파운드 (GBP)</option>
        <option value="AUD">호주 (AUD)</option>
        <option value="JPY">일본 엔 (JPY)</option>
        <option value="CNY">중국 위안 (GBP)</option>
      </select>
      <input type="text" value={amount} onChange={amountChange}></input>
      <span> {calculatedAmount}</span>
      <span>
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <h2>{(calculatedAmount * rate).toFixed(2)} 원</h2>
        )}
      </span>
    </div>
  );
}

export default App;
