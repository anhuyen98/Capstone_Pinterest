import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET ListImage & ListImageByName
const getListImage = async (req, res) => {
  try {
    let { search } = req.query;
    let data = await prisma.images.findMany({
      where: {
        image_name: {
          contains: search,
        },
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

// search Handle
// const getListByName = async (req, res) => {
//   try {
//     let { search } = req.query;
//     console.log(search)
//     let data = await prisma.images.findMany({
//       where: {
//         image_name: {
//           contains: search
//         }
//       }
//     });
//     if (data) {
//       res.status(200).send(data);
//     } else {
//       res.status(404).send("Not Found");
//     }
//   } catch (error) {
//     res.status(500).send(`Error ${error}`);
//   }
// };

const getImageById = async (req, res) => {
  try {
    let { imageId } = req.params;
    let data = await prisma.images.findFirst({
      where: {
        image_id: Number(imageId),
      },
      include: {
        Users: true,
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

const createImage = async (req, res) => {
  try {
    let { userId } = req.params;
    let { image_name, description } = req.body;
    let urlImage = req.url_image
    let newImage = {
      image_name,
      url: urlImage,
      description,
      user_id: Number(userId)
    };
    await prisma.images.create({
      data: newImage,
    });
    res.status(201).send("Create image successful");
  } catch (error) {
    res.status(500).send(`Error ${error}`);
  }
};

// checkSave (Button Save)
const saveImage = async (req, res) => {
  try {
    let { imageId, userId } = req.params;
    let data = await prisma.save_image.findFirst({
      where: {
        image_id: Number(imageId),
        user_id: Number(userId),
      },
      include: {
        Users: true,
      },
    });
    if (data) {
      res.status(200).send(data);
    } else {
      //  Code o day =>
      //  Neu chua save =>
      //  tao req =>
      //  create data save-image
      res.status(404).send("Not Found");
    }
  } catch (error) {
    res.status(500).send(`Error ${error}`);
  }
};

const deleteImage = async (req, res) => {
  try {
    let { imageId } = req.params;
    let data = await prisma.images.findFirst({
      where: {
        image_id: Number(imageId),
      },
    });
    if (data) {
      await prisma.images.delete({
        where: {
          image_id: Number(imageId)
        }
      })
      res.status(200).send("Delete image sucessful");
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    res.status(500).send(`Error ${error}`);
  }
};

export {
  getListImage,
  // getListByName,
  getImageById,
  deleteImage,
  saveImage,
  createImage,
};
