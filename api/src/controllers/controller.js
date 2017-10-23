const controller = {};

controller.getMessage = (req, res) => {
  res.json({
    message: 'welcome to our API'
  });
};

export default controller;
