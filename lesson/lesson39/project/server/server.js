import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors({ origin: true }));
app.use(express.json());

const users = [{ email: "test@example.com", password: "123456" }];

app.post("/api/login", (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: "email and password required" });
  }

  const user = users.find((u) => u.email === email && u.password == password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    ok: true,
    message: "Login successful",
    token: "demo-token-" + Date.now(),
  });
});

app.listen(PORT, () => {
  console.log("http://localhost:${PORT}");
});
