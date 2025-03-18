import { ProductRepository } from '../repositories/ProductRepository.js';
import { ProductService } from '../services/ProductService.js';

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

export const container = {
    productService,
    productRepository
};