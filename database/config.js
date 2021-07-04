const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("DB ONLINE");
  } catch (error) {
    console.log("Error al inicializar db", error);
  }
};

module.exports = {
  dbConnection,
};
