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

			const updatedUSer = await userService.updateUser({name, email, address, password, telephone, admin}, id);

			return res.status(200).json({ status: updatedUSer });

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}

}

export {UserController};
