const HttpError= require ('../index')

class AuthorCollectionEmpty extends HttpError{
    constructor(){
        message= 'author collection is empty',
        statusCode= 404,
        error= 'The author collection in empty'
        super(message, statusCode, error)
    }
}

module.exports= AuthorCollectionEmpty