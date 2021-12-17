import { Request, Response } from "express";
import { UserService } from "../services/userService";

class UserController {

	async createUser(req: Request, res: Response){
		const { name, password, telephone, email, address } = req.body;
		const userService = new UserService();

		try {

			if(name === "" || password === "" || telephone === "" || email === "" || address === "")	{
				throw new Error("All information must be filled");
			}

			const response = await userService.createUSer({ name, password, telephone, email, address });

			return res.status(200).json({data: response});

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
}

export {UserController};
