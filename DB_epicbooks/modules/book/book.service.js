const bookSchema = require("./book.schema");
const BookSchema = require("./book.schema");

const bookAll = async (page, pageSize) => {
  const books = await BookSchema.find()
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .populate("author")
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

const bookUploadCover= async (id, url)=>{
  const book= await BookSchema.findByIdAndUpdate(id,{cover:url},{new:true})
  return book
}

const bookModify = async (id, body) => {
  const book = await BookSchema.findByIdAndUpdate(id, body, { new: true });
  return book;
};

const bookDelete = async (id) => {
  const book = await BookSchema.findByIdAndDelete(id);
  return book;
};


const uploadAllDocuments= async()=>{
  return await bookSchema.updateMany(
    {comments:{$exists: false}},
    {$set:{comments:[]}}
  
  )
}
module.exports = {
  bookAll,
  bookById,
  bookByTitle,
  bookByCategory,
  bookCreate,
  bookModify,
  bookUploadCover,
  bookDelete,
  uploadAllDocuments
};
