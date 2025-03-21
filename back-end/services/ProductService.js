import { BaseRepository } from '../repositories/BaseRepository.js';
import { ProductRepository } from '../repositories/ProductRepository.js';
import Product from '../models/product.model.js';

export class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async getAllProducts() {
        return this.productRepository.getAll();
    }

    async getProductById(id) {
        return this.productRepository.getById(id);
    }

    async createProduct(productData) {
        if (productData.precio < 0) {
            throw new Error('El precio no puede ser negativo');
        }
        return this.productRepository.create(productData);
    }

    async updateProduct(id, productData) {
        return this.productRepository.update(id, productData);
    }

    async deleteProduct(id) {
        return this.productRepository.delete(id);
    }
}