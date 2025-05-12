const checkRegister = async (req, res, next) => {
  let body = req.body || false;

  if (body) {
    const { name, email, password } = req.body;

    const missingFields = {};

    if (!name) missingFields.name = "Name is required";
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
      message: "Registration Failed! . required name ,email and password",
    });
  }
};

module.exports = checkRegister;
