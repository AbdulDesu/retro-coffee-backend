const dbConnect = require('../../config/db.config')

module.exports = {
  createCustomerModel: (acId) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO customer SET ?'

      dbConnect.query(query, { ac_id: acId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  updateCustomerModel: (csId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
          UPDATE 
          customer
          SET ? 
          WHERE cs_id = ${csId}
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
  getCustomerByCsIdModel: (csId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM customer WHERE ?    
      `

      dbConnect.query(query, { cs_id: csId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}
