"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validateTokenMiddleware_1 = require("../middlewares/validateTokenMiddleware");
const router = (0, express_1.Router)();
router.delete("/delete", validateTokenMiddleware_1.validateToken, userController_1.deleteAccount);
exports.default = router;
