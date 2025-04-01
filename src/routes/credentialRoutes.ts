import { Router } from "express";
import * as credentialController from "../controllers/credentialController";
import { validateSchema } from "../middlewares/validateSchemaMiddleware";
import { validateToken } from "../middlewares/validateTokenMiddleware";
import { validateIdParam } from "../middlewares/validateIdParamMiddleware";
import { createCredentialSchema } from "../schemas/createCredentialSchema";

const router = Router();

router.post(
  "/credentials",
  validateToken,
  validateSchema(createCredentialSchema),
  credentialController.create
);
router.get("/credentials", validateToken, credentialController.get);
router.get(
  "/credentials/:id",
  validateToken,
  validateIdParam,
  credentialController.get
);
router.put(
  "/credentials/:id",
  validateToken,
  validateSchema(createCredentialSchema),
  validateIdParam,
  credentialController.update
);
router.delete(
  "/credentials/:id",
  validateToken,
  validateIdParam,
  credentialController.remove
);

export default router;
