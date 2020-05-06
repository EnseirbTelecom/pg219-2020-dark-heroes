//imports 
var jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = '0jfeqzopfjmhspaiynbf13qgjliukyj65sgqsdfg3gs7sgsg';

//exported functions 
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
                userId: userData._id,

            },
            JWT_SIGN_SECRET, {
                expiresIn: '24h'
            })
    },

    parseAuthorization: function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;

    },

    getUserId: function(authorization) {
        var userId = -1;
        console.log(authorization);
        var token = module.exports.parseAuthorization(authorization);
        console.log(token);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null) {
                    userId = jwtToken.userId;
                    console.log(userId)
                }
            } catch (err) { console.log("bug") }
        }
        return userId;
    }

}