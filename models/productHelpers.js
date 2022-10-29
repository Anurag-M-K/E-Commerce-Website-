const db = require('../config/connection')
const collections = require('../config/collection')
const { ObjectId } = require('mongodb')

module.exports = {
    addProduct: (imageID,productionData)=>{
        return new Promise(async(resolve,reject)=>{

            db.get().collection(collections.PRODUCT_COLLECTION).insertOne(imageID,productionData).then((data)=>{
             
                resolve.apply(data)
             
            })
        })
    },

    getAllProducts : ()=>{
        return new Promise(async(resolve,reject)=>{
         let products = await db.get().collection(collections.PRODUCT_COLLECTION).find().toArray()
            console.log( "not coming" +products)
            resolve(products)
        })
    },
    getProductDetails:(id)=>{
        return new Promise((resolve,reject)=>{
           db.get().collection(collections.PRODUCT_COLLECTION).findOne({_id:ObjectId(id)}).then((products)=>{
               
                resolve(products)
            })
        })
    },
    deleteProducts:(id)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collections.PRODUCT_COLLECTION).deleteOne({_id:ObjectId(id)}).then((response)=>{
                resolve(response)
            })
        })
    }
}