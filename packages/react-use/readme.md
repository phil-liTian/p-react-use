```md
1. useBattery
2. useUpdate
3. useGetSet
4. useCounter
5. useToggle
```

1. useEffect

```js
1. 基本语法
useEffect(effectFunction, dependencyArray?)
effectFunction: 副作用函数，可以返回清理函数
dependencyArray: 依赖数组，控制 effect 的执行时机


2. 使用场景和依赖配置
2.1 组件挂载时执行（componentDidMount）
useEffect(() => {
  // 只执行一次，组件挂载时
  console.log('组件挂载完成');
}, []); // 空依赖数组
2.2 组件更新时执行（componentDidUpdate）
useEffect(() => {
  // 每次组件重新渲染时都执行
  console.log('组件更新了');
}); // 无依赖数组
2.3 依赖变化时执行
useEffect(() => {
  // 依赖项变化时执行
  console.log('count 变化了:', count);
}, [count]); // 指定依赖
3. 清理函数（Cleanup）
useEffect 可以返回清理函数，用于清除副作用：

useEffect(() => {
  const timer = setInterval(() => {
    console.log('定时器运行中');
  }, 1000);

  // 清理函数
  return () => {
    clearInterval(timer);
    console.log('清理定时器');
  };
}, []);
```

2. useReducer
   是 useState 的替代方案，专为复杂状态逻辑设计 —— 当状态结构复杂（如嵌套对象 / 数组）、更新逻辑多（多条件 / 多操作），或状态更新依赖前一个状态时，useReducer 能将「状态更新逻辑」与「组件 UI 渲染」解耦，让代码更易维护、测试和扩展。

   将状态更新逻辑抽离为纯函数（reducer），通过 dispatch 触发「动作（action）」来更新状态，而非直接修改状态。

```js
import { useReducer } from 'react';

// 1. 定义 reducer 函数（纯函数：无副作用，相同输入必返回相同输出）
const reducer = (state, action) => {
  // state：当前状态
  // action：触发的动作（通常是 { type: '动作类型', payload: '附加数据' }）
  switch (action.type) {
    case '动作类型1':
      return 新状态; // 必须返回新状态（不可直接修改原state）
    case '动作类型2':
      return 新状态;
    default:
      throw new Error(`未知的 action type：${action.type}`);
  }
};

function MyComponent() {
  // 2. 调用 useReducer
  const [state, dispatch] = useReducer(
    reducer,        // 必选：reducer 函数
    initialState,   // 必选：初始状态（任意类型：数字/字符串/对象/数组）
    init?           // 可选：惰性初始化函数（用于复杂初始状态计算）
  );

  // 3. 触发状态更新：调用 dispatch，传入 action
  dispatch({ type: '动作类型1', payload: '可选数据' });

  return <div>{/* 渲染 state */}</div>;
}
```

useReducer 的核心优势是处理复杂状态（如嵌套对象、数组），此时需遵守「状态不可变」原则：绝不直接修改原 state，必须返回新对象 / 数组。

```js
import { useReducer } from "react";

// 1. 定义 reducer（处理复杂状态更新）
const todoReducer = (state, action) => {
  switch (action.type) {
    // 添加 todo（payload 是新todo文本）
    case "ADD_TODO":
      return [
        ...state, // 复制原有数组（不可变）
        { id: Date.now(), text: action.payload, completed: false },
      ];
    // 删除 todo（payload 是todo的id）
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    // 切换完成状态（payload 是todo的id）
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed } // 复制对象，修改属性
          : todo
      );
    default:
      throw new Error(`未知 action：${action.type}`);
  }
};

function TodoList() {
  // 初始状态：空数组
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [inputText, setInputText] = useState("");

  // 添加todo的处理函数
  const handleAdd = () => {
    if (!inputText.trim()) return;
    dispatch({ type: "ADD_TODO", payload: inputText });
    setInputText("");
  };

  return (
    <div>
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="输入待办事项"
      />
      <button onClick={handleAdd}>添加</button>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
            <button
              onClick={() =>
                dispatch({ type: "TOGGLE_TODO", payload: todo.id })
              }
            >
              {todo.completed ? "取消" : "完成"}
            </button>
            <button
              onClick={() =>
                dispatch({ type: "DELETE_TODO", payload: todo.id })
              }
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

如果初始状态需要复杂计算（如从 localStorage 读取、循环生成、接口模拟），可通过 init 函数实现「惰性初始化」—— 该函数仅在组件首次渲染时执行一次，避免每次渲染重复计算。

什么时候用 useReducer？
状态是对象 / 数组（如 todoList、用户信息、表单数据）；
状态更新有多个逻辑分支（如添加 / 删除 / 修改 / 重置）；
状态更新依赖前一个状态（且逻辑复杂）；
希望状态逻辑可复用 / 可测试（reducer 是纯函数，可单独测试）；
团队协作时，希望状态更新逻辑集中管理（避免散落在组件各处）。

useReducer 的核心是「将状态更新逻辑抽离为纯函数」，让组件聚焦 UI 渲染，状态逻辑集中管理。核心用法：
定义 reducer 函数（处理所有状态更新逻辑）；
调用 useReducer 获取 state 和 dispatch；
通过 dispatch(action) 触发状态更新；
复杂初始状态用「惰性初始化」；
动态逻辑用 action.payload 传递参数。

3. useRef
   核心 Hook，核心作用是创建一个可跨组件渲染周期保存可变值的引用对象，且修改该对象的 current 属性不会触发组件重渲染。它主要解决两类问题：访问 DOM 元素 / 组件实例、保存跨渲染的可变值（非状态值），是 React 中处理「非渲染相关可变数据」的核心方案。

   useRef 的核心价值是「跨渲染周期保存可变值，且修改不触发重渲染」，核心用法：
   访问 DOM 元素 / 类组件实例（最常用）；
   保存非渲染相关的可变数据（计时器 ID、上一次状态、临时值）；
   解决闭包陷阱，获取最新的状态 / 属性。

```js
import { useRef, useEffect } from "react";

function InputFocus() {
  // 创建 ref，初始值为 null
  const inputRef = useRef(null);

  // 组件挂载后，聚焦输入框
  useEffect(() => {
    // current 指向 input 元素
    inputRef.current.focus();
  }, []);

  return (
    // 将 ref 绑定到 input 元素
    <input ref={inputRef} type="text" placeholder="自动聚焦" />
  );
}

// 反例：函数组件中用 createRef，每次渲染创建新对象
function BadRef() {
  const ref = React.createRef(); // 每次渲染都是新对象
  return <div ref={ref} />;
}

// 正例：函数组件中用 useRef，引用不变
function GoodRef() {
  const ref = useRef(); // 所有渲染返回同一个对象
  return <div ref={ref} />;
}

// 配合 forwardRef，可自定义子组件暴露给父组件的 ref 方法，避免父组件直接操作子组件 DOM，提升封装性。
import { useRef, forwardRef, useImperativeHandle } from "react";

const Child = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  // 自定义暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    // 仅暴露 focus 方法，不暴露整个 input 元素
    focusInput: () => {
      inputRef.current.focus();
    },
    clearInput: () => {
      inputRef.current.value = "";
    },
  }));

  return <input ref={inputRef} type="text" />;
});

function Parent() {
  const childRef = useRef(null);

  return (
    <div>
      <button onClick={() => childRef.current.focusInput()}>
        聚焦子组件输入框
      </button>
      <button onClick={() => childRef.current.clearInput()}>
        清空子组件输入框
      </button>
      <Child ref={childRef} />
    </div>
  );
}
```

4. useMemo
   提供的性能优化 Hook，核心作用是缓存昂贵计算的结果：仅当依赖数组中的值发生变化时，才重新执行计算函数；否则直接返回缓存的结果，避免组件每次重渲染时重复执行耗时操作，提升应用性能。

   useMemo 本身有缓存开销，仅用于昂贵计算（如大数组处理、循环次数超 10 万次）或避免子组件重渲染；简单计算（如 num + 1）用 useMemo 反而会增加性能损耗。

   副作用（如调用 API、修改 DOM、setState）必须放在 useEffect 中，useMemo 仅用于纯计算。

   useMemo 的核心是「缓存计算结果」，核心使用场景：
   优化昂贵计算，避免重复执行；
   缓存对象 / 数组，避免子组件不必要的重渲染；
   依赖数组必须完整，且不要滥用（仅用于性能瓶颈场景）。

```js
// ✅ 正确：依赖数组包含 count
const total = useMemo(() => {
  let sum = 0;
  for (let i = 0; i < 100000000; i++) sum += i;
  return sum + count;
}, [count]);
```

5. 其他

```js
1. 数字分割符 1_000_000
2. function 的 length 属性： 用于返回函数形参的数量
```
