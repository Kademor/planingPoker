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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = void 0;
const randomString_1 = require("./randomString");
const queries_1 = require("../const/queries");
const createRoom = (data, userId, db, io) => __awaiter(void 0, void 0, void 0, function* () {
    let createdRoomId;
    let roomData;
    try {
        const resultId = yield db.run('INSERT INTO rooms (name, owner_user_id, description,site_string_id) VALUES (?,?,?,?)', [data.name, userId, data.description, (0, randomString_1.generateRandomString)(5)]);
        createdRoomId = resultId.lastID;
        yield db.run('INSERT INTO rooms_users (room_id, room_id) VALUES (?,?)', [createdRoomId, userId]);
    }
    catch (e) {
        console.error('Error while trying to create room : ', e);
        return undefined;
    }
    yield db.all(queries_1.REQUEST_ROOM_FROM_ID, createdRoomId).then((rows) => {
        roomData = rows[0];
    });
    console.log('created room : ', roomData);
    io.emit('createdRoom', roomData);
});
exports.createRoom = createRoom;
