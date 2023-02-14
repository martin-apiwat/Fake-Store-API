import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
app.use(express.json());
app.use(cors({ origin: "*" }));

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (error) {
    res.send("Gick inge bra");
  }
});

app.post("/products", async (req, res) => {
  try {
    console.log(req.body);
    await Product.create(req.body);
    res.send("hej");
  } catch (error) {
    res.send("funkade ej");
  }
});

app.listen(3000, () => {
  console.log("Started server");
  mongoose.set("strictQuery", false);
  mongoose.connect(
    "mongodb+srv://MartinApiwat:Martin123@cluster0.rigswq4.mongodb.net/?retryWrites=true&w=majority"
  );
});
