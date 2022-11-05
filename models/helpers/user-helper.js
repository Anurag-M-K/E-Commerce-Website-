const { response } = require('express');
const { resolve } = require('path');
const ObjectId = require('mongodb').ObjectID
const db = require('../../config/connection')
const bcrypt = require('bcrypt')
const collection = require('../../config/collection');
const { log } = require('console');
const { ObjectID } = require('bson');



module.exports = {
    insertUserCredentials : (verified,Name,Email,Password,Lname,Phone)=>{
        return new Promise(async (resolve,reject)=>{
            Password = await bcrypt.hash(Password,10);
            console.log(Password);
            db.get()
            .collection(collection.USER_COLLECTION)
            .insertOne({ verified,Name,Email,Password,Lname,Phone})
            .then((data)=>{
                resolve(data);
            })
        })
    },

    userDoLogin : (userdata)=>{
        return new Promise (async(resolve, reject)=>{
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({Name:userdata.username})
            
            if(user){
                console.log("user found");
                if(user.verified==1)
            
                {
                    console.log("verifieed");
                bcrypt.compare(userdata.Password,user.Password).then((status)=>{
                    if(status){
                        response.user = user
                        response.status = true
                        console.log("Success");
                        resolve(response)
                    }else{
                        console.log("Fail");
                        resolve({status:false})
                    }
                })

            }else{
                console.log("user not found");
                resolve({status:false})
            }
        }else{
            resolve({status:false})
        }
    });  
    },
 

    updateVerified : (userId)=>{    
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).updateOne({_id:userId},{
                $set:{
                    verified:1
                }
            }).then((response)=>{
                resolve(response)
            })
        })
    },
    addToCart:(proId,userId)=>{
        return new Promise(async(resolve,reject)=>{
            let userCart = await db.get().collection(collection.CART_COLLECTION).findOne({user:ObjectId(userId)})
            if(userCart){
                db.get().collection(collection.CART_COLLECTION)
                .updateOne({user:ObjectId(userId)},
                {
                    $push:{products:ObjectId(proId)}
                }
                ).then((response)=>{
                    resolve()
                })
                
            }else{
                let cartObj = {
                    user:ObjectId(userId),
                    products : [ObjectId(proId)]
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
                    $lookup: {
                        from :collection.PRODUCT_COLLECTION,
                        localField : 'products',
                        foreignField : "_id",
                        as : "products"
                    }
                    
                }
            ]).toArray()
            
            
           

            resolve(cartItems)
          
        
        })
       
    }

}
