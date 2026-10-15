export type WillowType = 'English Willow' | 'Kashmir Willow' | 'Incredible Willow';

export type BatSize = '1' | '2' | '3' | '4' | '5' | '6' | 'Harrow' | 'Mens' | 'Compact';

export type BatRange =
  | 'INTENSE'
  | 'CONDOR'
  | 'SPLIIT'
  | 'XLITE'
  | 'BLAK'
  | 'BLU'
  | 'WILDFIRE'
  | 'ROAR'
  | 'CYNOS'
  | 'SUPERNATURAL'
  | 'THUMPA';

export type SortOption =
  | 'position'
  | 'name-asc'
  | 'price-high-low'
  | 'price-low-high';

export interface CricketBat {
  id: string;
  name: string;
  series: string;
  willowType: WillowType;
  range: BatRange;
  mrp: number;
  discountPercent: number;
  finalPrice: number;
  sizes: BatSize[];
  grainCount: string;
  edgeThickness: string;
  weightRange: string;
  sweetSpot: string;
  handleType: string;
  isNew?: boolean;
  hasCompare?: boolean;
  imageUrl?: string;
  stickerStyle: 'rs-purple' | 'rs-green' | 'rs-blue' | 'thumpa-rust' | 'supernatural-black' | 'supernatural-rust' | 'player-cyan' | 'blak-minimal' | 'wildfire-neon' | 'drake-blue' | 'lava-red';
  shortDesc: string;
}

export interface CartItem {
  bat: CricketBat;
  size: BatSize;
  quantity: number;
  withKnocking: boolean;
}

export interface FilterState {
  sizes: BatSize[];
  willowTypes: WillowType[];
  ranges: BatRange[];
  minPrice: number;
  maxPrice: number;
  sortBy: SortOption;
  searchQuery: string;
}
