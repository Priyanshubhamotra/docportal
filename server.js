import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World! Server is running.");
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
