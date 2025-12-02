/*
 * @Author: phil
 * @Date: 2025-11-28 16:25:30
 */

import { useEffect, useState } from "react";
import { isNavigator, off, on } from "./misc/util";

export interface BatteryState {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

interface BatteryManager extends EventTarget, Readonly<BatteryState> {
  onchargingchange: () => void;
  onchargingtimechange: () => void;
  ondischargingtimechange: () => void;
  onlevelchange: () => void;
}

type UseBatteryState =
  | { isSupported: false }
  | { isSupported: true; fetched: false }
  | (BatteryState & { isSupported: true; fetched: true });

interface NavigatorWithPossibleBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

const nav: NavigatorWithPossibleBattery | undefined = isNavigator
  ? navigator
  : undefined;

const useBattery = (): UseBatteryState => {
  const [state, setState] = useState<UseBatteryState>({
    isSupported: true,
    fetched: false,
  });
  useEffect(() => {
    let isMounted = true;
    let battery: BatteryManager | null = null;

    const handleChange = () => {
      if (!battery || !isMounted) return;
      const newState: UseBatteryState = {
        isSupported: true,
        fetched: true,
        charging: battery.charging,
        chargingTime: battery?.chargingTime,
        dischargingTime: battery?.dischargingTime,
        level: battery?.level,
      };
      console.log("chargingTime", battery);

      setState(newState);
    };

    nav!.getBattery!().then((bat: BatteryManager) => {
      if (!isMounted) return;
      battery = bat;
      on(battery, "chargingchange", handleChange);
      on(battery, "chargingtimechange", handleChange);
      on(battery, "dischargingtimechange", handleChange);
      on(battery, "levelchange", handleChange);
      handleChange();
    });

    return () => {
      isMounted = false;
      if (!battery) return;
      off(battery, "chargingchange", handleChange);
      off(battery, "chargingtimechange", handleChange);
      off(battery, "dischargingtimechange", handleChange);
      off(battery, "levelchange", handleChange);
    };
  }, []);

  return state;
};

export default useBattery;
