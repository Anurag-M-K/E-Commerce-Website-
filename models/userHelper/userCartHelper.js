const ObjectId = require('mongodb').ObjectID
const { response } = require('express')
const collection = require("../../config/collection")
const db = require("../../config/connection")
const { loginview } = require('../../controllers/admin/adloginController')


module.exports = {
    addToCart:(proId,userId)=>{
        let proObj = {
            item:ObjectId(proId),
            quantity:1
           

        }
       
        return new Promise(async(resolve,reject)=>{
            let userCart = await db.get().collection(collection.CART_COLLECTION).findOne({user:ObjectId(userId)})
           
            if(userCart){
                let proExist = userCart.products.findIndex(product => product.item==proId)
              
                if(proExist!=-1){
                    db.get().collection(collection.CART_COLLECTION)
                    .updateOne({user:ObjectId(userId),'products.item':ObjectId(proId)},
                    {
                        $inc :{ 'products.$.quantity':1}
                    }
                    ).then(()=>{
                        
                        resolve()
                        
                    })
                }else{
                db.get().collection(collection.CART_COLLECTION)
                .updateOne({user:ObjectId(userId)},
                {
                    $push:{products:proObj}
                }
                ).then((response)=>{
                    resolve()
                })
            }
                
            }else{
                let cartObj = {
                    user:ObjectId(userId),
                    products : [proObj]
                }
                db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response)=>{
                    
                    resolve()
                })
            }
        })
    },
    getCartProducts : (userId)=>{
        return new Promise(async(resolve,reject)=>{
            const cartItems = await db.get().collection(collection.CART_COLLECTION).aggregate([
                {
                    $match : {user:ObjectId(userId)}
                },
               
                {
                    $unwind : "$products"
                },
                {
                    $project:{
                        item:'$products.item',
                        quantity:'$products.quantity'
                    }
                },
                
                {
                    $lookup: {
                        from :collection.PRODUCT_COLLECTION,
                        localField : 'item',
                        foreignField : "_id",
                        as : "products"
                    }
                    
                },
                {
                    $project:{
                        item:1,quantity:1,products:{$arrayElemAt:['$products',0]}
                    }
                }
            ]).toArray()
            
            
           
            // console.log(cartItems[0].products);

            resolve(cartItems)
        
        })
       
    },
    getCartCount : (userId)=>{
        return new Promise(async(resolve,reject)=>{
            let count = 0
            const cart = await db.get().collection(collection.CART_COLLECTION).findOne({user:ObjectId(userId)})
            
            if(cart){
                count = cart.products.length

            }
            resolve(count)
        })
    },
    changeProductQuantity:(details)=>{
        
        details.count = parseInt(details.count)
        details.quantity = parseInt(details.quantity)

        // let cartId = ObjectId(details.cart) 
        

        return new Promise((resolve,reject)=>{
             if(details.count == -1 && details.quantity == 1){
                    
                db.get().collection(collection.CART_COLLECTION)
                .updateOne({_id:ObjectId(details.cart)},
                {
                    $pull:{products:{item:ObjectId(details.products)}}
                }
                ).then((response)=>{
                    resolve({removeProduct : true})
                })
                
            }else{
            db.get().collection(collection.CART_COLLECTION)
            .updateOne({_id:ObjectId(details.cart),'products.item':ObjectId(details.product)},
            {
                $inc : {"products.$.quantity":details.count }
            }).then((response)=>{
                resolve(true)
            })
          
        }
   
        })
        
    },
    getTotalAmount : (userId)=>{
        
       
            return new Promise(async(resolve,reject)=>{


                const TotalAmount = await db.get().collection(collection.CART_COLLECTION).aggregate([
                   
                    {
                        $match : {user:ObjectId(userId)}
                    },
                   
                    {
                        $unwind : "$products"
                    },
                    {
                        $project:{
                            item:'$products.item',
                            quantity:'$products.quantity'
                        }
                    },
                    
                    {
                        $lookup: {
                            from :collection.PRODUCT_COLLECTION,
                            localField : 'item',
                            foreignField : "_id",
                            as : "products"
                        }
                        
                    },
                    {
                        $project:{
                            item:1,quantity:1,products:{$arrayElemAt:['$products',0]}
                        }
                    },
                    {
                        $group:{
                            _id:"",
                            total:{
                                $sum:{
                                    $multiply:[
                                        "$quantity","$products.Price"
                                    ]
                                }
                            }
                        }
                    }
                ]).toArray()
             

              
                response.TotalAmount = TotalAmount
                
                resolve(TotalAmount[0].total)
                    

            
            })
           
     },

     getSubTotal : (userId)=>{
        return new Promise(async(resolve,reject)=>{
            const subTotal = await db.get().collection(collection.CART_COLLECTION).aggregate([
                {
                    $match : {user:ObjectId(userId)}
                },
                {
                    $unwind : "$products"
                },
                {
                    $project : {
                        item:"$products.item",
                        quantity:"$products.quantity"
                    }

                },
                {
                    $lookup : {
                        from : collection.PRODUCT_COLLECTION,
                        localField : "item",
                        foreignField : "_id",
                        as : "products"
                    }
                },
                {
                    $project : {
                        _id : "",
                        total :
                         {
                            $multiply : [
                                '$quantity'
                            ]
                        }
                    }
                }
            ]).toArray()
            response.subTotal = subTotal
            console.log("quantity");
            resolve(subTotal[0].total)

        })
     
     }
    
}