const AppError = require("./appError");

class NotFoundError extends AppError{
    constructor(properties,resourcre){
        // properties :[]

        let notFoundProperties = ' '
        properties.array.forEach(property => notFoundProperties+=`${property},`);

        super(`Not able to find properties ${notFoundProperties} for the resource ${resourcre} , 404`)
    }
}

module.exports = NotFoundError