/*
 * @Author: phil
 * @Date: 2025-12-03 19:43:31
 */

import { useContext } from "react";
import { useCacheToken } from "@ant-design/cssinjs";
import { DesignTokenContext } from "./context";
import defaultSeedToken from "./themes/seed";
import defaultTheme from "./themes/default/theme";

export default function useToken() {
  const {
    token: rootDesignToken,
    theme,
    hashed,
    override,
  } = useContext(DesignTokenContext);

  const mergedTheme = theme || defaultTheme;

  const cssVar = {
    key: "css-var-root",
    prefix: "ant",
  };
  console.log("defaultSeedToken", defaultSeedToken, rootDesignToken);

  const [token, hashId, realToken] = useCacheToken(
    mergedTheme,
    [defaultSeedToken, rootDesignToken],
    { override, cssVar: { ...cssVar } }
  );

  return [mergedTheme, realToken, hashed ? hashId : "", token, cssVar];
}
