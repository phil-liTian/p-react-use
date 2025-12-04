/*
 * @Author: phil
 * @Date: 2025-12-03 10:59:31
 */

import React from "react";
import { clsx } from "clsx";
import { isNonNullable } from "../_util/isNonNullable";
import { useComponentConfig } from "../config-provider/context";
import useStyle from "./style/index";

export interface BaseButtonProps {
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseButtonProps {}

const InternalCompoundedButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const { children } = props;

  const contentNode = isNonNullable(children) ? children : "";

  const { getPrefixCls } = useComponentConfig("button");

  const prefixCls = getPrefixCls("btn");

  const [hashId] = useStyle(prefixCls);

  const classes = clsx(prefixCls, hashId);

  let ButtonNode = (
    <button className={classes} ref={ref as React.Ref<HTMLButtonElement>}>
      {contentNode}
    </button>
  );

  return ButtonNode;
});

const Button = InternalCompoundedButton;

export default Button;
