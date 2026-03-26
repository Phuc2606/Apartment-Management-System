import * as userService from '../services/user.service.js';

export const getMe = async (req, res) => {
  try {
    const user = await userService.getCurrentUser(req.user.id);
    res.json({ user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateMe = async (req, res) => {
  try {
    const updated = await userService.updateProfile(req.user.id, req.body);
    res.json({ user: updated });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};