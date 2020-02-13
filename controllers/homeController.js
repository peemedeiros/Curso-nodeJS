exports.index = (req, res)=>{

    let obj = {
        userInfo: req.userInfo
    };

    res.render('home', obj);
}