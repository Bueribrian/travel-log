const mongoose = require("mongoose");

async function connection() {
  return mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true,useUnifiedTopology: true})
  .then(()=>{
      return console.log('Database connected 🙌')
  })
  .catch((reason)=>{
    return console.error('Unable to connect to the mongodb instance. Error: ', reason);
  })
}

module.exports = connection;
