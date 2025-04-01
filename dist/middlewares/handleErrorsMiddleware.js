"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleErrors;
function handleErrors(err, req, res, next) {
    console.error(err);
    if (err.type === "conflict") {
        res.status(409).send(err.message);
        return;
    }
    if (err.type === "unauthorized") {
        res.status(401).send(err.message);
        return;
    }
    if (err.type === "not_found") {
        res.status(404).send(err.message);
        return;
    }
    if (err.type === "bad_request") {
        res.status(400).send(err.message);
        return;
    }
    res.status(500).send("Internal Server Error");
}
