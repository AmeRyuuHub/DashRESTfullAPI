import mongoose from 'mongoose'
mongoose.set('useCreateIndex', true)

let dvbcSchema = new mongoose.Schema({
  mac: String,
  frequency: String,
  ber: Number,
  level: String,
  snr: String,
  modulation: String,
  ts: String
});

const dvbcModel = mongoose.model('dvbcs',dvbcSchema);

export default dvbcModel;