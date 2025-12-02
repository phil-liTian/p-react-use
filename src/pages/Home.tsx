/*
 * @Author: phil
 * @Date: 2025-12-02 14:23:14
 */
import { Link } from 'react-router-dom'

const Home = () => (
  <div style={{
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <h1 style={{ fontSize: '48px', color: '#333', marginBottom: '20px' }}>
      🚀 React Hooks 演示平台
    </h1>
    <p style={{ fontSize: '20px', color: '#666', marginBottom: '40px' }}>
      探索各种实用的 React Hooks，提升你的开发效率
    </p>
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Link to="/hooks" style={{
        padding: '15px 30px',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontSize: '18px',
        transition: 'background-color 0.3s'
      }}>
        开始探索 Hooks
      </Link>
      <Link to="/about" style={{
        padding: '15px 30px',
        backgroundColor: '#6c757d',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontSize: '18px',
        transition: 'background-color 0.3s'
      }}>
        关于项目
      </Link>
    </div>
  </div>
)

export default Home