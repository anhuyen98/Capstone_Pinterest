import { verifyToken } from "../configs/jwt.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const checkToken = async (req, res, next) => {
  // Check token on header
  let { token } = req.headers;
  if (!token) {
    return res.status(404).send("Token is not existed");
  }
  // Check token format
  let isToken = verifyToken(token);
  if (isToken.statusCode == 401) {
    return res.status(401).send(isToken.message);
  }
  // Check role (by userID)
  let { user_id } = isToken.data.data;
  let isRole = await prisma.users.findFirst({
    where: {
      user_id,
    },
  });
  console.log(isRole);
  if (!isRole) {
    return res.status(404).send("Access Permission");
  }
  req.user_id = user_id
  // req.headers.user_id = user_id
  next(); // Bypass
};
