import { db } from "../../../db.js";
import { NotFoundError } from "../errors/models/not-found-error.model.js";

export const findAll = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(rows);
        });
    });
};

export const findById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE id = ${id}`, (err, row) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(row);
        });
    });
}

export const findByLogin = (login) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE login = '${login}'`, (err, row) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(row);
        });
    });
}

export const create = (user) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO users (login,role,name,email,password_hash) VALUES(?,?,?,?,?)', [user.login, user.role,user.email,user.name,user.passwordHash], (err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve('User was created');
        });
    });
};

export const update = (id, user) => {
    return new Promise((resolve, reject) => {
        db.run('UPDATE users SET role=? WHERE id=?', [user.role, id], (err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve('User was updated');
        });
    });
};

export const remove = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM users WHERE id=? AND role != "admin"', [id], function (err){
            if (err) {
                reject(err);
                return;
            }
            if (this.changes === 0) {
                reject(new NotFoundError(`User with id ${id} not found`));
                return;
            }

            resolve('User was removed');
        });
    });
};
