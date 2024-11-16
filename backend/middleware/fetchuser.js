// middleware to fetch user
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'House123#'


const fetchUser = (req, res, next) => {

    try {
        const authToken = req.header('auth-token')
        if (!authToken) {
            res.status(401).json({ Error: "Please enter correct auth token" });
        }
        const authtokenData = jwt.verify(authToken, JWT_SECRET);
        req.user = authtokenData;
        

        next();
    } catch (error) {
        console.error(error);
    }

}

module.exports = fetchUser;
