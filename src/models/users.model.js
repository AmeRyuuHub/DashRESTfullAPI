import mongoose from 'mongoose'
mongoose.set('useCreateIndex', true)

let usersSchema = new mongoose.Schema({
  login:{
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: Number,
    required: true,
    default:0
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