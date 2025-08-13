import { Router } from "express";
import { login } from "../services/authService.js";

const router = Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await login(email, password);
    
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
