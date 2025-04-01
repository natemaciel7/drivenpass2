"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdParam = validateIdParam;
function validateIdParam(req, res, next) {
    const { id } = req.params;
    const numberId = Number(id);
    if (!numberId || numberId <= 0) {
        res.status(400).send("Invalid ID");
        return;
    }
    next();
}
