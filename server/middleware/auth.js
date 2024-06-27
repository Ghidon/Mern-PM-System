import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Received token: ", token);

    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "No token provided" });
    }

    const isCustomAuth = token.length < 500;
    console.log("Is custom auth: ", isCustomAuth);

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_KEY);
      console.log("Decoded custom token: ", decodedData);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      console.log("Decoded Google token: ", decodedData);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.error("Authentication error: ", error);
    res.status(401).json({ message: "Authentication failed" });
  }
};

export default auth;
