import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  create,
  getAll,
  getOne,
  update,
  remove
} from "../controllers/taskController";

const router = Router();

router.use(protect);

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;