const dbConnect = require('../../config/db.config')

const {
  getAllCartByCsId
} = require('../models/CartModel')

const {
  createHis
} = require('../models/HistoryModel')

module.exports = {
  createOrders: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO orders
                SET ?
      `

      dbConnect.query(query, data, async (error, results, _fields) => {
        if (!error) {
          const dataCart = []
          const cart = await getAllCartByCsId(data.cs_id)

          for (let i = 0; i < cart.length; i++) {
            const item = cart[i]

            dataCart[i] = {
              cs_id: item.cs_id,
              or_id: results.insertId,
              ht_product: item.cr_product,
              ht_price: item.cr_price,
              ht_qty: item.cr_qty,
              ht_total: item.cr_total
            }

            await createHis(dataCart)
          }

          console.log(dataCart)

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
