import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getListCommentById = async (req, res) => {
  try {
    let { imageId } = req.params;
    let data = await prisma.comments.findMany({
      where: {
        image_id: Number(imageId),
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

const commentImageById = async (req, res) => {
  try {
    let { imageId, userId } = req.params
    console.log("imageId, userId: ", imageId, userId);
    let { content } = req.body
    let newComment = {
      image_id: Number(imageId),
      user_id: Number(userId),
      comment_date: new Date(),
      content,
    }
    await prisma.comments.create({
      data: newComment
    })
    res.status(201).send("Create comment successful");
  } catch (error) {
    res.status(500).send(`Error ${error}`);
  }
};

export { getListCommentById, commentImageById };
