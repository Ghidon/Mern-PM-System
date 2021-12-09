import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // if the token has less than 500 will be our custom token
    // otherwise (!isCustomAuth) will be Google token
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_KEY);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
      // sub is used by google to differentiate any single user id
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
