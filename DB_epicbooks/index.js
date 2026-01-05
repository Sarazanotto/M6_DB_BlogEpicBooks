const mongoose = require("mongoose");
require("dotenv").config();

const initDBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("database connect");
  } catch (error) {
    console.log("database error", error);
    process.exit(1)
  }
};

const startServer=async(prompt, app)=>{
    await initDatabaseConnection()
    app.listen(prompt, ()=>{
        console.log(`server listening on port ${port}`)
    })
}