import { useEvent } from "@react/use";
import { useState } from "react";

export const Event = () => {
  const [clickCount, setClickCount] = useState(0);
  const [keyPressed, setKeyPressed] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // 处理窗口点击事件
  const handleWindowClick = () => {
    setClickCount(prev => prev + 1);
  };

  // 处理键盘按键事件
  const handleKeyPress = (event: Event) => {
    const keyboardEvent = event as KeyboardEvent;
    setKeyPressed(keyboardEvent.key);
  };

  // 处理鼠标移动事件
  const handleMouseMove = (event: Event) => {
    const mouseEvent = event as MouseEvent;
    setMousePosition({
      x: mouseEvent.clientX,
      y: mouseEvent.clientY
    });
  };

  // 处理窗口大小改变事件
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  // 使用 useEvent 钩子绑定事件
  useEvent("click", handleWindowClick, window);
  useEvent("keydown", handleKeyPress, window);
  useEvent("mousemove", handleMouseMove, window);
  useEvent("resize", handleResize, window);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>useEvent Hook Demo</h2>
      
      <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
        <h3>窗口点击事件</h3>
        <p>点击窗口任意位置增加计数</p>
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1890ff" }}>
          点击次数: {clickCount}
        </div>
      </div>

      <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
        <h3>键盘按键事件</h3>
        <p>按下任意键盘按键</p>
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#52c41a" }}>
          最后按键: {keyPressed || "无"}
        </div>
      </div>

      <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
        <h3>鼠标位置追踪</h3>
        <p>移动鼠标查看实时位置</p>
        <div style={{ fontSize: "18px", fontWeight: "bold", color: "#fa8c16" }}>
          鼠标位置: X: {mousePosition.x}, Y: {mousePosition.y}
        </div>
      </div>

      <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
        <h3>窗口大小监控</h3>
        <p>调整浏览器窗口大小</p>
        <div style={{ fontSize: "18px", fontWeight: "bold", color: "#722ed1" }}>
          窗口尺寸: {windowSize.width} × {windowSize.height}
        </div>
      </div>

      <div style={{ marginTop: "30px", padding: "15px", backgroundColor: "#f0f0f0", borderRadius: "5px" }}>
        <h4>功能说明：</h4>
        <ul>
          <li>点击窗口任意位置会增加点击计数</li>
          <li>按下键盘任意按键会显示按键名称</li>
          <li>移动鼠标会实时更新鼠标位置坐标</li>
          <li>调整浏览器窗口大小会更新尺寸信息</li>
        </ul>
      </div>
    </div>
  );
};
