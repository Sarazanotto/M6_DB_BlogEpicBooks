const express= require ('express')
const oauth = express.Router()
const passport = require('passport')
const oauthController = require('./insta.controller')

oauth.get('/instagram',passport.authenticate('instagram', { scope: ['profile']}),oauthController.auth )
oauth.get('/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/' }), oauthController.manageOauthCallback)

module.exports= oauth