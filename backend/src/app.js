import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import path from "path";

import { app } from "./utils/socket.js";

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";

const __dirname = path.resolve();

//routes declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/messages", messageRouter);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist"); // Use dist for Vite
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}
// http://localhost:8000/api/v1/users/register

export { app };
