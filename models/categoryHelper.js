const { response } = require('express')
const collection = require('../config/collection')
var db = require('../config/connection')
var objectId = require('mongodb').ObjectId
module.exports = {
   addCategory:(Categories,callback)=>{
    console.log(Categories)
    db.get().collection(collection.CATEGORIES_COLLECTION).insertOne(Categories).then((data)=>{
       console.log(data)
        callback(data)
    })
},
getAllCategories:()=>{
    return new Promise(async(resolve,reject)=>{
        let Categories = await db.get().collection(collection.CATEGORIES_COLLECTION).find().toArray()
        console.log("data",Categories);
        resolve(Categories)
    })
},

deleteCategory:(id)=>{
    return new Promise(async(resolve,reject)=>{
       await db.get().collection(collection.CATEGORIES_COLLECTION).deleteOne({_id:objectId(id)}).then((response)=>{
            
            resolve(response)
        })
    })
},

editCategory:(catId,Categories)=>{
    return new Promise(async(resolve,reject)=>{
        console.log(Categories)
        db.get().collection(collection.CATEGORIES_COLLECTION).updateOne({_id:ObjectId(catId)},{
            $set:{
            category:Categories._category
            }
        })
    })
}


}

