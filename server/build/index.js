"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const sqlite_1 = require("sqlite");
const express_1 = __importDefault(require("express"));
const sqlite3_1 = require("sqlite3");
const createRoom_1 = require("./utils/PUT/createRoom");
const requestRoom_1 = require("./utils/GET/requestRoom");
const createUser_1 = require("./utils/PUT/createUser");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, sqlite_1.open)({
            filename: './database/planningPoker.db',
            driver: sqlite3_1.Database,
        });
        const app = (0, express_1.default)();
        const server = (0, node_http_1.createServer)(app);
        const io = new socket_io_1.Server(server, {
            cors: {
                origin: 'http://localhost:5173',
            },
        });
        io.listen(4000);
        app.get('/', (req, res) => {
            res.send('<h1>Hello world</h1>');
            console.log('i like trains');
        });
        io.on('connection', (socket) => {
            console.log('user connected');
            const data = {
                socket: socket,
                db: db,
                io: io,
            };
            //PUTS
            (0, createRoom_1.createRoomPUT)(data);
            (0, createUser_1.createUserPUT)(data);
            //GETS
            (0, requestRoom_1.requestRoomGET)(data);
        });
        server.listen(3000, () => {
            console.log('server running at http://localhost:3000');
        });
    });
}
main();
