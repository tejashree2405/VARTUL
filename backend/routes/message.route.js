import express from "express";
const router = express.Router();

// Dummy Message Routes
router.get("/", (req, res) => {
    res.json({ message: "Messages fetched successfully", messages: ["Hello", "How are you?", "Bye"] });
});

router.post("/send", (req, res) => {
    res.json({ message: "Message sent successfully", content: req.body.message || "Empty Message" });
});

export default router;
