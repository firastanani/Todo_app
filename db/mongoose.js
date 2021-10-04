const mongoose = require("mongoose");
const config = require('config')

mongoose
  .connect(config.get('db'), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(" connect with  mongodb ");
  })
  .catch(() => {
    console.log(" falid connect with mongodb....");
  });



