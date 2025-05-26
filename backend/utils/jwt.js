const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res, message) => {
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1h' }
  );

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 1000),
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  };

  res.status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      message,
      token,
      user,
    });
};

module.exports = sendToken;
