import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'El precio no puede ser negativo']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    sizes: [{
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL']
    }],
    images: [{
        type: String,
        required: true
    }],
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'products' });

export default mongoose.model('Product', productSchema);