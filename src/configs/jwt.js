import jwt from "jsonwebtoken";
import sc_key from "./sc_key.config.js";


export const createToken = (data) => {
  return jwt.sign({ data }, sc_key, { expiresIn: "1d" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, sc_key, (err, decodeToken) => {
    if (err) {
      return {
        statusCode: 401,
        message: "Token Invalid",
      };
    }
    return {
      statusCode: 200,
      data: decodeToken,
    };
  });
};


