import {Router } from "express";
import { ProductController } from "./controllers/productController";
import { UserController } from "./controllers/userController";

const routes = Router();
const userController = new UserController();
const productController = new ProductController();

routes.get("/home", (req, res) => res.status(200).send("ok"));
//user routes
routes.post("/user", userController.getUser);
routes.post("/create/user", userController.createUser);
routes.put("/update/user/:id", userController.updateUser);
routes.delete("/delete/user/:id", userController.deleteUser);


//products routes
routes.post("/create/product", productController.createProduct);
routes.put("/update/product/:id", productController.updateProduct);
routes.delete("/delete/product/:id", productController.deleteProduct);
routes.get("/products/", productController.getAllProducts);
routes.get("/products/category/", productController.getProductByCategory);

export { routes };
