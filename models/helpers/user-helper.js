const { response } = require('express');
const { resolve } = require('path');
const ObjectId = require('mongodb').ObjectID
const db = require('../../config/connection')
const bcrypt = require('bcrypt')
const collection = require('../../config/collection');
const { log } = require('console');

module.exports = {
    insertUserCredentials : (verified,Name,Email,Password)=>{
        return new Promise(async (resolve,reject)=>{
            Password = await bcrypt.hash(Password,10);
            console.log(Password);
            db.get()
            .collection(collection.USER_COLLECTION)
            .insertOne({ verified,Name,Email,Password})
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
                
            }else{
                let cartObj = {
                    user:ObjectId(userId),
                    productS : [ObjectId(proId)]
                }
                db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response)=>{
                    
                    resolve()
                })
            }
        })
    }

}
