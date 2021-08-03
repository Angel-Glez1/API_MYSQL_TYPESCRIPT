import { Sequelize } from 'sequelize';

const db = new Sequelize('ts_api_rest_node', 'root', '', {
	host : 'localhost',
	dialect : 'mysql',
});


export default db;
