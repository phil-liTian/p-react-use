/*
 * @Author: phil
 * @Date: 2025-11-28 16:27:17
 */
import type { FC } from "react";
import { useBattery } from "@react/use";

export const Battery: FC = () => {
  const battery = useBattery();

  // Inline styles for battery component
  const batteryContainerStyle: React.CSSProperties = {
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
    margin: "10px 0",
  };

  const batteryTitleStyle: React.CSSProperties = {
    color: "#333",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
  };

  const batteryStatusStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "6px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  if (!battery.isSupported) {
    return (
      <div className="battery-demo">
        <h3>电池状态监控</h3>
        <p>您的浏览器不支持电池状态 API</p>
        <div className="battery-not-supported">
          🔋 电池监控功能需要支持 Battery API 的现代浏览器
        </div>
      </div>
    );
  }

  if (!battery.fetched) {
    return (
      <div className="battery-demo">
        <h3>电池状态监控</h3>
        <p>正在获取电池信息...</p>
        <div className="battery-loading">
          <span className="loading-spinner">⚡</span>
          <span>加载电池数据中...</span>
        </div>
      </div>
    );
  }

  const { charging, level, chargingTime, dischargingTime } = battery;
  const batteryPercentage = Math.round(level * 100);
  const batteryColor =
    batteryPercentage > 50
      ? "green"
      : batteryPercentage > 20
      ? "orange"
      : "red";

  return (
    <div style={batteryContainerStyle}>
      <h3 style={batteryTitleStyle}>电池状态监控</h3>
      <div style={batteryStatusStyle}>
        <div className="battery-icon">{charging ? "🔌" : "🔋"}</div>
        <div className="battery-info">
          <div className="battery-level">
            <span className="battery-percentage">{batteryPercentage}%</span>
            <span className="battery-status-text">
              {charging ? "充电中" : "使用电池"}
            </span>
          </div>
          <div className="battery-bar">
            <div
              className={`battery-fill battery-fill-${batteryColor}`}
              style={{ width: `${batteryPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="battery-details">
        <div className="detail-item">
          <span className="detail-label">充电状态:</span>
          <span className="detail-value">{charging ? "是" : "否"}</span>
        </div>
        {chargingTime > 0 && (
          <div className="detail-item">
            <span className="detail-label">充满时间:</span>
            <span className="detail-value">
              {Math.round(chargingTime / 60)}分钟
            </span>
          </div>
        )}
        {!charging && dischargingTime > 0 && (
          <div className="detail-item">
            <span className="detail-label">剩余时间:</span>
            <span className="detail-value">
              {Math.round(dischargingTime / 60)} 分钟
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
