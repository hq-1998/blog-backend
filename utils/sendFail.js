export default function sendFail(res, message) {
  res.send({
    status: "fail",
    message,
  });
}
