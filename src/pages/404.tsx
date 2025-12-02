/*
 * @Author: phil
 * @Date: 2025-12-02 16:00:00
 */
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 3秒后自动重定向到首页
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "120px",
            color: "#dc3545",
            margin: "0",
            fontWeight: "bold",
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: "32px",
            color: "#495057",
            margin: "20px 0 10px 0",
          }}
        >
          页面未找到
        </h2>

        <p
          style={{
            fontSize: "18px",
            color: "#6c757d",
            marginBottom: "30px",
            lineHeight: "1.6",
          }}
        >
          抱歉，您访问的页面不存在或已被移动。
          <br />
          将在 3 秒后自动返回首页...
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/"
            style={{
              padding: "12px 24px",
              backgroundColor: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "16px",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#0056b3";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#007bff";
            }}
          >
            返回首页
          </Link>

          <Link
            to="/hooks"
            style={{
              padding: "12px 24px",
              backgroundColor: "#28a745",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "16px",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#1e7e34";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#28a745";
            }}
          >
            查看 Hooks
          </Link>
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          fontSize: "14px",
          color: "#6c757d",
        }}
      >
        <p>如果您认为这是一个错误，请联系技术支持</p>
      </div>
    </div>
  );
};

export default NotFound;
