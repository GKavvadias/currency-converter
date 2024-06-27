import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [amount, setAmount] = useState("");
  const [currency1, setCurrency1] = useState("EUR");
  const [currency2, setCurrency2] = useState("USD");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchCurrency() {
        setIsLoading(true);
        const response = await fetch(`https://api.frankfurter.app/latest?amount=1&from=${currency1}&to=${currency2}`);

        const data = await response.json();
        console.log(data.rates);
        console.log(data.rates[currency2]);

        const currency = data.rates[currency2];

        setOutput(amount * currency);
        setIsLoading(false);
      }

      if (currency1 === currency2) return setOutput(amount);
      fetchCurrency();
    },
    [currency1, currency2, amount]
  );

  return (
    <>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        // disabled={isLoading}
      />
      <select
        value={currency1}
        onChange={(e) => setCurrency1(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={currency2}
        onChange={(e) => setCurrency2(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {currency2}
      </p>
    </>
  );
}
