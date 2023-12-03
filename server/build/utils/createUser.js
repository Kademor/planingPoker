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
exports.createUser = void 0;
const randomString_1 = require("./randomString");
const queries_1 = require("../const/queries");
const createUser = (userName, db, io) => __awaiter(void 0, void 0, void 0, function* () {
    let resultId;
    try {
        let result = yield db.run('INSERT INTO users (name, cookie) VALUES (?,?)', [userName, (0, randomString_1.generateRandomString)(40)]);
        resultId = result.lastID;
    }
    catch (e) {
        console.error('Error while trying to create user : ', e);
        return undefined;
    }
    let userData;
    yield db.all(queries_1.REQUEST_LATEST_USER_CREATED, resultId).then((rows) => {
        userData = rows[0];
    });
    console.log('created user : ', userName);
    io.emit('createdUser', userData);
    return resultId;
});
exports.createUser = createUser;
