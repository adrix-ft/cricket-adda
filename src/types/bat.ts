export type BatCategory =
  | 'All'
  | '7T7T Gold Edition'
  | 'Black Monster'
  | 'Grey Edition'
  | 'One Side Hero'
  | 'Accessories';

export type BatWeightClass =
  | 'All'
  | 'Under 980g'
  | '1000g - 1035g'
  | '1040g+';

export type SortOption =
  | 'position'
  | 'price-low-high'
  | 'price-high-low'
  | 'weight-low-high';

export interface RealBatImage {
  url: string;
  caption: string;
  badge?: string;
}

export interface CricketBat {
  id: string;
  name: string;
  model: BatCategory;
  mrp: number;
  discountPercent: number;
  finalPrice: number;
  weightRange: string;
  verifiedWeight?: string;
  availableWeights: string[];
  scoopType: string;
  woodType: string;
  bladeLength: string;
  edgeThickness: string;
  handleType: string;
  sweetSpot: string;
  ballSuitability: string[];
  imageUrl: string; // Generated Studio photo
  realImages: RealBatImage[]; // Real client workshop & scale photos
  stickerStyle: 'gold' | 'black-monster' | 'grey-edition' | 'oneside-hero' | 'cover';
  shortDesc: string;
  highlights: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  inStock?: boolean;
  freeCover?: boolean;
}

export interface CartItem {
  bat: CricketBat;
  selectedWeight: string;
  quantity: number;
  withKnocking?: boolean;
}

export interface FilterState {
  category: BatCategory;
  weightClass: BatWeightClass;
  ballType: string;
  minPrice: number;
  maxPrice: number;
  sortBy: SortOption;
  searchQuery: string;
}
