import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: [true, "El nombre es obligatorio"] },
    descripcion: { type: String, required: [true, "La descripción es obligatoria"] },
    precio: { type: Number, required: [true, "El precio es obligatorio"], min: [0, "El precio no puede ser negativo"] },
    categoria: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true
    }, imagen: {
        type: String,
        required: [true, "La imagen es obligatoria"],
        match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, "La imagen debe ser una URL válida"],
        trim: true
    },
    tipo: {
        type: String,
        enum: ['ropa', 'accesorio'],
        required: [true, 'El tipo de producto es obligatorio']
    },
    talles: [{
        type: String,
        required: function () { return this.tipo === 'ropa'; }
    }],
    cantidades: [{
        type: Number,
        required: function () { return this.tipo === 'ropa'; },
        min: [0, "La cantidad no puede ser negativa"]
    }]
}, {
    collection: 'products' 
});

export default mongoose.model('Product', productSchema);