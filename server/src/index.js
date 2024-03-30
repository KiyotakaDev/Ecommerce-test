import express from "express";
import cors from "cors";

import ProductRoutes from "./routes/product.controller.js";

const app = express();

// Middelwares
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json()); // Body JSON

app.use("/api", ProductRoutes);

app.listen(3000, () => console.log(">> Server on port 3000 <<"));
