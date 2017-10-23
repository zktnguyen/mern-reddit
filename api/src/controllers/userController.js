import db from '../models';

const userController = {};

userController.post = (req, res) => {
  const { username, password } = req.body;

  const user = new db.User({
    username
  });

  user.setPassword(password);
  user.save()
    .then(newUser => {
      res.status(200).json({
        success: true,
        data: newUser
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err
      });
    });
}

// Validation

export default userController;