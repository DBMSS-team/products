const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
	{
		name: { type: String, required: true },
		category_id: { type: String, required: true },
		price: { type: mongoose.Decimal128, required: true },
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model('Product', productSchema);

module.exports = { Product, productSchema };
