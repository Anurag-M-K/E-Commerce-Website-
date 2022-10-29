const adlogout = (req,res)=>{
  res.render('./admin/admin-panel')
}
  //   req.session.destroy(function(err){
  //     if(err){
  //       res.send("Error")
  //     }else{
  //       res.redirect('/')
  //     }
  //   })
  // }

  module.exports.adlogout = adlogout

//  ( (req,res)=>{
//     res.render('./admin/admin-panel')
// })