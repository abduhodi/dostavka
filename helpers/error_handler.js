function error_handler(res) {
  res.status(500).json({ message: "Internal Server Error" });
}

module.exports = {
  error_handler,
};
