import { Router } from "express";

import authenticate from "../../middleware/authMiddleware";

import {
  getAll,
  getOne,
  create,
  update,
  remove
} from "./task.controller";

const router = Router();

router.use(authenticate);

router.get("/", getAll);

router.get("/:id", getOne);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;