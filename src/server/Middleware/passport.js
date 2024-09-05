import passport from "passport";

const authenticate = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/failure"
})

export default authenticate;