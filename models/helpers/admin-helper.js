const { response } = require('express');
const { ObjectId } = require('mongodb');
const { resolve } = require('path');
const bcrypt = require('bcrypt')
const db = require('../../config/connection')
const collection = require('../../config/collection')


module.exports={
    adminDoLogin:(admindata)=>{
      return new Promise(async(resolve,reject)=>{
        
        let response = {}
      
        let admin = await db.get().collection(collection.ADMIN_CREDENTIAL).findOne({userName:admindata.username})
        
        
        if(admin)
        {
          bcrypt.compare(admindata.password,admin.Password).then((status)=>{
            if(status)
            {
              console.log('login success')
              response.user=admin
              response.status=true
              resolve(response)
            }
            else
            {
              
              console.log('password wrong')
              resolve({status:false})
            }
          })
        }
        else{
          console.log('user not found')
          resolve({status:false})
        }
      })
    },



    showUser:()=>{
      return new Promise(async(resolve,reject)=>{
        let user = await db.get().collection(collection.USER_COLLECTION).find().toArray()
        resolve(user)
      })

    }




  }
