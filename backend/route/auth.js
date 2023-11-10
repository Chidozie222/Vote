const { Router } = require("express");
const auth = Router()

const dotenv = require('dotenv')
dotenv.config()
const {OAuth2Client} = require('google-auth-library')

async function getUserData(access_token){
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`);
    const data = await response.json();
    console.log('data', data);
}


auth.get('/google', async function(req, res, next) {
    const code = req.query.code;
    console.log(code);
    try{
        const redirectUrl = 'http://localhost:2000/auth/google/callback'
        const oAuth2Client = new OAuth2Client(
            process.env.Google_client_id,
            process.env.Google_client_secret,
            redirectUrl
        );
        const res = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(res.tokens)
        const user = oAuth2Client.credentials;
        console.log('credentials', user);
        await getUserData(user.access_token);
    } catch(err) {
        console.log('Error with signing in with google');
        console.log(err);
    }
})

auth.get('/auth/google/callback', async(req, res) =>{
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Referrer-Policy","no-referrer-when-downgrade");
    res.redirect('http://localhost:2000/google')
})


auth.post('/google', async function(req,  res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Referrer-Policy","no-referrer-when-downgrade");

    const redirectUrl = 'http://localhost:2000/auth/google/callback'

    const oAuth2Client = new OAuth2Client(
        process.env.Google_client_id,
        process.env.Google_client_secret,
        redirectUrl
    )

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'consent'
    })

    res.json({url:authorizeUrl})
})

module.exports = auth;