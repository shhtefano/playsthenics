import { db } from '../../db/db';
import crypto from 'crypto';

interface UserRow {
    username: string;
    salt: string;
    password: string;
    role:string;
}

// userDAO.ts

const getUser = (username: string, password: string) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM USERS WHERE username = ?';
            db.get(sql, [username], (err: Error, row: UserRow) => {
                
                if (err) reject(err);
                else if (row === undefined) {
                    resolve(false);
                } else {
                    const user = {
                        username: row.username,
                        role: row.role // Assumendo che ci sia un campo `role` nel tuo database
                    };
                    const salt = row.salt;
                    crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
                        if (err) reject(err);
                        if (!crypto.timingSafeEqual(Buffer.from(row.password, 'hex'), hashedPassword)) {
                            resolve(false);
                        } else {
                            console.log('utente', user);
                            resolve(user); // Restituisce l'oggetto utente con il ruolo
                        }
                    });
                }
            });
        } catch (err) {
            resolve(err);
        }
    });
};

const UserDAO = {getUser};
export default UserDAO;