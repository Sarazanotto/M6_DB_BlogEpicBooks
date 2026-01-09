const validateBook = (req, res, next) => {
  const errors = [];
if(!req.body){
  return res.status(400).send({errors:['Missing request body']})
}
  const { category, title, readTime, author, content, price } = req.body;

  if (typeof category !== "string" || !/^[a-zA-Z]+$/.test(category)) {
    errors.push("Category must be a string of letters only");
  }
  if (typeof title !== "string") {
    errors.push("Title must be a string");
  }
  
  if (!readTime|| typeof readTime.value !== "number") {
    errors.push("the reading time value must be a number");
  }
  if (typeof author !== "string") {
    errors.push("the author must be a string");
  }
  if (typeof content !== "string") {
    errors.push("Content must be a string");
  }
  if (typeof price !== "number") {
    errors.push("Price must a number");
  }

  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }

  next();
};
module.exports = validateBook;
