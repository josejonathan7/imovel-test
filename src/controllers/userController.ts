import { Request, Response } from "express";


export class UserController {


	static async createUser(req: Request, res: Response){
		const { name, password, telephone, email, adress } = req.body;

		try {
			if(name === "" || password === "" || telephone === "" || email === "" || adress === "")	{
				throw new Error("All information must be filled.");
			}



			return res.status(200).json({ data: [{
				name: "faker.name.findName()",
				password: "123456",
				telephone: "faker.phone.phoneNumber()",
				email: "faker.internet.email()",
				adress: "faker.address.streetAddress()"
			}] });

		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
}
