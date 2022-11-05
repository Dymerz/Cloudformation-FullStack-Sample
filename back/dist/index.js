"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const pg_1 = require("pg");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const client = new pg_1.Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT)
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/fruits', (req, response) => {
    client
        .query('SELECT * FROM fruits')
        .then(result => {
        console.log(result.rows);
        response.status(200).json(result.rows);
    })
        .catch(response.status(500).json);
});
app.get('/fruits/:id', (req, response) => {
    client
        .query('SELECT * FROM fruits WHERE id = $1', [req.params.id])
        .then(result => {
        if (result.rowCount == 0 || result.rows.length != 1) {
            response.status(404).json({ code: 404 });
            return;
        }
        console.log(result.rows);
        response.status(200).json(result.rows[0]);
    })
        .catch(response.status(500).json);
});
app.delete('/fruits/:id', (req, response) => {
    const fruit = {
        id: req.params.id,
    };
    client
        .query('DELETE FROM fruits WHERE id = $1', [fruit.id])
        .then(result => {
        if (result.rowCount == 0) {
            response.status(404).json({ code: 404 });
            return;
        }
        console.log(fruit);
        response.status(200).json(fruit);
    })
        .catch(response.status(500).json);
});
app.post('/fruits', (req, response) => {
    const fruit = {
        id: (0, uuid_1.v4)(),
        name: req.body.name
    };
    client
        .query('INSERT INTO fruits (id, name) VALUES ($1, $2)', [fruit.id, fruit.name])
        .then(result => {
        console.log(fruit);
        response.status(200).json(fruit);
    })
        .catch(response.status(500).json);
});
app.listen(process.env.PORT, () => {
    console.log(`Service is running on port ${process.env.PORT}`);
});
