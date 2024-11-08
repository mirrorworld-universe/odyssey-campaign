export interface ExtraBonus {
  walletId: string;
  icon: JSX.Element;
}

export interface TaskAvailability {
  devnet?: boolean;
  testnet?: boolean;
  testnetv1?: boolean;
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
  /** @deprecated Please use `networkId === NetworkId.FrontierV1` prop instead */
  available: TaskAvailability;
  visibleInNetworks: NetworkId[];
  startTime?: string;
  showPeriod?: boolean;
}

export interface TaskGroup {
  name: string;
  list: Task[];
}
