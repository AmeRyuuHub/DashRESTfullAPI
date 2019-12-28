import { statusModel, pingModel, dvbcModel } from "../models";
import express from "express";

const status = express.Router();

status.get("/:mac", async (req, res) => {
  try {
    const mac = req.params.mac;
    if (mac.length !== 12 && mac.length !== 16) {
      throw new Error("Incorrected MAC or Device ID length");
    }
    const statusList = await statusModel.findOne(
      { mac: mac },
      { _id: 0, mac: 0 }
    );
    if (!statusList)
      return res.status(400).send({ message: "MAC or Device ID not found" });

    res.status(200).send({ mac: mac, status: statusList });
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`
    });
  }
});
status.get("/:mac/ping", async (req, res) => {
  try {
    const mac = req.params.mac;
    if (mac.length !== 12 && mac.length !== 16) {
      throw new Error("Incorrected MAC or Device ID length");
    }
    const pingList = await pingModel.find({ mac: mac }, { _id: 0, mac: 0 });
    if (!!pingList)
      return res.status(400).send({ message: "MAC or Device ID not found" });
    res.status(200).json({ mac: mac, status: pingList });
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`
    });
  }
});
status.get("/:mac/dvbc", async (req, res) => {
  try {
    const mac = req.params.mac;
    if (mac.length !== 12 && mac.length !== 16) {
      throw new Error("Incorrected MAC or Device ID length");
    }
    const dvbcList = await dvbcModel.find({ mac: mac }, { _id: 0, mac: 0 });
    if (!dvbcList)
      return res.status(400).send({ message: "MAC or Device ID not found" });
    res.status(200).json({ mac: mac, status: dvbcList });
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`
    });
  }
});

export default status;
