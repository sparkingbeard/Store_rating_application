import { signupService, loginService } from '../services/authService.js';

export const signup = async (req, res) => {
  try {
    const result = await signupService(req.body);

    res.status(201).json({
      message: 'User created successfully',
      ...result
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { safeUser, token } = await loginService(req.body);

    res.json({
      message: 'Login successful',
      token,
      safeUser
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};