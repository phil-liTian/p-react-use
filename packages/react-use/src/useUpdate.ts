/*
 * @Author: phil
 * @Date: 2025-12-01 14:37:36
 */
import { useReducer } from "react";

const updateReducer = (num: number): number => (num + 1) % 1_000_000;

/**
 * 强制组件重渲染的钩子
 * @returns 调用即触发更新的无参函数
 */

// 无参数调用：返回的函数不接受任何参数
// 轻量级：使用简单的数字状态，性能开销极小
// 可预测：每次调用都会触发一次更新

// 使用useReducer是为了创建一个轻量级、稳定、无副作用的强制更新机制，
// 它在语义上更符合"我不关心状态值，只想要触发更新"的需求，同时在性能和代码可维护性方面都优于其他方案。
export default function useUpdate(): () => void {
  const [, update] = useReducer(updateReducer, 0);

  return update;
}

// 1. 简洁性和性能优化

// // 使用useReducer - 简洁高效
// const [, update] = useReducer(num => (num + 1) % 1_000_000, 0);

// // 对比使用useState - 需要额外的状态管理
// const [, setTick] = useState(0);
// const update = useCallback(() => setTick(tick => tick + 1), []);
// 2. 避免闭包问题

// useReducer的dispatch函数在组件生命周期内是稳定的
// 不需要依赖数组，避免了useCallback的使用
// 不会因为闭包而捕获过期的状态值
// 3. 内存和性能考虑

// useReducer返回的dispatch函数引用永远不会改变
// 减少了子组件的不必要重渲染（如果作为props传递）
// 状态更新逻辑被封装在reducer中，更加纯粹
// 4. 代码语义清晰

// // 使用useReducer明确表示：我不关心状态值，只关心更新行为
// const [, update] = useReducer(updateReducer, 0);

// // 使用useState会让人误以为状态值很重要
// const [tick, setTick] = useState(0);
// 5. 其他替代方案的问题

// // ❌ 使用useState + 空对象 - 每次创建新对象，性能差
// const [, setObj] = useState({});
// const update = () => setObj({});

// // ❌ 使用useState + Math.random - 不够优雅
// const [, setVal] = useState(0);
// const update = () => setVal(Math.random());

// // ❌ 使用useState + 递增 - 需要useCallback避免重复创建
// const [, setCount] = useState(0);
// const update = useCallback(() => setCount(c => c + 1), []);
