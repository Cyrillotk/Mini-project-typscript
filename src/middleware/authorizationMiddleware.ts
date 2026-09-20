import {
  Response,
  NextFunction
} from "express";

import {
  AuthRequest
} from "./authMiddleware";

const authorize = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  if (!req.user) {
    return res.status(403).json({
      message: "Access denied"
    });
  }

  next();
};

export default authorize;