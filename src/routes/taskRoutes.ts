import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  create,
  getAll,
  getOne,
  update,
  remove
} from "../controllers/taskController";
import { validate } from "../middleware/validateMiddleware";
import {
  taskSchema,
  updateTaskSchema
} from "../validators/taskValidator";

const router = Router();

router.use(protect);

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", validate(taskSchema), create);
router.put("/:id", validate(updateTaskSchema), update);
router.delete("/:id", remove);

export default router;