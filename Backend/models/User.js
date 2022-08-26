const mongoose = require('mongoose');
const { use } = require('../routes/auth');
const { Schema } = mongoose;

const userSchema = new Schema({
   
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  const user = mongoose.model('user', userSchema);
  user.createIndexes();
  module.exports = user;