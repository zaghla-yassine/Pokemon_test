interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface Type {
  type: {
    name: string;
  };
}

export interface Pokemon {
  image: string;
  name: string;
  url: string;
  stats: Stat[];
  types: Type[];
}
