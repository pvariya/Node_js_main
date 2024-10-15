const auth = async (req, res, next) => {
    let {id}= req.cookies
    if(!id){
        return res.redirect("/user/logIn")
    }
    else{
            next()
    }
}

module.exports = auth;