import { genStyleHooks, mergeToken } from "../../theme/internal";
import { prepareToken } from "./token";

const genSharedButtonStyle = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      outline: "none",
      display: "inline-flex",
      cursor: "pointer",
    },
  };
};

const genButtonStyle = (token, prefixCls = "") => {
  console.log("token", token);

  return {
    [prefixCls]: {
      color: "red",
    },
  };
};

const genBaseButtonStyle = (token) => {
  const baseToken = mergeToken(token, {
    fontSize: token.contentFontSize,
  });
  return genButtonStyle(baseToken, token.componentCls);
};

export default genStyleHooks(
  "Button",
  (token) => {
    const buttonToken = prepareToken(token);

    return [
      genSharedButtonStyle(buttonToken),
      // size
      genBaseButtonStyle(buttonToken),
    ];
  },
  () => {
    return {};
  },
  {}
);
