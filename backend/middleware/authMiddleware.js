import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const verifyAdmin = (req,res,next) => {
    if(req.user.role !== "admin"){
        return res.status(403).json({message: "Admin access only"})
    }
    next();
};


// import jwt from 'jsonwebtoken';

// export const verifyToken = (req,res,next) => {
//     const token = req.headers['authorization']?.split('')[1];
//     if(!token) return res.status(401).json({ message: 'No token, authorization denied' });

//     try{
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded.id;
//     }catch(err){
//         res.status(401).json({message: 'Token is not valid'})
//     }
// };