import { Request, Response, NextFunction } from "express";

import {
  registerUser,
  loginUser
} from "./auth.service";

import {
  registerSchema,
  loginSchema
} from "./auth.validation";

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const data = registerSchema.parse(req.body);

    const user = await registerUser(data);

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    next(error);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const data = loginSchema.parse(req.body);

    const result = await loginUser(data);

    res.status(200).json({
      message: "Login successful",
      ...result
    });

  } catch (error) {
    next(error);
  }
};

const logout = (
  req: Request,
  res: Response
) => {

  res.json({
    message: "Logout successful. Remove the JWT from the client."
  });
};

export {
  register,
  login,
  logout
};