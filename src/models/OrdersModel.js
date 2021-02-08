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

  getAllOrder: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
          FROM orders
      ORDER BY or_id DESC
      `

      dbConnect.query(query, (error, results, _fields) => {
        if (!error) {
          const data = []

          for (let i = 0; i < results.length; i++) {
            const item = results[i]

            data[i] = {
              or_id: item.or_id,
              cs_id: item.cs_id,
              or_pay_total: item.or_pay_total,
              or_address: item.or_address,
              or_latitude: item.or_latitude,
              or_longitude: item.or_longitude,
              or_status: item.or_status,
              or_note_cancel: item.or_note_cancel,
              or_note_approve: item.or_note_approve,
              or_method_payment: item.or_method_payment,
              or_fee: item.or_fee,
              or_date_order: item.or_date_order
            }
          }

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
