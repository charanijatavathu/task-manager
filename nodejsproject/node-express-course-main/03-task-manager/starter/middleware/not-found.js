const notfound=(req,res)=>{
    res.staus(404).send('route doesnt exist')
}
module.exports=notfound