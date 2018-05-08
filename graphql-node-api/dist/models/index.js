"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
// Para ver os console.logs desse arquivo, rode o comando node dist\models\index.js
// ------------------------------------------
const basename = path.basename(module.filename);
// Retorna o caminho inteiro do arquivo atual
console.log('Filename: ', module.filename);
// Retorna o nome do arquivo atual
console.log('Basename: ', basename);
// ------------------------------------------
// Pegando o ambiente
const env = process.env.NODE_ENV || 'development';
// Encontrando o arquivo de configuração do Sequelize
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
console.log('Config env: ', config);
// ------------------------------------------
let db = null;
// Caso não exista uma conexão, criamos uma
if (!db) {
    db = {};
    const sequelize = new Sequelize(config.database, config.username, config.password, config);
    fs
        .readdirSync(__dirname)
        .filter((file) => {
        return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
    })
        .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model["name"]] = model;
    });
    // Percorremos as models da nossa db e verificamos se a Model tem o método associate
    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            // Caso tenha, passa os módulos que temos
            db[modelName].associate(db);
        }
    });
    // Serve para sincronizar o Sequelize com o MySQL
    db['sequelize'] = sequelize;
}
// ------------------------------------------
exports.default = db;
