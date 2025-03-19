import  Product  from '../models/product.model.js';
import mongoose from 'mongoose';
import { BaseRepository } from './BaseRepository.js';
import { ProductService } from '../services/ProductService.js';


export class ProductRepository extends BaseRepository {
    constructor() {
        super(Product);
    }

    async getAll() {
        return super.getAll().populate('categoria', 'name');
    }

    async getById(id) {
        return super.getById(id).populate('categoria', 'name');
    }

    // Métodos específicos de productos pueden ir aquí
    async getByCategory(categoryId) {
        return this.model.find({ categoria: categoryId }).populate('categoria', 'name');
    }
}