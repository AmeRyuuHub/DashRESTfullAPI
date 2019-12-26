import mongoose from 'mongoose'
mongoose.set('useCreateIndex', true)

let usersSchema = new mongoose.Schema({
  login: String,
  fullName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: Number,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  avatar:{
      type:Buffer,
      default:null
  } ,
  createDate: {
      type:Date,
      default:Date.now
  }
});

const usersModel = mongoose.model('users',usersSchema);

export default usersModel;