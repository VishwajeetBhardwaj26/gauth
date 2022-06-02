const passport = require("passport");
const GooleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose')
const User = mongoose.model('users')
const googleClientID='848701010130-hfsju34130hj19lelppcgl1sg50ks3kq.apps.googleusercontent.com';
const googleClientSecret='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';


passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})

passport.use(
    new GooleStrategy({
        clientID:googleClientID,
        clientSecret:googleClientSecret,
        callbackURL:"/auth/google/callback",
        proxy:true,
    },
    (accessToken, refreshToken, profile,done)=>{
     User.findOne({userId:profile.id})
     .then((existingUser)=>{
          if(existingUser){
              done(null,existingUser)
          }else{
               new User({
                   userId:profile.id,
                   username:profile.displayName,
                   picture:profile._json.picture
                
                }).save()
               .then((user)=>{
                   done(null,user)
               })
          }
     })

    
   
    }
    )
    
)
