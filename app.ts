import dotenv from 'dotenv';
import Server from './models/server';

// Config dotenv
dotenv.config();


// Lenvantar server
const server = new Server();
server.listen();

