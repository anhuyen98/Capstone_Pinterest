export const checkUserId = (req, res, next) => {
  let userId = req.body.user_id || req.params.userId;
  let user_id = req.user_id;
  console.log("req.user_id: ", req.user_id);
  if (Number(userId) !== user_id) {
    return res.status(404).send("User is not permission");
  }
  next();
};
