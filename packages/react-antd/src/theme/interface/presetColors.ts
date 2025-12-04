/*
 * @Author: phil
 * @Date: 2025-12-03 19:45:58
 */
export const PresetColors = [
  "blue",
  "purple",
  "cyan",
  "green",
  "magenta",
  "pink",
  "red",
  "orange",
  "yellow",
  "volcano",
  "geekblue",
  "lime",
  "gold",
] as const;

export type PresetColorKey = (typeof PresetColors)[number];

export type PresetColorType = Record<PresetColorKey, string>;
