import { Request, Response } from "express";
import { UserService } from "../services/userService";

class UserController {

	async createUser(req: Request, res: Response){
		let { name, password, telephone, email, address } = req.body;
		const userService = new UserService();

		name = name.trim();
		password = password.trim();
		telephone = telephone.trim();
		email= email.trim();
		address = address.trim();

		try {
			if(name === "" || password === "" || telephone === "" || email === "" || address === ""){
				throw new Error("All information must be filled");
			}

			const response = await userService.createUSer({ name, password, telephone, email, address });

			return res.status(201).json({data: response});

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}

	async updateUser(req: Request, res: Response){
		let { name, password, telephone, email, address, admin } = req.body;
		const id: string = req.params.id;
		const userService = new UserService();

		name = name.trim();
		password = password.trim();
		telephone = telephone.trim();
		email = email.trim();
		address = address.trim();

		try {

			if(admin !== "true" && admin !== "false" && admin !== true && admin !== false){
				admin = false;
			} else {
				admin = admin === "true" || admin === true ? true : false;
			}

			if(name === "" || password === "" || telephone === "" || email === "" || address === "" || id === ""){
				throw new Error("All information must be filled");
			}

			await userService.updateUser({name, email, address, password, telephone, admin}, id);

			return res.status(200).send();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}

	async deleteUser(req: Request, res: Response) {
		const id = req.params.id;
		const userService = new UserService();

		try {

			if(id === "" || id.length < 30) {
				throw new Error("Id is obrigatory for operation");
			}

			await userService.deleteUser(id);

			return res.status(200).send();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}

	async getUser(req: Request, res: Response) {
		let { name, password } = req.body;
		const userService = new UserService();

		name = name.trim();
		password = password.trim();

		try {
			if(name === "" || password === ""){
				throw new Error("Name and password is binding");
			}

			const token = await userService.login(name, password);

			return res.status(200).json({ token });

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return res.status(401).json({ message: error.message });
		}


	}
}

export {UserController};
