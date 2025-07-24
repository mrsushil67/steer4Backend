const { DBMODELS } = require("../models/init-models");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function generateMD5Hash(data) {
  const hash = crypto.createHash("md5");
  hash.update(data);
  return hash.digest("hex");
}

function generateToken(user) {
  if (!process.env.JWTSECRET) {
    throw new Error("JWTSECRET is not defined in environment variables");
  }
  const token = jwt.sign(
    { userId: user.User_ID, Email: user.Email },
    process.env.JWTSECRET,
    { expiresIn: "24h" }
  );
  return token;
}

module.exports.signInUser = async (req, res) => {
  try {
    const { Email, password } = req.body;

    if (!Email || !password) {
      return res
        .status(400)
        .json({ status: "400", message: "Fill all fields" });
    }

    const user = await DBMODELS.Users.findOne({
      where: { Email },
      attributes: { exclude: ['ShowPassword'] },
    });

    if (!user) {
      return res.status(404).json({ status: "404", message: "Invalid User" });
    }

    const hashpassword = generateMD5Hash(password);

    if (hashpassword !== user.password) {
      return res
        .status(401)
        .json({ status: "401", message: "Invalid Password" });
    }

    const token = generateToken(user);
    return res
      .status(200)
      .json({
        status: "200",
        message: "User logged in successfully",
        user,
        token,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
};

module.exports.userProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("User ID from request:", userId);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized User",userId });
    }

    const user = await DBMODELS.Users.findOne({
      where: { User_ID: userId },
      attributes: { exclude: ['password', 'ShowPassword'] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      status: "200",
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching user profile: ", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: false });
    
  }
}