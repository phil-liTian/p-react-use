/*
 * @Author: phil
 * @Date: 2025-11-28 16:31:52
 */
import { useState, useEffect, useRef } from "react";
import { Battery } from "./Battery";
import { Counter } from "./Counter";
import { GetSet } from "./GetSet";
import { Update } from "./Update";
import { Toggle } from "./Toggle";
import { Event } from "./Event";

const HookDemo = () => {
  const [activeSection, setActiveSection] = useState("battery");
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

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

  // 设置section引用
  const setSectionRef =
    (sectionId: string) => (element: HTMLElement | null) => {
      sectionRefs.current[sectionId] = element;
    };

  // 使用Intersection Observer监听滚动
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // 观察所有section
    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // 检测移动端和窗口大小变化
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // 切换菜单折叠状态
  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  // 导航栏样式
  const navContainerStyle: React.CSSProperties = {
    position: "fixed",
    left: isMobile && isMenuCollapsed ? "-240px" : "0",
    top: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "#fff",
    borderRight: "1px solid #e0e0e0",
    padding: "20px 0",
    width: "220px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
    transition: "left 0.3s ease",
  };

  // 移动端遮罩层样式
  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 99,
    display: isMobile && !isMenuCollapsed ? "block" : "none",
  };

  // 汉堡菜单按钮样式
  const hamburgerStyle: React.CSSProperties = {
    position: "fixed",
    top: "20px",
    left: isMobile && !isMenuCollapsed ? "240px" : "20px",
    zIndex: 101,
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "10px",
    cursor: "pointer",
    fontSize: "18px",
    transition: "left 0.3s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  };

  const navStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "0 16px",
    flex: 1,
  };

  const navItemStyle = (isActive: boolean): React.CSSProperties => ({
    padding: "12px 16px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: isActive ? "#007bff" : "transparent",
    color: isActive ? "white" : "#495057",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textAlign: "left",
    width: "100%",
    marginBottom: "2px",
  });

  const sectionContainerStyle: React.CSSProperties = {
    marginLeft: isMobile ? "0" : "240px",
    padding: isMobile ? "60px 20px 20px" : "20px 40px",
    minHeight: "100vh",
    transition: "margin-left 0.3s ease",
  };

  return (
    <div>
      {/* 移动端汉堡菜单按钮 */}
      {isMobile && (
        <button style={hamburgerStyle} onClick={toggleMenu}>
          {isMenuCollapsed ? "☰" : "✕"}
        </button>
      )}

      {/* 移动端遮罩层 */}
      {isMobile && !isMenuCollapsed && (
        <div style={overlayStyle} onClick={toggleMenu}></div>
      )}

      {/* 导航栏 */}
      <nav style={navContainerStyle}>
        <div style={navStyle}>
          {components.map((item) => (
            <button
              key={item.id}
              style={navItemStyle(activeSection === item.id)}
              onClick={() => {
                scrollToSection(item.id);
                if (isMobile) {
                  setIsMenuCollapsed(true); // 移动端点击后自动收起菜单
                }
              }}
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
            <section key={item.id} id={item.id} ref={setSectionRef(item.id)}>
              <Component />
            </section>
          );
        })}
      </div>
    </div>
  );
};

export { HookDemo };
