/*
 * @Author: phil
 * @Date: 2025-12-03 21:13:09
 */
import { mergeToken } from "../../theme/internal";

export interface ButtonToken {}

export const prepareToken = (token) => {
  const buttonToken = mergeToken(token, {});

  return buttonToken;
};
