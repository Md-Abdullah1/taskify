const checkLogin = async (req, res, next) => {
  let body = req.body || false;

  if (body) {
    const { email, password } = req.body;

    const missingFields = {};

    if (!email) missingFields.email = "Email is required";
    if (!password) missingFields.password = "Password is required";

    if (Object.keys(missingFields).length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields,
      });
    }

    next();
  } else {
    res.status(401).json({
      message: "Login Failed! . required email and password",
    });
  }
};

module.exports = checkLogin;
