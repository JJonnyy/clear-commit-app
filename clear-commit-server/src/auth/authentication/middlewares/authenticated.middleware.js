import jsonwebtoken from 'jsonwebtoken';
import { NotAuthenticatedError } from '../../errors/models/not-authenticated-errror.model.js';
import { WEB_TOKEN_SECRET_KEY } from '../../../config/config.js';

export const authenticated = (req, res, next) => {
    try {
        // const { token } = req.body;
        // const token = req.cookies.token;

        const token = req.session.token;
        jsonwebtoken.verify(token, WEB_TOKEN_SECRET_KEY);

        return next();
    } catch (error) {
        next(new NotAuthenticatedError());
    }
};
