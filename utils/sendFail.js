function sendFail(res, message) {
  res.send({
    status: "fail",
    message,
  });
}

module.exports = sendFail;