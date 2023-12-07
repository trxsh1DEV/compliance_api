// import jwt from 'jsonwebtoken';

// export default async (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(401).json({
//       errors: ['Login é obrigatório'],
//     });
//   }

//   const [, token] = authorization.split(' ');

//   try {
//     // const data = jwt.verify(token, process.env.TOKEN_SECRET);
//     // const { id, email } = data;

//     const data = jwt.verify(token, process.env.TOKEN_SECRET);
//     const { id, mail: email } = data;
//     const user = await User.findOne({ _id: id, email });

//     if (!user) {
//       return res.status(401).json({
//         errors: ['Usuário inválido'],
//       });
//     }

//     req.userId = id;
//     req.userEmail = email;
//     return next();
//   } catch (err) {
//     return res.status(403).json({
//       errors: ['Token expirado ou inválido'],
//     });
//   }
// };
