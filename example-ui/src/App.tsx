import { useState } from "react";
import { formatPrice, analyzeChange, buildChangeMessage } from "fin-text-style";

function App() {
  const [current, setCurrent] = useState(88300);
  const [previous, setPrevious] = useState(86000);

  const priceText = formatPrice(current);
  const change = analyzeChange(current, previous);
  const message = buildChangeMessage(current, previous, { name: "삼성전자" });

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>fin-text-style Demo</h1>

      <div style={{ marginTop: "20px" }}>
        <label>현재가: </label>
        <input
          type="number"
          value={current}
          onChange={(e) => setCurrent(Number(e.target.value))}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>전일가: </label>
        <input
          type="number"
          value={previous}
          onChange={(e) => setPrevious(Number(e.target.value))}
        />
      </div>

      <hr style={{ margin: "20px 0" }} />

      <h2>Price</h2>
      <p>{priceText}</p>

      <h2>Change Summary</h2>
      <pre>{JSON.stringify(change, null, 2)}</pre>

      <h2>Message</h2>
      <p>{message}</p>
    </div>
  );
}

export default App;