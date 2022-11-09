import express from "express";
import { Router } from "express";
import Book from "../schemas/BookSchema.js";
import { requireLogin } from "../middleware.js";

const app = express();
const router = Router();

router.get("/", requireLogin, async (req, res) => {
  let books = await Book.find({ userId: req.user._id }).catch(() => {
    res.status(500).send({ message: "Something went wrong" });
  });
  if (books !== null) {
    res.status(200).send(books);
  }
});

router.post("/", requireLogin, async (req, res) => {
  let data = req.body;
  data.userId = req.user._id;
  Book.create(data)
    .then(() => res.status(200).send({ message: "Book added successfully" }))
    .catch(() => {
      res.sendStatus(500).send({ message: "Something went wrong." });
    });
});

router.put("/:id", requireLogin, async (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.status(200).send({ message: "Book edited successfully" }))
    .catch(() => {
      res.sendStatus(500).send({ message: "Something went wrong." });
    });
});

router.delete("/:id", requireLogin, (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send({ message: "Book deleted successfully" }))
    .catch(() => {
      res.sendStatus(500).send({ message: "Something went wrong." });
    });
});
export default router;
