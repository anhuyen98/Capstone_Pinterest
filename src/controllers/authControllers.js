import { PrismaClient } from "@prisma/client";
import { createToken } from "../configs/jwt.js";
import { checkPw, encodePw } from "../utils/encode-decode-PW.js";
const prisma = new PrismaClient();

// Authentication
const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    // Check user
    let data = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (data) {
      // neu co ton tai user => check pw => tao token
      const checkPassword = checkPw(password, data.password);
      if (checkPassword) {
        let payload = {
          user_id: data.user_id,
          // user_id: 17, check codeApi
        };
        console.log(payload)
        const token = createToken(payload);
        res.status(200).send(token);
      } else {
        res.status(404).send("Password Incorrect");
      }
    } else {
      // neu khong ton tai user => tra ve loi
      res.status(404).send("Login Failed, User not existed");
    }
  } catch (error) {
    res.send(`Error ${error}`);
  }
};

// Authorization
const signUp = async (req, res) => {
  try {
    let { email, password, fullname, age, avatar = '' } = req.body;
    // check user
    let data = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (!data) {
      // neu khong ton tai => ma hoa password => tao user
      // const encodePW = bcrypt.hashSync(password, 10) - ma hoa pw = 10 lan
      const encodePassword = encodePw(password, 10);
      // tao avatar mac dinh neu nguoi dung khong tai len avatar
      if (avatar === '') {
        let initAvatar = fullname.split(' ')
        let avatarName = initAvatar[0][0] + initAvatar[initAvatar.length - 1][0]
        avatar = `https://ui-avatars.com/api/?name=${avatarName}&background=random&size=100`
      }
      let newUser = {
        email,
        password: encodePassword,
        fullname,
        age,
        avatar,
      };
      await prisma.users.create({
        data: newUser,
      });
      res.status(201).send("Created user successful");
    } else {
      res.status(404).send("User is existed");
    }
  } catch (error) {
    res.status(500).send(`Error ${error}`);
  }
};

export { login, signUp };
