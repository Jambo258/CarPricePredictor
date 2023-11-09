import "dotenv/config";
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const auth = req.get("Authorization");
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).send({error: "Invalid token"});
  }
  const token = auth.substring(7);
  // console.log(token);
  const secret = process.env.SECRET;
  try {
    const decodedToken = jwt.verify(token, secret);
    // console.log(decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Invalid token" });
  }
};
export default auth;
