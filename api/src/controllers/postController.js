import db from '../models';

const postController = {};

postController.post = (req, res) => {
  const {
    title,
    text,
    link,
    userId  // get this from JWT
  } = req.body;

  // validation either text or link, not both

  const post = new db.Post({
    title,
    text,
    link,
    _creator: userId
  });

  post.save().then(newPost => {
    res.status(200).json({
      success: true,
      data: newPost
    });
  })
  .catch((err) => {
    res.status(500).json({
      message: err
    });
  });
};

postController.getAll = (req, res) => {
  db.Post.find({}).populate({
    path: '_creator',
    select: 'username createdAt -_id'
  }).populate({
    path: '_comments',
    select: 'text createdAt _creator',
    match: { 'isDeleted': false }
  }).then(posts => 
    res.status(200).json({
      success: true,
      data: posts
    })
  ).catch((err) => {
    res.status(500).json({
      message: err.toString()
    });
  });
};

export default postController;
