const { registerUser, loginUser } = require('../services/authServices');

const registerUserController = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await registerUser(username, password, role);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await loginUser(username, password);
    if (data) {
      res.json({ success: true, data });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
};
