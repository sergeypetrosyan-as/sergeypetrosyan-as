export interface Category { id: string; name: string; suit: string; blurb: string }
export interface Concept {
  id: string;
  title: string;
  category: string;
  line: string;
  does: string;
  decides: string;
  retry: string;
  batch: number;
  card: number;
  route: string;
}
export declare const CATEGORIES: Category[];
export declare const CONCEPTS: Concept[];
