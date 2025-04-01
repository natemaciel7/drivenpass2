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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const credentialController = __importStar(require("../controllers/credentialController"));
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const validateTokenMiddleware_1 = require("../middlewares/validateTokenMiddleware");
const validateIdParamMiddleware_1 = require("../middlewares/validateIdParamMiddleware");
const createCredentialSchema_1 = require("../schemas/createCredentialSchema");
const router = (0, express_1.Router)();
router.post("/credentials", validateTokenMiddleware_1.validateToken, (0, validateSchemaMiddleware_1.validateSchema)(createCredentialSchema_1.createCredentialSchema), credentialController.create);
router.get("/credentials", validateTokenMiddleware_1.validateToken, credentialController.get);
router.get("/credentials/:id", validateTokenMiddleware_1.validateToken, validateIdParamMiddleware_1.validateIdParam, credentialController.get);
router.put("/credentials/:id", validateTokenMiddleware_1.validateToken, (0, validateSchemaMiddleware_1.validateSchema)(createCredentialSchema_1.createCredentialSchema), validateIdParamMiddleware_1.validateIdParam, credentialController.update);
router.delete("/credentials/:id", validateTokenMiddleware_1.validateToken, validateIdParamMiddleware_1.validateIdParam, credentialController.remove);
exports.default = router;
