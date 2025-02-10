import express from "express";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/product.route.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const __dirname = path.resolve();

const app = express();
const PORT=process.env.PORT || 5000;
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));


app.use("/api/products",productRouter)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}....`);
});
