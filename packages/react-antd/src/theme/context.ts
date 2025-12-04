import React from "react";
import { Theme } from "@ant-design/cssinjs";
import defaultSeedToken from "./themes/seed";
import type { AliasToken } from "./interface/alias";
import type { SeedToken } from "./interface/seeds";
import type { MapToken } from "./interface/maps";

// export type ComponentsToken

export interface DesignTokenProviderProps {
  token: Partial<AliasToken>;
  theme?: Theme<SeedToken, MapToken>;
  override: { override: Partial<AliasToken> };
  hashed?: string | boolean;
}

const defaultConfig = {
  token: defaultSeedToken,
  hashed: true,
  override: { override: defaultSeedToken },
};

export const DesignTokenContext =
  React.createContext<DesignTokenProviderProps>(defaultConfig);
