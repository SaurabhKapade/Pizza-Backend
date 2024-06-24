const AppError = require('./appError')

class UnauthorisedError extends AppError{
    constructor(){
        super('User is not authorised',401)
    }
}
module.exports = UnauthorisedError