const dbConnect = require('../../config/db.config')

module.exports = {
  createCart: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
            INSERT INTO cart
                    SET ?
          `
      dbConnect.query(query, data, (error, results, _fields) => {
        console.log(results)
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getCartByCsId: (csId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
          FROM cart
         WHERE ?
      `

      dbConnect.query(query, { cs_id: csId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  deleteCartByCsId: (csId) => {
    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM cart
         WHERE ?
      `

      dbConnect.query(query, { cs_id: csId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  updateCartByCsId: (csId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE cart
           SET ?
         WHERE cs_id = ${csId}
      `

      dbConnect.query(query, data, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}
