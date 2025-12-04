import React from "react";

export interface CSPConfig {
  nonce?: string;
}

export const defaultPrefixCls = "ant";
export const defaultIconPrefixCls = "anticon";

interface ConfigConsumerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;

  iconPrefixCls: string;

  csp?: CSPConfig;
}

function defaultGetPrefixCls(suffixCls?: string, customizePrefixCls?: string) {
  if (customizePrefixCls) {
    return customizePrefixCls;
  }
  return suffixCls ? `${defaultPrefixCls}-${suffixCls}` : defaultPrefixCls;
}

export const configContext = React.createContext<ConfigConsumerProps>({
  getPrefixCls: defaultGetPrefixCls,
  iconPrefixCls: defaultIconPrefixCls,
});

export function useComponentConfig(propName: string) {
  console.log("propName", propName);

  const context = React.useContext(configContext);

  const { getPrefixCls, iconPrefixCls } = context;

  return {
    getPrefixCls,
    iconPrefixCls,
  };
}
