"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const signUpSchema_1 = require("../schemas/signUpSchema");
const signInSchema_1 = require("../schemas/signInSchema");
const authRouter = (0, express_1.Router)();
authRouter.post("/sign-up", (0, validateSchemaMiddleware_1.validateSchema)(signUpSchema_1.signUpSchema), authController_1.signUp);
authRouter.post("/sign-in", (0, validateSchemaMiddleware_1.validateSchema)(signInSchema_1.signInSchema), authController_1.signIn);
exports.default = authRouter;
