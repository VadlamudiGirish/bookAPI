import express, { Request, Response } from "express";
import bookRoutes from "./routes/bookRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", bookRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Books API");
});

app.listen(PORT, () => {
  console.log(`Books API running at port ${PORT}`);
});
