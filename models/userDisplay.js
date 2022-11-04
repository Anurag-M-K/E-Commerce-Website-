// const db = require('../config/connection')
// const collection = require('../config/collection')
// const { ObjectId } = require('mongodb')

// module.exports = {
//     displayProducts:()=>{
//         return new Promise(async(resolve,reject)=>{
//             let product = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
//             resolve(product)
//         })
//     },

//     viewProductDetails:(productId)=>{
//         return new Promise((resolve,reject)=>{
//             db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:ObjectId(productId)}).then((product)=>{
//                 resolve(product)
//             })
//         })
//     }
// }