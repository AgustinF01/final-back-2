import Category from '../models/Category.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({}, 'name slug'); // Solo devuelve name y slug
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
};