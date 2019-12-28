import mongoose from "mongoose";
mongoose.set("useCreateIndex", true);

const pingSchema = new mongoose.Schema({
  platform: Number,
  mac: String,
  rtt: Number,
  ts: String
});

const pingModel = mongoose.model("pings", pingSchema);

export default pingModel;
