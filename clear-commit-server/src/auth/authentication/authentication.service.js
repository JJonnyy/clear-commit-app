import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { AuthError } from '../errors/models/auth-error.model.js';
import * as usersService from '../users/users.service.js';
import { WEB_TOKEN_SECRET_KEY } from '../../config/config.js';
import { NotUniqueLoginError } from '../errors/models/not-unique-login-error.model.js';

const EXPIRES_IN = '1d';

const generateAuthToken = (payload) => jsonwebtoken.sign(payload, WEB_TOKEN_SECRET_KEY, { expiresIn: EXPIRES_IN });

const createPasswordHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync());

const compareHashWithPassword = (password, passwordHash) => bcrypt.compareSync(password, passwordHash);

export const registerNewUser = async (login, password, name, email) => {
    const possibleUser = await usersService.getUserByLogin(login);

    if (possibleUser) {
        throw new NotUniqueLoginError();
    }

    const passwordHash = createPasswordHash(password);

    const newUser = await usersService.create({
        login: login,
        name: name,
        email: email,
        role: 'user',
        passwordHash: passwordHash
    });

    return newUser;
};

export const authenticateUser = async (login, password) => {
    const user = await usersService.getUserByLogin(login);

    if (!user) {
        throw new AuthError();
    }

    const isPasswordCorrect = compareHashWithPassword(password, user.password_hash);
    if (!isPasswordCorrect) {
        throw new AuthError();
    }

    return generateAuthToken({
        id: user.id,
    });
};
