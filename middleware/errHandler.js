const errHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.message || "Backend Error";
  const extraDetails = err.messageInsider || "Error from Backend Side";
  return res.status(status).json({ message: extraDetails, msg });
};


module.exports = errHandler;