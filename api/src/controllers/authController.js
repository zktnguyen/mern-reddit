import jwt from 'jsonwebtoken';
import db from '../models';

const authController = {};

authController.post = (req, res) => {
  const { credentials } = req.body;
  db.User.findOne({ email: credentials.email })
      .then(user => {
        if (user && user.isValidPassword(credentials.password)) {
          res.json({ user: user.toAuthJSON() });
        }
        else {
          res.status(400).json({ errors: { global: "Invalid credentials" }});
        }
      });
};

authController.confirmation = (req, res) => {
  const token = req.body.token;
  db.User.findOneAndUpdate(
    { confirmationToken: token },
    { confirmationToken: "", confirmed: true },
    { new: true }
  ).then( user => user ? res.json({ user: user.toAuthJSON() })
                       : res.status(400).json({ errors: { global: "Invalid token." }})
        );
  
};

authController.resetPasswordRequest = (req, res) => {
  db.User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // send email
      res.json({});
    }
    else {
      res.status(400).json({ errors: { global: "There is no user with such email" }});
    }
  });
};

authController.validateToken = (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, err => {
    if (err) {
      res.status(401).json({});
    }
    else {
      res.json({});
    }
  });
};

authController.resetPassword = (req, res) => {
  const { password, token } = req.body.data;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ errors: { global: "Invalid token" }});
    }
    else {
      db.User.findOne({ _id: decoded._id }).then(user => {
        if (user) {
          user.setPassword(password);
          user.save().then(() => res.json({}));
        }
        else {
          res.status(404).json({ errors: { global: "Invalid token" }});
        }
      });
    }
  });
};

// Validation

export default authController;