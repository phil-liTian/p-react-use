/*
 * @Author: phil
 * @Date: 2025-12-01 15:00:37
 */
import { useRef, useMemo } from "react";
import type { Dispatch } from "react";
import { resolveHookState } from "./misc/hookState";
import type { IHookStateInitAction } from "./misc/hookState";
import useUpdate from "./useUpdate";

// 1. 稳定的引用：返回的数组（包含getter和setter函数）在组件的整个生命周期中保持相同的引用，不会因为父组件的重新渲染而创建新的函数实例。

// 2. 性能优化：避免了每次渲染都创建新的函数，减少不必要的子组件重新渲染。

// 3. 状态隔离：通过useRef保存状态，通过useUpdate强制重新渲染，实现了状态的稳定存储和UI更新。

// 4. 闭包特性：由于依赖数组为空，返回的函数形成了对state和update的闭包，始终访问的是同一个引用。

export default function useGetSet<S>(
  initialState: IHookStateInitAction<S>
): [() => S, set: Dispatch<IHookStateInitAction<S>>] {
  const state = useRef(resolveHookState(initialState));
  const update = useUpdate();
  return useMemo(
    () => [
      () => state.current as S,
      (newState: IHookStateInitAction<S>) => {
        state.current = resolveHookState(newState, state.current);
        update();
      },
    ],
    []
  );
}
