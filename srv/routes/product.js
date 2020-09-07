const router = require("express").Router();
let Product = require("../../db/models/product.model").Product;

// Get all products
router.route("/").get((req, res) => {
	Product.find()
		.then((product) => res.json(product))
		.catch((err) => res.status(400).json("Error: " + err));
});

// Get specific product
router.route("/:id").get((req, res) => {
	const id = req.params.id;
	Product.findById(id, (err, product) => {
		if (err) res.status(400).json("Error: " + err);
		res.json(product);
	});
});

// Create new product
router.route("/").post((req, res) => {
	const newProduct = new Product(req.body);
	newProduct
		.save()
		.then(() => res.json("Product added."))
		.catch((err) => res.status(400).json("Error: " + err));
});

// Update a specific product
router.route("/:id").put(async (req, res) => {
	const id = req.params.id;
	try {
		let udpatedProduct = await Product.findByIdAndUpdate(id, req.body, {
			"new": true,
			useFindAndModify: false,
		});
		res.json(udpatedProduct);
	} catch (err) {
		res.status(400).json("Error: " + err);
	}
});

// Delete a product
router.route("/:id").delete(async (req, res) => {
	const id = req.params.id;
	try {
		const deletedProduct = await Product.findByIdAndDelete(id);
		res.json(deletedProduct);
	} catch (err) {
		res.status(400).json("Error: " + err);
	}
});

module.exports = router;
