Script per generare hashed passwords

const crypto = require('crypto');

const password = 'playsthenics0';
const salt = 'saltforpassword';

crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
    if (err) {
        console.error(err);
    } else {
        console.log(hashedPassword.toString('hex')); // Output the hashed password in hexadecimal format
    }
});

Demo not yet available.

User registered:
Guest user
username: guest
password: beta
salt: unaltrohash
hashed password: 666c8936a7565188f7c5df1c01e81d3ff94ebcfc0908a2d8da5c1c612ab9ea7d

Admin user
username: playsthenics@gmail.com
password: playsthenics0
salt: saltforpassword
hashed password: 33db5f37e2931bb0699ea47a58130c4903c8182aeb9f7f35871b260bb592cb70

Registered user:
username: user
password: user
salt: salteduser
hashed password: 7f43d95f04988650c61d4744936626002227b2b3238fb0e57e08f9006d6aa71e