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
exports.create = create;
exports.findAll = findAll;
exports.findById = findById;
exports.findByTitleAndUserId = findByTitleAndUserId;
exports.update = update;
exports.remove = remove;
const database_1 = require("../config/database");
function create(credential) {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.credential.create({ data: credential });
    });
}
function findAll(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.credential.findMany({ where: { userId } });
    });
}
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.credential.findUnique({ where: { id } });
    });
}
function findByTitleAndUserId(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.credential.findFirst({ where: { title, userId } });
    });
}
function update(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.credential.update({ where: { id }, data });
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.credential.delete({ where: { id } });
    });
}
