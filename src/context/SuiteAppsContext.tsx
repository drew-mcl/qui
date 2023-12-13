// In your SuiteAppsContext.tsx or .tsx
import React, { createContext, Dispatch, SetStateAction } from 'react';

type SidecarType = {
  name: string;
  group: string;
  version: string;
};

type AppType = {
  id: string;
  name: string;
  version: string;
  group: string;
  phase: number;
  sidecars?: SidecarType[]; // Include sidecars in AppType
};

type SuiteAppsContextType = {
  apps: AppType[];
  setApps: Dispatch<SetStateAction<AppType[]>>;
};

const SuiteAppsContext = createContext<SuiteAppsContextType>({
  apps: [],
  setApps: () => {},
});

export default SuiteAppsContext;
