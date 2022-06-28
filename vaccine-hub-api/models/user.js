const db = require("../db")
const { UnauthorizedError } = require ("../utils/errors")


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
        //
        //make sure no user already exists in the system with that email
        //if one does, throw an error
        //
        // take the users password and hash it
        // tkae the users email and lower case it
        // // create a new user in thedb with all their info
        //return the user 
    }
}

module.exports = User