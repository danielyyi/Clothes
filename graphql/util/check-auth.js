const {AuthenticationError} = require('apollo-server')

const jwt = require('jsonwebtoken');

module.exports = (context) => {
    //context = {... headers}
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        //Bearer... 
        const token = authHeader.split('Bearer ')[1]
        if(token){
            try{
                const user = jwt.verify(token, process.env.SECRET_KEY);
                return user;
            }catch(error){
                throw new AuthenticationError('Invalid/Expired Token')
            }
        }
        throw new Error('Authentication Token must be \'Bearer [token]\'')
    }
    throw new Error('Authorization header must be provided')

}