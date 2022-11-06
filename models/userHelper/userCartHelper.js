const ObjectId = require('mongodb').ObjectID
const collection = require("../../config/collection")
const db = require("../../config/connection")


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
                console.log(proExist);
                if(proExist!=-1){
                    db.get().collection(collection.CART_COLLECTION)
                    .updateOne({'products.item':ObjectId(proId)},
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
                    
                }
            ]).toArray()
            
            
           
            console.log(cartItems[0].products);

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
    }
}