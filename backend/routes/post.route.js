import express from "express";
const router = express.Router();

// Dummy Post Routes
router.get("/", (req, res) => {
    res.json({ message: "Posts fetched successfully", posts: ["Post1", "Post2", "Post3"] });
});

router.post("/create", (req, res) => {
    res.json({ message: "Post created successfully", post: req.body.post || "Sample Post" });
});

export default router;
