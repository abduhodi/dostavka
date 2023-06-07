function require_handler(res) {
  res.status(500).json({ message: "Required fields not filled" });
}

module.exports = {
  require_handler,
};
