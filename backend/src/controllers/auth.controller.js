import * as authService from "../services/auth.service.js"

export const register = async (req, res) => {
    try {
        const {email, password} = req.body;
        const result = await authService.register(email, password);
        return res.status(201).json(result);
    }
    catch (err) {
        return res.status(400).json({message: err.message})
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await authService.login(email, password);

        return res.json(result);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};