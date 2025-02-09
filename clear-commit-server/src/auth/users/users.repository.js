import { NotFoundError } from "../errors/models/not-found-error.model.js";
import { query } from '../../../db-postgres.js';

export const findAll = async () => {
    const { rows } = await query('SELECT * FROM users');
    return rows;
};

export const findById = async (id) => {
    const { rows } = await query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
};

export const findByLogin = async (login) => {
    const { rows } = await query('SELECT * FROM users WHERE login = $1', [login]);
    return rows[0];
};

export const create = async (user) => {
    await query(
        'INSERT INTO users (login, role, name, email, password_hash) VALUES ($1, $2, $3, $4, $5)',
        [user.login, user.role, user.name, user.email, user.passwordHash]
    );
    return 'User was created';
};

export const update = async (id, user) => {
    const { rowCount } = await query(
        'UPDATE users SET role = $1 WHERE id = $2',
        [user.role, id]
    );
    if (rowCount === 0) throw new NotFoundError(`User with id ${id} not found`);
    return 'User was updated';
};

export const remove = async (id) => {
    const { rowCount } = await query(
        'DELETE FROM users WHERE id = $1 AND role != \'admin\'',
        [id]
    );
    if (rowCount === 0) throw new NotFoundError(`User with id ${id} not found`);
    return 'User was removed';
};

// Sqlite3 version
// import { db } from "../../../db.js";
// export const findAll = () => {
//     return new Promise((resolve, reject) => {
//         db.all('SELECT * FROM users', (err, rows) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//
//             resolve(rows);
//         });
//     });
// };
//
// export const findById = (id) => {
//     return new Promise((resolve, reject) => {
//         db.get(`SELECT * FROM users WHERE id = ${id}`, (err, row) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//
//             resolve(row);
//         });
//     });
// }
//
// export const findByLogin = (login) => {
//     return new Promise((resolve, reject) => {
//         db.get(`SELECT * FROM users WHERE login = '${login}'`, (err, row) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//
//             resolve(row);
//         });
//     });
// }
//
// export const create = (user) => {
//     return new Promise((resolve, reject) => {
//         db.run('INSERT INTO users (login,role,name,email,password_hash) VALUES(?,?,?,?,?)', [user.login, user.role,user.email,user.name,user.passwordHash], (err) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//
//             resolve('User was created');
//         });
//     });
// };
//
// export const update = (id, user) => {
//     return new Promise((resolve, reject) => {
//         db.run('UPDATE users SET role=? WHERE id=?', [user.role, id], (err) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//
//             resolve('User was updated');
//         });
//     });
// };
//
// export const remove = (id) => {
//     return new Promise((resolve, reject) => {
//         db.run('DELETE FROM users WHERE id=? AND role != "admin"', [id], function (err){
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             if (this.changes === 0) {
//                 reject(new NotFoundError(`User with id ${id} not found`));
//                 return;
//             }
//
//             resolve('User was removed');
//         });
//     });
// };
