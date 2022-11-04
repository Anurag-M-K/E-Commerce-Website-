

const single = (req,res)=>{
    res.render('users/singlePage',{user:true,admin:false})
}

module.exports = {
    single
}