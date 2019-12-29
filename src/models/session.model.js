import mongoose from 'mongoose'
mongoose.set('useCreateIndex', true)

let sessionSchema = new mongoose.Schema({
  createDate: {
    type: Date,
    default: Date.now
  },
  closeDate:{
    type: Date,
    default: null
  },
  user_id: String,
  active: {
    type: Boolean,
    default: true
  },
  token:{
    type:String,
    default:null
  },
  device:{
    type:String,
    default:null,
  },
  browser:{
    type:String,
    default:null,
  },
  version:{
    type:String,
    default:null,
  },
  os:{
    type:String,
    default:null,
  },
  platform:{
    type:String,
    default:null,
  },
  ip:{
    type:String,
    default:null,
  },
});

 const sessionModel = mongoose.model('Sessions',sessionSchema);
 export default sessionModel;