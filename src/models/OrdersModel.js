const dbConnect = require('../../config/db.config')

module.exports = {
  createOrders: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO orders
                SET ?
      `

      dbConnect.query(query, data, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  getTransaction: (csId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
          FROM orders
         WHERE ?
      ORDER BY or_id DESC
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
