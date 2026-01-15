const HttpError = require("..");

class BooksCollectionEmpty extends HttpError{
    constructor(
        message= 'Book collection is empty',
        statusCode= 404,
        error='Your collection is empty'
    ){
        super(message, statusCode,error)
    }
}

module.exports= BooksCollectionEmpty