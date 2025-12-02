/*
 * @Author: phil
 * @Date: 2025-11-28 18:18:25
 */
export const isNavigator = typeof navigator !== "undefined";

export const noop = () => {};

/**
 * 安全注册事件监听
 * @param obj 目标对象
 * @param args 事件名、回调、选项
 */

export function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T["addEventListener"]> | [string, Function | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement["addEventListener"]>)
    );
  }
}

/**
 * 安全移除事件监听
 * @param obj - 目标对象
 * @param args - 监听参数
 */
export function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T["removeEventListener"]>
    | [string, Function | null, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement["removeEventListener"]>)
    );
  }
}

export const isBrowser = typeof window !== "undefined";
