import { Router, Request, Response } from "express";

const router = Router();

interface Book {
  id: number;
  name: string;
  author: string;
}

const books: Book[] = [
  { id: 1, name: "unfinished", author: "PC" },
  { id: 2, name: "finished", author: "GV" },
  { id: 3, name: "1984", author: "GO" },
];

router.get("/books", (req: Request, res: Response) => {
  res.json(books);
});

router.get("/books/:id", (req: Request, res: Response) => {
  const bookId = fetchBookId(req);
  const book = findBook(books, bookId);

  !book
    ? res.status(404).json({ message: "Book not found" })
    : res.status(200).json(book);
});

router.post("/books", (req: Request, res: Response) => {
  const newBook: Book = {
    id: books.length + 1,
    author: req.body.author,
    name: req.body.name,
  };

  books.push(newBook);

  res.status(201).json(newBook);
});

router.put("/books/:id", (req: Request, res: Response) => {
  const bookId = fetchBookId(req);
  const bookIndex = findBookIndex(books, bookId);

  books[bookIndex] = {
    id: bookId,
    name: req.body.name,
    author: req.body.author,
  };

  bookIndex === -1
    ? res.status(404).json({ message: "Book not found" })
    : res.status(200).json(books[bookIndex]);
});

router.delete("/books/:id", (req: Request, res: Response) => {
  const bookId = fetchBookId(req);
  const bookIndex = findBookIndex(books, bookId);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(204).json({ message: "Book deleted" });
  }
  res.status(404).json({ message: "Book not found" });
});

const findBook = (books: Book[], id: number): Book | undefined =>
  books.find((book) => book.id === id);

const findBookIndex = (books: Book[], id: number): number =>
  books.findIndex((book) => book.id === id);

const fetchBookId = (req: Request): number => Number(req.params.id);

export default router;
