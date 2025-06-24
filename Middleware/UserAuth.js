import jwt from "jsonwebtoken";

const UserAuth = async (req, res, next) => {
  try {
    const { token } = req.headers; //we will send token in header while using api
    
    if (!token) {
      return res.json({
        succuss: false,
        message: "not authorized. login agian",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET); //token verification

    req.body.userId = token_decode.id // coz upcoming fun need the token so we passed it to next()


    next();
  } catch (error) {
    console.log(error);
    res.json({succuss:false, message:error.message})
    
  }
};


export default UserAuth