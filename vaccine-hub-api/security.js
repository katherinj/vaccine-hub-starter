const bcrypt = require("bcrypt")

const pw = "supersecretpassword"

bcrypt.hash(pw, 6, (err, hashedPw) => {
    console.log('password is ' + pw)
    console.log(`Hashed password is ` + hashedPw)
})