const User = require("../model/User");
const bcrypt = require("bcrypt");
const ROLES_LIST = require("../config/roles_list");
const handleNewUser = async (req, res) => {
  const { username, password, seller } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const duplicate = await User.findOne({ username: username }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    const result = await User.create({
      username: username,
      password: hashedPwd,
      roles: seller ? ROLES_LIST : {"Buyer":ROLES_LIST.Buyer},
    });

    console.log(result);
    res.status(201).json({ success: `New user ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = handleNewUser;
