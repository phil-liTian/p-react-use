/*
 * @Author: phil
 * @Date: 2025-11-28 16:31:52
 */
import { useState } from "react";
import { Battery } from "./Battery";
import { Counter } from "./Counter";
import { GetSet } from "./GetSet";
import { Update } from "./Update";
import { Toggle } from "./Toggle";
import { Event } from "./Event";

const HookDemo = () => {
  const [activeSection, setActiveSection] = useState("battery");

  // 组件配置数组
  const components = [
    { id: "battery", label: "🔋 电池监控", icon: "🔋", Component: Battery },
    { id: "counter", label: "🔢 计数器", icon: "🔢", Component: Counter },
    { id: "update", label: "🔄 更新器", icon: "🔄", Component: Update },
    { id: "getset", label: "⚙️ GetSet", icon: "⚙️", Component: GetSet },
    { id: "toggle", label: "🔘 切换器", icon: "🔘", Component: Toggle },
    { id: "event", label: "📡 事件监听", icon: "📡", Component: Event },
  ];

  // 滚动到指定部分
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 导航栏样式
  const navContainerStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 100,
    backgroundColor: "#fff",
    borderBottom: "1px solid #e0e0e0",
    padding: "10px 0",
    marginBottom: "20px",
  };

  const navStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "10px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  };

  const navItemStyle = (isActive: boolean): React.CSSProperties => ({
    padding: "8px 16px",
    border: "none",
    borderRadius: "20px",
    backgroundColor: isActive ? "#007bff" : "#f8f9fa",
    color: isActive ? "white" : "#495057",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  });

  const sectionContainerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  };

  return (
    <div>
      {/* 导航栏 */}
      <nav style={navContainerStyle}>
        <div style={navStyle}>
          {components.map((item) => (
            <button
              key={item.id}
              style={navItemStyle(activeSection === item.id)}
              onClick={() => scrollToSection(item.id)}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* 内容区域 */}
      <div style={sectionContainerStyle}>
        {components.map((item) => {
          const Component = item.Component;
          return (
            <section key={item.id} id={item.id}>
              <Component />
            </section>
          );
        })}
      </div>
    </div>
  );
};

export { HookDemo };
