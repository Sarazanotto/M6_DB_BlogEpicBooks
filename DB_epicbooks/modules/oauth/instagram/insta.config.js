
const passport = require('passport')
const InstagramStrategy = require('passport-instagram').Strategy


const initInstagramPassport=()=>{

passport.serializeUser((user, done) => 
    done(null, user)) 
passport.deserializeUser((user, done) =>
     done(null, user))
}

// strategia di accesso
passport.use(
    new InstagramStrategy({
        clientID: process.env.ID_CLIENT_INSTA,
        clientSecret: process.env.SECRET_CLIENT_INSTA,
        callbackURL: process.env.CALLBACK_URL_INSTA
    }, (accessToken, refreshToken, profile, done) => {
      
        console.log('USER PROFILE', profile)
       
        return done(null, profile)
    })
)


module.exports = {
    initInstagramPassport
}