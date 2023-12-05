const { SignJWT, jwtVerify } = require("jose");

//el secreto no debe de quedar quemado
const secret = new TextEncoder().encode(
  process.env.TOKEN_SECRET || "Super Secret Value"
);
const expTime = process.TOKEN_EXP || "15d";
const tools = {};

tools.createToken = async (id) => {
  return await new SignJWT()
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(id)
    .setExpirationTime(expTime)
    .setIssuedAt()
    .sign(secret);
};

tools.verifyToken = async (token) => {
  //si el token esta valido se devuelve el PAYLOAD
  try {
    const { payload } = await jwtVerify(token,secret);
    return payload;
  } catch (error) {
    return false;
  }
};

module.exports = tools;
