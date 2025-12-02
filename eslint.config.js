import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          trailingComma: "es5",
          tabWidth: 2,
          printWidth: 100,
          semicolons: true,
          quoteProps: "as-needed",
          jsxSingleQuote: false,
          bracketSpacing: true,
          jsxBracketSameLine: true,
          arrowParens: "always",
          endOfLine: "lf",
        },
      ],
    },
  },
]);
