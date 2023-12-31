export type TWCredentials = {
  mainUrl: string;
  username: string;
  password: string;
};

export type World = {
  name: string;
  url: string;
};

export type Village = {
  id: number;
  name: string;
  wood: number;
  clay: number;
  iron: number;
  warehouse: number;
  population: number;
};

export type WorldInfo = {
  name: string,
  code: string,
}

export type VillageInfo = {
  name: string,
  code: string,
}

export type VillageProductionInfo = {
  wood: number,
  clay: number
  iron: number
}


