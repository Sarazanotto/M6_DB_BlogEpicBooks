const HttpError= require ('../index')

class BookNotFound extends HttpError{
    constructor(
        message= 'Book not found',
        statusCode=404,
        error= 'The book request does not exist'
    ){
        super(message, statusCode,error)
    }
}

module.exports= BookNotFound