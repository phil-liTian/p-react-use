/*
 * @Author: phil
 * @Date: 2025-12-02 14:23:14
 */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 触摸滑动处理
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // 向左滑动 - 可以添加导航逻辑
      console.log("向左滑动");
    }

    if (isRightSwipe) {
      // 向右滑动 - 可以添加导航逻辑
      console.log("向右滑动");
    }
  };

  // 根据设备调整字体大小
  const getFontSize = (desktop: number, mobile: number) => {
    return isMobile ? mobile : desktop;
  };

  return (
    <div
      style={{
        padding: isMobile ? "20px 15px" : "40px 20px",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        touchAction: "pan-y",
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <h1
        style={{
          fontSize: getFontSize(48, 32),
          color: "#333",
          marginBottom: "20px",
          lineHeight: 1.2,
          wordBreak: "break-word",
        }}
      >
        ⚛️ React 综合演示平台
      </h1>
      <p
        style={{
          fontSize: getFontSize(20, 16),
          color: "#666",
          marginBottom: isMobile ? "30px" : "50px",
          lineHeight: 1.5,
          padding: "0 10px",
        }}
      >
        全方位展示 React 技术栈，包含 Hooks、组件封装和个人项目经验
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(300px, 1fr))",
          gap: isMobile ? "20px" : "30px",
          maxWidth: "1000px",
          marginBottom: isMobile ? "30px" : "40px",
          width: "100%",
          padding: isMobile ? "0 10px" : "0",
        }}
      >
        {/* React Hooks 区域 */}
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            textAlign: "center",
            minWidth: "280px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>🔧</div>
          <h3 style={{ fontSize: "24px", color: "#333", marginBottom: "15px" }}>
            React Hooks 处理
          </h3>
          <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>
            深入理解和使用 React Hooks，包含自定义 Hooks 的创建和最佳实践
          </p>
          <Link
            to="/hooks"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#1890ff",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "16px",
              transition: "background-color 0.3s",
            }}
          >
            探索 Hooks
          </Link>
        </div>

        {/* Ant Design 组件区域 */}
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            textAlign: "center",
            minWidth: "280px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>🎨</div>
          <h3 style={{ fontSize: "24px", color: "#333", marginBottom: "15px" }}>
            Ant Design 组件封装
          </h3>
          <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>
            Ant Design 源码剖析与组件封装
          </p>
          <Link
            to="/components"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#52c41a",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "16px",
              transition: "background-color 0.3s",
            }}
          >
            查看组件
          </Link>
        </div>

        {/* 个人介绍区域 */}
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            textAlign: "center",
            minWidth: "280px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>👨‍💻</div>
          <h3 style={{ fontSize: "24px", color: "#333", marginBottom: "15px" }}>
            个人介绍
          </h3>
          <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>
            了解开发者的技术背景、项目经验和技术栈掌握情况
          </p>
          <Link
            to="/about"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#722ed1",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "16px",
              transition: "background-color 0.3s",
            }}
          >
            了解更多
          </Link>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <p style={{ fontSize: "14px", color: "#999" }}>
          基于 React + TypeScript + Vite 构建的现代 Web 应用
        </p>
      </div>
    </div>
  );
};

export default Home;
