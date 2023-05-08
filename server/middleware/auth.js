import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        // const for checking if it's our token. If length is less than 500, it is our own
        const isCustomAuth = token.length < 500;

        // Data gotten from token
        let decodedData;

        if(token && isCustomAuth) {
            // We re gonna get the data of each token, i.e each username and Id. "test" is secretId for jwt used in the signin controller
            decodedData = jwt.verify(token, secret);

            // Store user Id
            req.userId = decodedData?.id
        } else {
            // If working with Google's OAuth token...
            decodedData = jwt.decode(token)

            // Store user Id. "sub" is google's name for a specific id that diffrentiates every single google user
            req.userId = decodedData?.sub;
        }
        
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;