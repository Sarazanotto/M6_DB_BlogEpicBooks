const mongoose = require("mongoose");
require("dotenv").config();

const initDatabaseConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("database connected succesfully");
  } catch (error) {
    console.error("database connection error");
    throw error;
    process.exit(1);
  }
};

const startServer = async (port, app) => {
    await initDatabaseConnection()
    app.listen(port, ()=>{
        console.log(`server on running on ${port}`)
    })
};

module.exports=startServer