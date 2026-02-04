const { verifyToken } = require("../helper/jwt");


function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  //test console
  console.log(authHeader)

  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid token format" });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    /*
     this line: req.user = decoded;

      This is very important.

      You are attaching user data to the request object, so all next middleware / routes can access it.

    Example later:

     router.get("/profile", authMiddleware, (req, res) => {
       console.log(req.user.userId); // available here
       res.send("Protected route");
     });
*/
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
