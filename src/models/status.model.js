import mongoose from 'mongoose'
mongoose.set('useCreateIndex', true)

const statusSchema = new mongoose.Schema({
  mac: String,
  last_report: String,
  next_report: String,
  online: String,
  version: String,
  loader: String,
  model: String,
  cas: String,
  cpu: Number,
  hdmi: String,
  hls_decodeErrors: Number,
  hls_kbReceived: Number,
  icmp_router: Number,
  icmp_platform: Number,
  minerva: String,
  IpAddress: String,
  NetMask: String,
  DnsServer1: String,
  DnsServer2: String,
  DefaultGateway: String,
  pin: String,
  playback_type: String,
  playback_idx: String,
  power: String,
  settings_name: String,
  settings_value: String,
  tuner_frequency: String,
  tuner_modulation: String,
  tuner_level: String,
  tuner_snr: String,
  tuner_ber: Number,
  ui_action: String,
  ui_name: String,
  ExternalIP: String,
  wifi: String,
  death: String,
  type_m: String
});

const statusModel = mongoose.model('status',statusSchema);

export default statusModel;
