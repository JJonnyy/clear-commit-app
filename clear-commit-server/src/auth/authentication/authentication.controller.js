import * as authenticationService from './authentication.service.js';
import {getRoleByUserLogin, getUserByLogin} from "../users/users.service.js";
import * as usersService from "../users/users.service.js";

export const signIn = async (req, res, next) => {
    try {
        const { login, password } = req.body;
        console.log('login', login);
        console.log('password', password);

        const token = await authenticationService.authenticateUser(login, password);

        // сохранить токен в куки на клиенте
        // res.cookie('token', token, {expires: new Date(Date.now() + 1000 * 60 * 60 * 24), httpOnly: true, secure: false }); //secure: true - for https only

        // сохранить токен в сессию (вместо куков) на сервере
        req.session.token = token;
        req.session.role = await getRoleByUserLogin(login);
        req.session.userInfo = await usersService.getUserByLogin(login);

        return res.json({"signIn":true});
    } catch (error) {
        return next(error);
    }
};

export const signUp = async (req, res, next) => {
    try {
        const { login, password, name, email } = req.body;
        console.log('req.body',req.body);
        const newUser = await authenticationService.registerNewUser(login, password, name, email );

        console.log('newUser',newUser);
        return res.json(newUser);
    } catch (error) {
        return next(error);
    }
};

export const logout = (req, res, next) => {
    req.session.destroy(err =>{
        if (err) {
            console.error("Session destruction error:", err);
            return res.status(500).json({
                logout: false,
                error: "Server error during logout"
            });
        }
    });
    res.clearCookie('connect.sid');
    res.clearCookie('token');
    res.json({logout: true});
}

export const checkAuth = (req, res, next) => {
    res.json({
        isAuthenticated: !!req.session.token || !!req.cookies.token,
        role: req.session.role,
        userInfo:req.session.userInfo
    });
}


