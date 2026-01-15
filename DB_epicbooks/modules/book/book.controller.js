const BookNotFound = require("../../middlewares/expectation/books/bookNotFound");
const BooksCollectionEmpty = require("../../middlewares/expectation/books/booksCollectionEmpty");
const bookService = require("./book.service");

const findAll = async (req, res,next) => {
  try {
    const { page = 1, pageSize = 20 } = req.query;
    const { books, totalPages, totalBooks } = await bookService.bookAll(
      page,
      pageSize
    );
    if (books.length === 0) {
      throw new BooksCollectionEmpty();
    }
    res.status(200).send({
      statusCode: 200,
      books,
      totalBooks: Number(totalBooks),
      totalPages: Number(totalPages),
    });
  } catch (error) {
   next(error)
  }
};

const findOne = async (req, res,next) => {
  try {
    const { id } = req.params;
    if (!id) {
    throw new BookNotFound()
    }
    const book = await bookService.bookById(id);
    if (!book) {
      throw new BooksCollectionEmpty();
    }
    res.status(200).send({
      statusCode: 200,
      book,
    });
  } catch (error) {
       next(error)
  }
};

const findByTitle = async (req, res,next) => {
  try {
    const { title } = req.query;
    if (!title) {
      throw new BookNotFound();
    }
    const allBook = bookService.bookAll(page, pageSize);
    res.status(200).send({
      statusCode: 200,
      message: "title not found",
      allBook,
    });
  } catch (error) {
       next(error)
  }
};

const findByCategory = async (req, res,next) => {
  try {
    const { category } = req.query;
    if (!category) {
      throw new BookNotFound();
    }
    const allBook = bookService.allBook(page, pageSize);
    res.status(200).send({
      statusCode: 200,
      message: "category not found",
      allBook,
    });
  } catch (error) {
       next(error)
  }
};

const create = async (req, res,next) => {
  try {
    const { body } = req;
    console.log("CONTROLLO BODY" + body);
    const newBook = await bookService.bookCreate(body);
    res.status(201).send({
      statusCode: 201,
      message: "Book upload succesful",
      newBook,
    });
  } catch (error) {
       next(error)
  }
};

const uploadFile = async (req, res,next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ statusCode: 400, message: "Missing file" });
    }
    const url = `${req.protocol}://${req.get("host")}`;
    const fileName = req.file.filename;

    res.status(200).json({
      cover: `${url}/uploads/${fileName}`,
    });
  } catch (error) {
       next(error)
  }
};

const uploadFileId = async (req, res,next) => {
  try {
    const { id } = req.params;
    const url = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    const updateBook = await bookService.bookUploadCover(id, url);
    res.status(200).json({ statusCode: 200, updateBook });
  } catch (error) {}
};

const modify = async (req, res,next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    if (!id) {
      throw new BookNotFound();
    }
  } catch (error) {
      next(error)
  }
};

const deleteOne = async (req, res,next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new BookNotFound();
    }
    const book = await bookService.bookDelete(id);
    res.status(200).send({
      statusCode: 200,
      message: "Book deleted succesfully",
      book,
    });
  } catch (error) {
      next(error)
  }
};

module.exports = {
  findAll,
  findOne,
  findByTitle,
  findByCategory,
  create,
  uploadFile,
  uploadFileId,
  modify,
  deleteOne,
};
