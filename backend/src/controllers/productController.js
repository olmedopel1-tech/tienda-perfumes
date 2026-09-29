const Product = require('../models/productModel');

const getProducts = async (req, res) => {
    try {
        const { brand, gender, category, featured } = req.query;
        let filter = { active: true };

        if (brand) filter.brand = brand;
        if (gender) filter.gender = gender;
        if (category) filter.category = category;
        if (featured) filter.featured = featured === 'true';

        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los perfumes' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Perfume no encontrado' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el perfume' });
    }
};

const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el producto' });
    }
};

module.exports = { getProducts, getProductById, createProduct };
