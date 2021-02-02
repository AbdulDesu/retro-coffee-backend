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

  getAllCartByCsId: (csId) => {
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

  getCartByCrId: (crId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
          FROM cart
         WHERE ?
      `

      dbConnect.query(query, { cr_id: crId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  getCartByNameId: (csId, crProduct) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
          FROM cart
         WHERE cs_id = ${csId}
           AND cr_product = "${crProduct}"
      `

      dbConnect.query(query, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  deleteCartByCrId: (crId) => {
    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM cart
         WHERE ?
      `

      dbConnect.query(query, { cr_id: crId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  updateCartByCrId: (crId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE cart
           SET ?
         WHERE cr_id = ${crId}
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
