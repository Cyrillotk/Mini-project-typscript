import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./user.model";

interface AuthData {
  username: string;
  password: string;
}

const registerUser = async ({
  username,
  password
}: AuthData) => {

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new Error("Username already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    passwordHash
  });

  return {
    id: user._id,
    username: user.username
  };
};

const loginUser = async ({
  username,
  password
}: AuthData) => {

  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatch) {
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      username: user.username
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: (process.env.JWT_EXPIRES_IN || "1d") as jwt.SignOptions["expiresIn"]
    }
  );

  return {
    token,

    user: {
      id: user._id,
      username: user.username
    }
  };
};

export {
  registerUser,
  loginUser
};