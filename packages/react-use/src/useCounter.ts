import { useMemo } from "react";
import type {
  IHookStateInitAction,
  IHookStateSetAction,
} from "./misc/hookState";
import { resolveHookState } from "./misc/hookState";
import useGetSet from "./useGetSet";

export interface CounterActions {
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  get: () => number;
  set: (value: IHookStateSetAction<number>) => void;
  reset: (value?: IHookStateSetAction<number>) => void;
}

/**
 * 带边界控制的计数器 Hook。
 * @param initialValue 初始值，默认 0
 * @param max 上限，null 表示无限制
 * @param min 下限，null 表示无限制
 * @returns [当前值, { get, set, inc, dec, reset }]
 */
export default function useCounter(
  initialValue: IHookStateInitAction<number> = 0,
  max: number | null = null,
  min: number | null = null
): [number, CounterActions] {
  let init = resolveHookState(initialValue);

  const [get, setInternal] = useGetSet(init);

  return [
    get(),
    useMemo(() => {
      const set = (newState: IHookStateSetAction<number>) => {
        const prevState = get();
        let rState = resolveHookState(newState, prevState);
        if (prevState !== rState) {
          if (typeof min === "number") {
            rState = Math.max(min, rState);
          }

          if (typeof max === "number") {
            rState = Math.min(max, rState);
          }
          prevState !== rState && setInternal(rState);
        }
      };

      return {
        get,
        set,
        inc(delta: number = 1) {
          const rDelta = resolveHookState(delta, get());

          set((num) => num + rDelta);
        },
        dec(delta = 1) {
          const rDelta = resolveHookState(delta, get());

          set((num) => num - rDelta);
        },
        reset(value = init) {
          const rValue = resolveHookState(value, get());

          init = rValue;
          set(rValue);
        },
      };
    }, [init, min, max]),
  ];
}
