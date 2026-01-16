const { upload } = require("../../middlewares/uploads");
const AuthorSchema = require("./author.schema");
const bcrypt= require('bcrypt')




const authorAll = async (page, pageSize) => {
  const users = await AuthorSchema.find()
    .limit(pageSize)
    .skip((page - 1) * pageSize);
  const totalUser = await AuthorSchema.countDocuments();
  const totalPages = Math.ceil(totalUser / pageSize);
  return {
    page,
    pageSize,
    totalUser,
    totalPages,
    users,
  };
};

const authorById = async (id) => {
  const user = await AuthorSchema.findById(id);
  return user;
};

const authorCreate = async (body) => {
 
  const newUser = new AuthorSchema(body)
   

  const userSaved = await newUser.save();
  return userSaved;
};

const authorUpdateAvatar= async(id,url)=>{
  const user= await AuthorSchema.findByIdAndUpdate(id, {avatar:url},{new:true})
  return user
}

const authorModify = async (id, body) => {
  const user = await AuthorSchema.findByIdAndUpdate(id, body, { new: true });
  return user;
};

const authorDelete = async (id) => {
  const user = await AuthorSchema.findByIdAndDelete(id);
  return user;
};

module.exports = {
  authorAll,
  authorById,
  authorCreate,
  authorUpdateAvatar,
  authorModify,
  authorDelete,
};
