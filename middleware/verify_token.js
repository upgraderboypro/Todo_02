const jwt = require('jsonwebtoken');
// Verify the token
// jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Token verification failed' });
//     }

//     // Attach the decoded user information to the request object for further use
//     req.user = decoded;

//     // Continue with the next middleware or route handler
//     next();
//   });
  const fetchUser = (req, res, next)=>{
    const token = req.header('auth-token')
    console.log(token)
    if(!token || undefined || null) return res.status(200).send({error: "Plz., authenticate using a valid token"})
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY)
      const user = data._id;
      console.log('token', data)
      req.user = user;
      next()
    } catch (error) {
      res.status(400).send({error: "Plz., authenticate using a valid token"})
    }
  }
  module.exports = { fetchUser}