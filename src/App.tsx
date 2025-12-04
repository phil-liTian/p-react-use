/*
 * @Author: phil
 * @Date: 2025-07-23 17:05:46
 */
import { Routes, Route, Navigate } from "react-router-dom";
import { HookDemo } from "./demos/hooks/index";
import { ComponentsDemo } from "./demos/components/index";
import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/404";

function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hooks" element={<HookDemo />} />
        <Route path="/components" element={<ComponentsDemo />} />
        <Route path="/about" element={<About />} />
        <Route path="/404" element={<NotFound />} />
        {/* 捕获所有未匹配的路由并重定向到404页面 */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}

export default App;
