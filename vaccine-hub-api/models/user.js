const db = require("../db")
const { UnauthorizedError, BadRequestError } = require ("../utils/errors")


class User {
    static async login(credentials){
        //user should submit their email and password
        // if any of these fields are missing, throw an error
        //
        // lookup the user in the db by email
        // if a user is found, compare the submitted password
        // with the password in the db
        //if there is a match, return the user
        // 
        //if any of this goes wrong, throw an error
        throw new UnauthorizedError("Invalid email/password combo")
    }

    static async register(credentials){
        // user should submit their email, pw, rsvp status
        // if any of those fields are missing, throw an error
        const requiredFields = ["id", "password", "first_name", "last_name", "email", "location", "date"]
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        if(credentials.email.indexOf("@") <= 0){
            throw new BadRequestError("Invalid email")
        }

        
        //make sure no user already exists in the system with that email
        //if one does, throw an error
        const existsingUser = await User.fetchUserByEmail(credentials.email)
        if(existsingUser){
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }
        
        // take the users password and hash it
        // take the users email and lower case it
        const lowercasedEmail = credentials.email.toLowerCase()


        // create a new user in the db with all their info
        const result = await db.query(
            `INSERT INTO users {
                email, 
                password,
                first_name,
                last_name
            }
            VALUES ($1, $2, $3, $4)
            RETURNING 
                id, 
                password, 
                first_name, 
                last_name, 
                email, 
                location, 
                date;
            `,[id,
                credentials.password, 
                credentials.first_name, 
                credentials.last_name], 
                lowercasedEmail, 
                credentials.location,
                credentials.date 
        )
        
        //return the user 
        const user = result.rows[0]
        return user
    }
    static async fetchUserByEmail(email){
        if (!email){
            throw new BadRequestError("No email provided")
        }

        const query = `SELECT * FROM users WHERE email = $1`

        const result = await db.query(query, [email.toLowerCase()])
        
        const user = result.rows[0]
        
        return user
    }
}

module.exports = User