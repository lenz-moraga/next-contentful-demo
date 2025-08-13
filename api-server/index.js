import express from "express";
import cors from "cors";
import projectsRouter from "./src/routes/projectsRoute.js";
import loginRouter from "./src/routes/loginRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

// Middleware to disable caching
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Projects routes
app.use("/api/projects", projectsRouter);
app.use("/api/auth/login", loginRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
