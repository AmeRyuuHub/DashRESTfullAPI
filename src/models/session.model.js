import mongoose from 'mongoose'
mongoose.set('useCreateIndex', true)

let sessionSchema = new mongoose.Schema({
  createDate: {
    type: Date,
    default: Date.now
  },
  user_id: String,
  active: {
    type: Boolean,
    default: true
  },
  userCookie: {
    type: String,
    default: null
  }
});

export const sessionModel = mongoose.model('Sessions',sessionSchema)