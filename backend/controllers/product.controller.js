import { Product } from "../models/product.model.js";
import mongoose from "mongoose";

export const createProduct= async (req, res) => {
    const product = req.body;
    try {
        if(!product.name ||!product.price ||!product.image){
            return res.status(400).json({ error: "All fields are required." });
        }
        const newProduct = new Product(product);
        await newProduct.save();
        res.status(201).json({success: true,newProduct});
    } catch (error) {
        res.status(400).json({success: false, error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return res.status(404).json({ success: false, error: "Product not found." });
        }

        res.json({ success: true, message: "Product deleted successfully.", product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getProducts=async (req, res) => {
    try {
        const products = await Product.find();
        res.json({success: true,products});
    } catch (error) {
        res.status(500).json({  success: false,error: error.message });
    }
}


export const updateProduct=async (req, res) => {
    const {id}=req.params;
    const product = req.body;

    if(mongoose.Types.ObjectId.isValid(id) === false){
        return res.status(404).json({ success: false, error: "Invalid ID." });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if(!updatedProduct){
            return res.status(404).json({ success: false, error: "Product not found." });
        }
        res.json({ success: true, product: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
    }