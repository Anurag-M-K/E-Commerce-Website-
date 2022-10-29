const db = require('../config/connection')
const collections = require('../config/collection')
const { ObjectId } = require('mongodb')
const { userSignupBcrypt } = require('../controllers/users/usersController')
const bcrypt = require('bcrypt')
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
    },
    editProduct : (productId,productDetails,Image)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).updateOne({_id:ObjectId(productId)},{
                $set:{
                    productName:productDetails.productName,
                    Price:productDetails.Price,
                    Category:productDetails.Category,
                    brandName:productDetails.brandName,
                    Quantity : productDetails.Quantity,
                    Image: productImage
                },
            }).then((response)=>{
                resolve()
            })
        })
    },
    showOneProduct:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).findOne({_id:ObjectId(id)}).then((response)=>{
                resolve(response)
            })
        })
    }
      
}