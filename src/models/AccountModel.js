const dbConnect = require('../../config/db.config')

const { createCustomerModel } = require('../models/CustomerModel')

module.exports = {
  createAccountModel: (data) => {
    return new Promise((resolve, reject) => {
      const dataAcc = {
        ac_name: data.ac_name,
        ac_email: data.ac_email,
        ac_phone: data.ac_phone,
        ac_password: data.ac_password
      }

      const query = `
            INSERT INTO account
                    SET ?
          `

      dbConnect.query(query, dataAcc, async (err, res, _fields) => {
        if (!err) {
          await createCustomerModel(res.insertId)
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  },

  getAccountByEmailModel: (acEmail) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM account WHERE ?    
      `

      dbConnect.query(query, { ac_email: acEmail }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  loginAccountModel: (email) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
        FROM account ac join customer cs ON (ac.ac_id = cs.ac_id)
        WHERE ?
      `
      dbConnect.query(query, { ac_email: email }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  updateAccountModel: (acId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
          UPDATE 
          account
          SET ? 
          WHERE ac_id = ${acId}
          `
      dbConnect.query(query, data, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          console.log(error)
          reject(error)
        }
      })
    })
  },
  getAccountById: (acId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
          FROM account
         WHERE ?
      `

      dbConnect.query(query, { ac_id: acId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}
