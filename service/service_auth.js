// const sessionIdToUserMap = new Map();
// we have created a hash map

const jwt = require('jsonwebtoken');
const secret = "Kg@122003";
// this secret key is the stamp , that certifies it is orignal
function setUser(user){
    // sessionIdToUserMap.set(id , user);
    return jwt.sign({
        _id : user._id,
        email: user.email,
        role : user.role,
    } , secret);

}
// ye secret key hamara stamp hai 
function getUser(token){
    // return sessionIdToUserMap.get(id);
    if(!token) return null;
    try{
        return jwt.verify(token , secret);
    } catch(error){
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}