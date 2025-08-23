import express from "express";
const router = express.Router();

// Dummy User Routes
router.get("/", (req, res) => {
    res.json({ message: "User list fetched successfully", users: ["Alice", "Bob", "Charlie"] });
});

router.post("/login", (req, res) => {
    res.json({ message: "Login successful", user: req.body.username || "Guest" });
});

router.post("/signup", (req, res) => {
    res.json({ message: "Signup successful", user: req.body.username || "New User" });
});

export default router;
