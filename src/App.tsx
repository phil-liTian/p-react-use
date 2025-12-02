/*
 * @Author: phil
 * @Date: 2025-07-23 17:05:46
 */
import { Routes, Route } from "react-router-dom";
import { HookDemo } from "./demos/hooks/index";
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hooks" element={<HookDemo />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
