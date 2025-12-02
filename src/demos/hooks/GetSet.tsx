import { useGetSet } from "@react/use";

const GetSet = () => {
  // 多个 useGetSet 示例
  const [getCounter, setCounter] = useGetSet(() => 0);
  const [getUser, setUser] = useGetSet(() => ({ name: "张三", age: 25 }));
  const [getList, setList] = useGetSet(() => ["React", "TypeScript"]);

  // 样式定义
  const containerStyle: React.CSSProperties = {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    margin: '10px 0',
    fontFamily: 'Arial, sans-serif',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const displayStyle: React.CSSProperties = {
    padding: '10px',
    backgroundColor: '#e9ecef',
    borderRadius: '4px',
    margin: '10px 0',
    fontFamily: 'monospace',
    fontSize: '14px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#0056b3';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#007bff';
  };

  // 计数器操作
  const incrementCounter = () => {
    const current = getCounter();
    setCounter(current + 1);
  };

  const decrementCounter = () => {
    const current = getCounter();
    setCounter(current - 1);
  };

  const resetCounter = () => {
    setCounter(0);
  };

  // 用户操作
  const updateUserName = () => {
    const names = ["张三", "李四", "王五", "赵六"];
    const current = getUser();
    const currentIndex = names.indexOf(current.name);
    const nextIndex = (currentIndex + 1) % names.length;
    setUser({ ...current, name: names[nextIndex] });
  };

  const incrementUserAge = () => {
    const current = getUser();
    setUser({ ...current, age: current.age + 1 });
  };

  // 列表操作
  const addTechnology = () => {
    const technologies = ["React", "TypeScript", "Vue", "Angular", "Node.js"];
    const current = getList();
    const available = technologies.filter(tech => !current.includes(tech));
    if (available.length > 0) {
      const randomTech = available[Math.floor(Math.random() * available.length)];
      setList([...current, randomTech]);
    }
  };

  const removeLastTechnology = () => {
    const current = getList();
    if (current.length > 0) {
      setList(current.slice(0, -1));
    }
  };

  const resetTechnologies = () => {
    setList(["React", "TypeScript"]);
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
        GetSet 状态管理示例
      </h3>

      {/* 计数器示例 */}
      <div style={sectionStyle}>
        <h4 style={{ color: '#495057', marginBottom: '10px' }}>🔢 计数器</h4>
        <div style={displayStyle}>
          当前值: {getCounter()}
        </div>
        <div>
          <button
            style={buttonStyle}
            onClick={incrementCounter}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            +1
          </button>
          <button
            style={buttonStyle}
            onClick={decrementCounter}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            -1
          </button>
          <button
            style={buttonStyle}
            onClick={resetCounter}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            重置
          </button>
        </div>
      </div>

      {/* 用户对象示例 */}
      <div style={sectionStyle}>
        <h4 style={{ color: '#495057', marginBottom: '10px' }}>👤 用户信息</h4>
        <div style={displayStyle}>
          {JSON.stringify(getUser(), null, 2)}
        </div>
        <div>
          <button
            style={buttonStyle}
            onClick={updateUserName}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            切换姓名
          </button>
          <button
            style={buttonStyle}
            onClick={incrementUserAge}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            年龄+1
          </button>
        </div>
      </div>

      {/* 数组示例 */}
      <div style={sectionStyle}>
        <h4 style={{ color: '#495057', marginBottom: '10px' }}>📋 技术栈列表</h4>
        <div style={displayStyle}>
          {JSON.stringify(getList(), null, 2)}
        </div>
        <div>
          <button
            style={buttonStyle}
            onClick={addTechnology}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            添加技术
          </button>
          <button
            style={buttonStyle}
            onClick={removeLastTechnology}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            移除最后项
          </button>
          <button
            style={buttonStyle}
            onClick={resetTechnologies}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            重置列表
          </button>
        </div>
      </div>

      {/* 性能说明 */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#e3f2fd',
        borderRadius: '4px',
        fontSize: '14px',
        color: '#1565c0'
      }}>
        <strong>💡 useGetSet 优势：</strong>
        <ul style={{ marginTop: '10px', marginBottom: 0 }}>
          <li>稳定的函数引用，避免不必要的重新渲染</li>
          <li>通过 get() 函数获取最新状态值</li>
          <li>通过 set() 函数更新状态并触发重新渲染</li>
          <li>适用于需要稳定引用的复杂状态管理</li>
        </ul>
      </div>
    </div>
  );
};

export { GetSet };
