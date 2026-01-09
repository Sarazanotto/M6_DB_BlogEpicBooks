const BookSchema = require("./book.schema");

const bookAll = async (page, pageSize) => {
  const books = await BookSchema.find()
    .limit(pageSize)
    .skip((page - 1) * pageSize);
  const totalBooks = await BookSchema.countDocuments();
  const totalPages = Math.ceil(totalBooks / pageSize);
  return {
    books,
    totalPages,
    totalBooks,
    page,
  };
};

const bookById = async (id) => {
  const book = await BookSchema.findById(id);
  return book;
};

const bookByTitle= async(title)=>{
  const book= await BookSchema.find({title: title})
  return book
}

const bookByCategory= async(category)=>{
  const book= await BookSchema.find({category: category})
  return book
}

const bookCreate = async (body) => {
  const newBook = new BookSchema(body);
  const bookSaved = await newBook.save();
  return bookSaved;
};

const bookModify = async (id, body) => {
  const book = await BookSchema.findByIdAndUpdate(id, body, { new: true });
  return book;
};

const bookDelete = async (id) => {
  const book = await BookSchema.findByIdAndDelete(id);
  return book;
};
module.exports = {
  bookAll,
  bookById,
  bookByTitle,
  bookByCategory,
  bookCreate,
  bookModify,
  bookDelete,
};
