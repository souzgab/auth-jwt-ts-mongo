import jwt from 'jsonwebtoken'
const authConfig = require('../config/auth.json')

export default{
    generateJwt(params = {}) {
        return jwt.sign(params, process.env.SECRET || authConfig.secret, {
            expiresIn: 86400
        })
    }
}