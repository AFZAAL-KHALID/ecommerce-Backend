import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers; //we will send token in header while using api
    if (!token) {
      return res.json({
        succuss: false,
        message: "not authorized. login agian",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET); //token verification

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        succuss: false,
        message: "not authorized. login agian",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({succuss:false, message:error.message})
    
  }
};


export default adminAuth