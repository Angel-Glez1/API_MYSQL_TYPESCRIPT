import { Request, Response } from 'express';
import Usuario from '../models/usuario';


export const getUsuarios = async (req: Request, res: Response) => {

	const usuarios = await Usuario.findAll({ where: { estado: 1 } });
	return res.status(200).json({ ok: true, usuarios });

}

export const getUsuario = async (req: Request, res: Response) => {

	const { id } = req.params;

	try {

		const usuario = await Usuario.findOne({
			where: {
				id,
				estado: 1
			}
		});
		const result = (usuario)
			? { ok: true, usuario }
			: { ok: false, msg: `No exite usuario con el id ${id}` }

		return res.json(result);


	} catch (error) {
		console.log(error);
		return res.status(500).json({ ok: false, msg: 'No se puedo realizar la peticon, Hable con su administrador' });
	}


}

export const postUsuario = async (req: Request, res: Response) => {

	const { id, estado, ...data } = req.body;

	try {

		const issetEmail = await Usuario.findOne({ where: { email: data.email } });
		if (issetEmail) {
			return res.status(400).json({
				ok: false,
				msg: 'Las credenciales ya existen, intente con otras'
			});
		}


		//TODO Crear una nueva instancio con los campos de mi modelo Usuario.
		const usuario = Usuario.build(data);
		await usuario.save();
		res.json(usuario);

	} catch (error) {
		console.log(error);
		return res.status(500).json({ ok: false, msg: 'No se puedo realizar la peticon, Hable con su administrador' });
	}



}

export const putUsuario = async (req: Request, res: Response) => {

	const { id } = req.params;
	const { body } = req;

	try {

		const usuario = await Usuario.findByPk(id);
		if (!usuario) {
			return res.json({ msg: 'No exite un usuario con es id' })
		}

		const issetEmail = await Usuario.findOne({ where: { email: body.email } });
		if (issetEmail) {
			return res.status(400).json({
				ok: false,
				msg: 'Las credenciales ya existen, intente con otras'
			});
		}


		await usuario.update(body);
		res.json(usuario)


	} catch (error) {
		console.log(error);
		return res.status(500).json({ ok: false, msg: 'No se puedo realizar la peticon, Hable con su administrador' });
	}

}


export const deleteUsuario = async (req: Request, res: Response) => {


	const { id } = req.params;
	const usuario = await Usuario.findByPk(id);

	if (!usuario) {
		return res.json({ msg: 'No exite un usuario con es id' })
	}

	// Borrado logico
	await  usuario.update({ estado: false });
}

