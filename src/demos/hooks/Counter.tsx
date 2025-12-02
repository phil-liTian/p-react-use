import { useCounter } from "@react/use";

const Counter = () => {
  // 使用计数器 hook，设置初始值为 5，最大值为 20，最小值为 0
  const [counter, { set, inc, dec, reset }] = useCounter(5, 20, 0);

  // 内联样式
  const containerStyle: React.CSSProperties = {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    margin: "10px 0",
    fontFamily: "Arial, sans-serif",
  };

  const counterDisplayStyle: React.CSSProperties = {
    fontSize: "48px",
    fontWeight: "bold",
    color: counter > 15 ? "#28a745" : counter > 10 ? "#ffc107" : "#dc3545",
    textAlign: "center",
    margin: "20px 0",
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "#0056b3";
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "#007bff";
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        计数器示例
      </h3>

      <div style={counterDisplayStyle}>{counter}</div>

      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle}
          onClick={() => inc(1)}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          +1
        </button>

        <button
          style={buttonStyle}
          onClick={() => inc(5)}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          +5
        </button>

        <button
          style={buttonStyle}
          onClick={() => dec(1)}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          -1
        </button>

        <button
          style={buttonStyle}
          onClick={() => dec(3)}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          -3
        </button>

        <button
          style={buttonStyle}
          onClick={() => reset()}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          重置
        </button>

        <button
          style={buttonStyle}
          onClick={() => set(15)}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          设置为15
        </button>
      </div>

      <div
        style={{
          marginTop: "15px",
          textAlign: "center",
          fontSize: "12px",
          color: "#666",
        }}
      >
        范围: 0-20 | 当前值: {counter}
      </div>
    </div>
  );
};

export { Counter };
