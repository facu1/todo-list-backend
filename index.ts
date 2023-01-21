import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import mongoose, { Schema, model } from "mongoose";

const app = express();

const Item = model(
  "Item",
  new Schema({
    title: { type: String },
    description: { type: String },
    status: { type: String },
  })
);

mongoose.set("strictQuery", false);
void mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.info("connected to MongoDB");
  })
  .catch((error: unknown) => {
    console.error("error connecting to MongoDB");
    console.error(error);
  });

app.get("/api/items", async (_req: Request, res: Response) => {
  const items = await Item.find({});

  res.json(items);
});

app.post("/api/items", async (_req: Request, res: Response) => {
  const newItem = new Item({
    description: "Any description",
    status: "Pending",
    title: "To do",
  });

  const savedItem = await newItem.save();

  res.status(201).json(savedItem);
});

app.listen(process.env.PORT, () => {
  console.info("server started on port 3000");
});
