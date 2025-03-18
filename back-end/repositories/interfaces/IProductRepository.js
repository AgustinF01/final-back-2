import { Product } from '../../models/product.model';

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
        // Aquí iría lógica adicional de validación
        return this.productRepository.create(productData);
    }

    async updateProduct(id, productData) {
        return this.productRepository.update(id, productData);
    }

    async deleteProduct(id) {
        return this.productRepository.delete(id);
    }
}