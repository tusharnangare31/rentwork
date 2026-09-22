import type { Product, ProductImage, Category, Company } from './database.ts';

export interface ProductWithDetails extends Product {
  category?: Category;
  company?: Company;
  images?: ProductImage[];
  calculated_available_quantity?: number;
}

export interface ProductFilterParams {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  searchQuery?: string;
  startDate?: string;
  endDate?: string;
}
