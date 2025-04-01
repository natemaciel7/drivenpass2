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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.createCredential = createCredential;
exports.getCredentials = getCredentials;
exports.updateCredential = updateCredential;
exports.deleteCredential = deleteCredential;
const cryptr_1 = __importDefault(require("cryptr"));
const dotenv_1 = __importDefault(require("dotenv"));
const credentialRepository = __importStar(require("../repositories/credentialRepository"));
dotenv_1.default.config();
const cryptr = new cryptr_1.default(process.env.CRYPT_SECRET);
function createCredential(userId, title, url, username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const existing = yield credentialRepository.findByTitleAndUserId(title, userId);
        if (existing)
            throw { type: "conflict", message: "Título já existe" };
        const encryptedPassword = cryptr.encrypt(password);
        return credentialRepository.create({
            title,
            url,
            username,
            password: encryptedPassword,
            userId,
        });
    });
}
function getCredentials(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (id) {
            const credential = yield credentialRepository.findById(id);
            if (!credential || credential.userId !== userId)
                throw { type: "not_found", message: "Credencial não encontrada" };
            return Object.assign(Object.assign({}, credential), { password: cryptr.decrypt(credential.password) });
        }
        const credentials = yield credentialRepository.findAll(userId);
        return credentials.map((c) => (Object.assign(Object.assign({}, c), { password: cryptr.decrypt(c.password) })));
    });
}
function updateCredential(userId, id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield credentialRepository.findById(id);
        if (!credential || credential.userId !== userId)
            throw { type: "not_found", message: "Credencial não encontrada" };
        const encryptedPassword = cryptr.encrypt(data.password);
        yield credentialRepository.update(id, Object.assign(Object.assign({}, data), { password: encryptedPassword }));
    });
}
function deleteCredential(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield credentialRepository.findById(id);
        if (!credential || credential.userId !== userId)
            throw { type: "not_found", message: "Credencial não encontrada" };
        yield credentialRepository.remove(id);
    });
}
