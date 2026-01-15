const HttpError= require('../index')

class AuthorNotFound extends HttpError{
    constructor(
        statusCode=404,
        message=' Author not found',
        error= 'The author request does not exist'
    ){
        super(message, statusCode,error)
    }
}

module.exports= AuthorNotFound