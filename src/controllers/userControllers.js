import { PrismaClient } from "@prisma/client";
import { encodePw } from "../utils/encode-decode-PW.js";
const prisma = new PrismaClient();
const getInfoUser = async (req, res) => {
  try {
    let { userId } = req.params;
    console.log("userId: ", userId);
    let data = await prisma.users.findFirst({
      where: {
        user_id: Number(userId),
      },
    });
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    res.status(500).send(`Error ${error}`);
  }
};

const updateUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let { email, password, fullname, age, avatar } = req.body;
    let data = await prisma.users.findFirst({
      where: {
        user_id: Number(userId),
      },
    });
    if (data) {
      let newData = {
        email,
        password: encodePw(password, 10),
        fullname,
        age: Number(age),
        avatar,
      };
      await prisma.users.update({
        where: {
            user_id: Number(userId)
        },
        data: newData
      })
      res.status(200).send("Update successful");
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    res.status(500).send(`Error ${error}`);
  }
};

const getListSave = async (req, res) => {
  try {
    let { userId } = req.params;
    let data = await prisma.save_image.findMany({
      where: {
        user_id: Number(userId),
      },
    });
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    res.status(500).send(`Error ${error}`);
  }
};

const getListCreate = async (req, res) => {
  try {
    let { userId } = req.params;
    let data = await prisma.images.findMany({
      where: {
        user_id: Number(userId),
      },
    });
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    res.status(500).send(`Error ${error}`);
  }
};

export { getInfoUser, updateUser, getListCreate, getListSave };
