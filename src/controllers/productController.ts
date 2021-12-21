import { Request, Response } from "express";
import { ProductService } from "../services/productService";


export class ProductController {


	async createProduct(req: Request, res: Response) {
		// eslint-disable-next-line prefer-const
		let { name, category, price, description, image } = req.body;

		name = name.trim();
		category = category.trim();
		description = description.trim();
		image = image.trim();

		const product = new ProductService();

		try {

			if(name === "" || category === "" || description === "" || image === "" || price === "") {
				throw new Error("All information must be filled");
			}

			if(category !== "armario" && category !== "quarto") {
				throw new Error("Invalid product category");
			}

			const productCreated = await product.createProduct({ name, price, category, description, image });

			return res.status(201).json({ data: productCreated });

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}

	async updateProduct(req: Request, res: Response) {
		// eslint-disable-next-line prefer-const
		let { name, category, price, description, image } = req.body;
		const id: string = req.params.id;

		name = name.trim();
		category = category.trim();
		description = description.trim();
		image = image.trim();

		const product = new ProductService();

		try {
			if(name === "" || category === "" || description === "" || image === "" || price === "") {
				throw new Error("All information must be filled");
			}

			if(id === "" || id.length !== 36) {
				throw new Error("Id is obrigatory for operation");
			}

			if(category !== "armario" && category !== "quarto") {
				throw new Error("Invalid product category");
			}

			await product.updateProduct({name, image, description, price, category}, id);

			return res.status(200).send();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}

	async deleteProduct(req: Request, res: Response) {
		const id: string = req.params.id;
		const productService = new ProductService();

		try {

			if(id === "" || id.length !== 36) {
				throw new Error("Id is obrigatory for operation");
			}

			await productService.deleteProduct(id);

			return res.status(200).send();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}

	async getAllProducts(req: Request, res: Response) {
		const productService = new ProductService();
		const search = req.query.search ? String(req.query.search) : "";

		try {
			if(search !== ""){
				const searchContent = await productService.getAllProductsByLike(search.trim().toLowerCase());

				return res.status(200).json({ data: searchContent });
			}

			const products = await productService.getAllProducts();

			return res.status(200).json({ data: products });

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}

	async getProductByCategory(req: Request, res: Response) {
		const productService = new ProductService();
		const category = String(req.query.category);
		const search = req.query.search ? String(req.query.search) : "";

		try {
			if(search !== "") {
				const searchProduct = await productService.getProductsByLikeCategory(search, category);

				return res.status(200).json({ data: searchProduct });
			}

			const productsByCategory = await productService.getProductByCategory(category);

			return res.status(200).json({ data: productsByCategory });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
}
