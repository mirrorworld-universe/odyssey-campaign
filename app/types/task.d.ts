export interface ExtraBonus {
  id: string;
  icon: JSX.Element;
}

export interface TaskAvailability {
  devnet: boolean;
  testnet: boolean;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  period: string;
  reward: string;
  /** @deprecated Please use `icon` prop instead */
  iconName: string;
  icon: JSX.Element;
  bonus?: boolean;
  extraBonus?: ExtraBonus[];
  available: TaskAvailability;
  startTime?: string;
  showPeriod?: boolean;
}

export interface TaskGroup {
  name: string;
  list: Task[];
}
