const { response } = require('express')
const collection = require('../config/collection')
const db = require('../config/connection')
var ObjectId = require('mongodb').ObjectId


module.exports = {
    addbrand: (Brand,callback)=>{
        console.log(Brand)
        db.get().collection(collection.BRAND_COLLECTION).insertOne(Brand).then((data)=>{
           console.log(data)
            callback(data)
        })
    },
 
    getAllBrands:()=>{
        return new Promise(async(resolve,reject)=>{
            let Brand = await db.get().collection(collection.BRAND_COLLECTION).find().toArray()
            console.log(Brand)
            resolve(Brand)
        })
    },

    deleteBrand:(id)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.BRAND_COLLECTION).deleteOne({_id:ObjectId(id)}).then((response)=>{
                resolve(response)
            })
        })
    }
}