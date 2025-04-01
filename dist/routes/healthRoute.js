"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthRouter = (0, express_1.Router)();
healthRouter.get("/health", (req, res) => {
    res.status(200).send("I’m OK!");
});
exports.default = healthRouter;
