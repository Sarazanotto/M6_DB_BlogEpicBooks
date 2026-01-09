const bookService = require("./book.service");

const findAll = async (req, res) => {
  try {
    const { page = 1, pageSize = 20 } = req.query;
    const { books, totalPages, totalBooks } = await bookService.bookAll(
      page,
      pageSize
    );
    if (books.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "Book not found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      books,
      totalBooks,
      totalPages,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Error during the request",
    });
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid param",
      });
    }
    const book = await bookService.bookById(id);
    if (!book) {
      return res.status(400).send({
        statusCode: 400,
        message: "book not found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 500,
      message: " Error during the request",
    });
  }
};

const findByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const book = await bookService.bookByTitle(title);
    if (title) {
      return res.status(200).send({
        statusCode: 200,
        book,
      });
    }
    const allBook = bookService.bookAll(page, pageSize);
    res.status(200).send({
      statusCode: 200,
      message: "title not found",
      allBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 500,
      message: " Error during the request",
    });
  }
};

const findByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const book = await bookService.bookByCategory(category);
    if (category) {
      return res.status(200).send({
        book,
        statusCode: 200,
      });
    }
    const allBook = bookService.allBook(page, pageSize);
    res.status(200).send({
      statusCode: 200,
      message: "category not found",
      allBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 500,
      message: " Error during the request",
    });
  }
};

const create = async (req, res) => {
  try {
    const { body } = req;
    const newBook = await bookService.bookCreate(body);
    res.status(201).send({
      statusCode: 201,
      message: "Book upload succesful",
      newBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 500,
      message: " Error during the request",
    });
  }
};

const uploadFile=async(req,res)=>{
  try {
    const url= `${req.protocol}://${req.get('host')}`
const fileName= req.file.filename

res.status(200).json({
  cover:`${url}/uploads/${fileName}`

})

  } catch (error) {
      console.error(error);
    res.status(500).send({
      statusCode: 500,
      message: " Error during the request",
    });
  }
}

const modify = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    if (!id) {
      return res.status(400).send({
        statusCode: 400,
        message: "Book not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.staus(500).send({
      statusCode: 500,
      messsage: "Error during the request",
    });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).send({
        statusCode: 404,
        message: "Book not found",
      });
    }
    const book = await bookService.bookDelete(id);
    res.status(200).send({
      statusCode: 200,
      message: "Book deleted succesfully",
      book,
    });
  } catch (error) {
    console.error(error);
    res.staus(500).send({
      statusCode: 500,
      messsage: "Error during the request",
    });
  }
};

module.exports = {
  findAll,
  findOne,
  findByTitle,
  findByCategory,
  create,
  uploadFile,
  modify,
  deleteOne,
};
