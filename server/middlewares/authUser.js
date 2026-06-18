import jwt from "jsonwebtoken";

// Decode JWT Token
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorized" });
    }
    const token_decode = jwt.decode(token);
    req.clerkId = token_decode.clerkId;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default authUser;
