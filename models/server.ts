import express, { Application } from 'express';
import cors from 'cors';
import userRouter from '../routers/usuarios';
import db from '../db/connection';

class Server {

	private app: Application;
	private port: string;
	private apiPaths = {
		usuarios: '/api/usuarios'
	}

	constructor() {
		this.app = express();
		this.port = process.env.PORT || '9000';


		// Metodos iniciales.
		this.dbConnection();
		this.midleware();
		this.routes();

	}


	// TODO:: Connect MYSQL.
	async dbConnection(){

		try{
			await db.authenticate();
			console.log('Connection has been established successfully.');
		}catch(e){
			throw new Error(e)
		}
	}


	midleware(){
		// CORS
		this.app.use( cors() );

		// Parseo Body
		this.app.use( express.json() );

		// Public Folder
		this.app.use( express.static('public') );
	}


	routes() {
		this.app.use(this.apiPaths.usuarios, userRouter);
	}


	listen(){
		this.app.listen(this.port, () => console.log(`Servidor corriendo en ${this.port}`));
	}

}

export default Server;