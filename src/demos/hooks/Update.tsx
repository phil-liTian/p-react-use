import { useUpdate } from "@react/use";
import { useState, useRef } from "react";

const Update = () => {
  // 使用 useUpdate 强制重渲染
  const update = useUpdate();
  
  // 普通状态 - 会触发重渲染
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState("Hello World");
  
  // useRef 状态 - 修改不会触发重渲染
  const timeRef = useRef(Date.now());
  const dataRef = useRef({
    timestamp: Date.now(),
    random: Math.random(),
    userAgent: navigator.userAgent.substring(0, 50) + "..."
  });

  // 样式定义
  const containerStyle: React.CSSProperties = {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    margin: '10px 0',
    fontFamily: 'Arial, sans-serif',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const displayStyle: React.CSSProperties = {
    padding: '10px',
    backgroundColor: '#e9ecef',
    borderRadius: '4px',
    margin: '10px 0',
    fontFamily: 'monospace',
    fontSize: '14px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#0056b3';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#007bff';
  };

  // 更新 ref 数据（不会触发重渲染）
  const updateRefData = () => {
    timeRef.current = Date.now();
    dataRef.current = {
      timestamp: Date.now(),
      random: Math.random(),
      userAgent: navigator.userAgent.substring(0, 50) + "..."
    };
    console.log('Ref data updated:', dataRef.current);
  };

  // 强制重渲染
  const forceUpdate = () => {
    update();
  };

  // 更新计数器（会触发重渲染）
  const incrementCounter = () => {
    setCounter(prev => prev + 1);
  };

  // 更新消息（会触发重渲染）
  const updateMessage = () => {
    const messages = [
      "Hello World",
      "React is awesome!",
      "TypeScript rocks!",
      "Custom hooks are powerful",
      "Force update works!"
    ];
    const currentIndex = messages.indexOf(message);
    const nextIndex = (currentIndex + 1) % messages.length;
    setMessage(messages[nextIndex]);
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
        强制更新示例
      </h3>

      {/* useRef 数据部分 */}
      <div style={sectionStyle}>
        <h4 style={{ color: '#495057', marginBottom: '10px' }}>📦 useRef 数据（修改不会触发重渲染）</h4>
        <div style={displayStyle}>
          <div>时间戳: {timeRef.current}</div>
          <div>随机数: {dataRef.current.random}</div>
          <div>UserAgent: {dataRef.current.userAgent}</div>
        </div>
        <button
          style={buttonStyle}
          onClick={updateRefData}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          更新 Ref 数据
        </button>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
          💡 注意：更新 ref 不会触发组件重渲染，界面不会自动更新
        </p>
      </div>

      {/* useState 数据部分 */}
      <div style={sectionStyle}>
        <h4 style={{ color: '#495057', marginBottom: '10px' }}>🔄 useState 数据（修改会触发重渲染）</h4>
        <div style={displayStyle}>
          <div>计数器: {counter}</div>
          <div>消息: {message}</div>
        </div>
        <div>
          <button
            style={buttonStyle}
            onClick={incrementCounter}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            计数器 +1
          </button>
          <button
            style={buttonStyle}
            onClick={updateMessage}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            切换消息
          </button>
        </div>
      </div>

      {/* 强制更新演示 */}
      <div style={sectionStyle}>
        <h4 style={{ color: '#495057', marginBottom: '10px' }}>⚡ useUpdate 强制重渲染</h4>
        <div style={displayStyle}>
          <div>当前时间: {Date.now()}</div>
          <div>渲染次数: {Math.floor(Math.random() * 1000)}</div>
        </div>
        <button
          style={{
            ...buttonStyle,
            backgroundColor: '#dc3545',
          }}
          onClick={forceUpdate}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#c82333';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#dc3545';
          }}
        >
          🔄 强制重渲染
        </button>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
          💡 点击此按钮会强制组件重渲染，更新时间戳和随机数
        </p>
      </div>

      {/* 使用场景说明 */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#e3f2fd',
        borderRadius: '4px',
        fontSize: '14px',
        color: '#1565c0'
      }}>
        <strong>💡 useUpdate 使用场景：</strong>
        <ul style={{ marginTop: '10px', marginBottom: 0 }}>
          <li>需要强制重渲染组件但不想创建新的状态</li>
          <li>更新 ref 数据后需要界面重新渲染</li>
          <li>监听外部数据变化并刷新界面</li>
          <li>性能优化：避免不必要的 useState 创建</li>
        </ul>
      </div>

      {/* 对比说明 */}
      <div style={{
        marginTop: '15px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        borderRadius: '4px',
        fontSize: '14px',
        color: '#856404'
      }}>
        <strong>🔍 对比说明：</strong>
        <div style={{ marginTop: '10px' }}>
          <strong>useState:</strong> 修改状态会触发重渲染，适合管理组件状态
          <br />
          <strong>useRef:</strong> 修改引用不会触发重渲染，适合存储可变值
          <br />
          <strong>useUpdate:</strong> 强制触发重渲染，适合需要刷新但不想创建新状态的场景
        </div>
      </div>
    </div>
  );
};

export { Update };
