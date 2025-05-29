const { DBMODELS } = require('../models/init-models');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function generateMD5Hash(data) {
  const hash = crypto.createHash('md5');
  hash.update(data);
  return hash.digest('hex'); // Returns a hexadecimal string
}

function generateToken(user){
    const token = jwt.sign({userId: user.User_ID, Email: user.Email}, process.env.JWTSECRET,{expiresIn: '20m'});
    return token;
}

module.exports.signInUser = async (req, res) => {
    try {
        const { Email, password } = req.body;

        if (!Email || !password) {
            return res.status(400).json({ message: "Fill all fields", status: false });
        }

        const user = await DBMODELS.Users.findOne({
            where: { Email },
        });

        if (!user) {
            return res.status(404).json({ message: "Invalid User", status: false });
        }

        const hashpassword = generateMD5Hash(password);

        if (hashpassword !== user.password) {
            return res.status(401).json({ message: "Invalid Password", status: false });
        }

        const token = generateToken(user);
        return res.status(200).json({ message: "User logged in successfully", user, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", status: false });
    }
};