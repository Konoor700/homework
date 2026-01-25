export interface Hero {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiResponse {
  info: ApiInfo;
  results: Hero[];
}