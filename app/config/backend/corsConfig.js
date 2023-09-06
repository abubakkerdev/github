const allowlist = ["http://localhost:5173", "http://localhost:5000"];

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (req.method === "OPTIONS") {
    const intendedMethod = req.header("Access-Control-Request-Method");

    if (allowlist.indexOf(req.header("Origin")) !== -1) {
      if (req.header("Origin") === "http://localhost:5000") {
        let requestAccept = ["GET"];

        if (requestAccept.indexOf(intendedMethod) !== -1) {
          corsOptions = { origin: true };
        } else {
          corsOptions = { origin: false };
        }
      } else if (req.header("Origin") === "http://localhost:5173") {
        let requestAccept = ["GET", "POST"];

        if (requestAccept.indexOf(intendedMethod) !== -1) {
          corsOptions = { origin: true };
        } else {
          corsOptions = { origin: false };
        }
      }
    } else {
      corsOptions = { origin: false };
    }
  }
  callback(null, corsOptions);
};

module.exports = corsOptionsDelegate;
