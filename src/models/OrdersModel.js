const dbConnect = require('../../config/db.config')

const {
  getAllCartByCsId,
  deleteCartByCrId
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
              ht_total: item.cr_total,
              ht_pic_image: item.cr_pic_image
            }

            if (await createHis(dataCart[i])) {
              await deleteCartByCrId(item.cr_id)
            }
          }

          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  getTransactionCustomer: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
          FROM orders
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
  },

  getTransactionById: (csId, orId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
          FROM orders
         WHERE cs_id = ${csId}
           AND or_id = ${orId}
      ORDER BY or_id DESC
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

  updateOrdersStatus: (csId, orId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
          UPDATE orders
             SET ?
           WHERE cs_id = ${csId}
             AND or_id = ${orId}
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
  }
}
