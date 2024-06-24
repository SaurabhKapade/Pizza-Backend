const AppError = require("./appError");

class BadRequestError extends AppError{
    constructor(invalidParams){
        // invalidParams :[]

        let message = ' '
        invalidParams.forEach(params => message += `${params}\n`);
        super('The Request has the following invalid parameters',400)

        super(`Not able to find properties ${notFoundProperties} for the resource ${resourcre} , 404`)
    }
}

module.exports = BadRequestError