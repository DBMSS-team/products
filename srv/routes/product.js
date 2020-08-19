const router = require('express').Router();
let Product = require('../../db/models/product.model').Product;

router.route('/').get((req, res) => {
	Product.find()
		.then((product) => res.json(product))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const name = req.body.name;
	const categoryId = req.body.categoryId;
	const newProduct = new Product({ name, category_id: categoryId });
	newProduct
		.save()
		.then(() => res.json('Product added.'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
