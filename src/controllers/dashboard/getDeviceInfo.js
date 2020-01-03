export const getDeviceInfo = (model, one) => {
  return async (req, res) => {
    try {
      const mac = req.params.mac;

      if (mac.length !== 12 && mac.length !== 16) {
        throw new Error("Incorrected MAC or Device ID length");
      }
      let queryFind = { mac: mac };
      let queryCut = { _id: 0, mac: 0 };
      const statusList =
        one === "one"
          ? await model.findOne(queryFind, queryCut)
          : await model.find(queryFind, queryCut);

      let checkValue = one === "one" ? statusList : statusList.length;

      if (!checkValue)
        return res.status(404).send({ message: "MAC or Device ID not found" });

      res.status(200).send({ mac: mac, status: statusList });
    } catch (err) {
      res.status(500).send({
        error: `${err.message}`
      });
    }
  };
};




