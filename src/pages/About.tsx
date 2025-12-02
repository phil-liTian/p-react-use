/*
 * @Author: phil
 * @Date: 2025-12-02 14:23:14
 */
import { Link } from 'react-router-dom'

const About = () => (
  <div style={{
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  }}>
    <h1 style={{ color: '#333', marginBottom: '20px' }}>关于 React Hooks 演示平台</h1>
    <div style={{ lineHeight: '1.6', color: '#555' }}>
      <h2>项目介绍</h2>
      <p>这是一个用于演示和学习 React Hooks 的交互式平台。我们收集了各种实用的自定义 Hooks，帮助开发者更好地理解和应用这些强大的工具。</p>
      
      <h2>包含的 Hooks</h2>
      <ul>
        <li><strong>useBattery</strong> - 电池状态监控</li>
        <li><strong>useCounter</strong> - 带边界控制的计数器</li>
        <li><strong>useGetSet</strong> - 稳定引用的状态管理</li>
        <li><strong>useToggle</strong> - 布尔状态切换</li>
        <li><strong>useUpdate</strong> - 强制组件重渲染</li>
        <li><strong>useEvent</strong> - 事件监听器管理</li>
      </ul>
      
      <h2>技术栈</h2>
      <p>React 19 + TypeScript + React Router + Vite</p>
      
      <div style={{ marginTop: '30px' }}>
        <Link to="/" style={{
          color: '#007bff',
          textDecoration: 'none',
          fontSize: '16px'
        }}>← 返回首页</Link>
      </div>
    </div>
  </div>
)

export default About