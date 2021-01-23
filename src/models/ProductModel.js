const dbConnect = require('../../config/db.config')

module.exports = {
  addProductModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
            INSERT INTO product
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

  getAllProductModel: (searchKey, searchValue, limit, offset, callback) => {
    dbConnect.query(`
    SELECT 
    p.pr_id, 
    ct.ct_id, 
    ct.ct_name,
    ct.ct_pic_image,
    p.pr_name, 
    p.pr_price, 
    p.pr_desc,
    p.pr_discount,
    p.pr_discount_price,
    p.pr_is_discount, 
    p.pr_status,
    p.pr_pic_image,
    p.pr_created_at,
    p.pr_updated_at
    FROM product as p
    INNER JOIN category as ct
    ON p.ct_id = ct.ct_id
    WHERE ${searchKey} LIKE '%${searchValue}%' ORDER BY p.pr_id DESC LIMIT ${limit} OFFSET ${offset}`, (err, result, fields) => {
      if (!err) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },

  getProductByIDModel: (prId) => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT 
      p.pr_id, 
      ct.ct_id, 
      ct.ct_name,
      ct.ct_pic_image,
      p.pr_name, 
      p.pr_price, 
      p.pr_desc,
      p.pr_discount,
      p.pr_discount_price,
      p.pr_is_discount, 
      p.pr_status,
      p.pr_pic_image,
      p.pr_created_at,
      p.pr_updated_at
      FROM product as p
      INNER JOIN category as ct
      ON p.ct_id = ct.ct_id
      WHERE ?
      `

      dbConnect.query(query, { pr_id: prId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  getProductByCategoryNameModel: (searchKey, searchValue, limit, offset, callback) => {
    dbConnect.query(`
    SELECT 
    p.pr_id, 
    ct.ct_id, 
    ct.ct_name,
    ct.ct_pic_image,
    p.pr_name, 
    p.pr_price, 
    p.pr_desc,
    p.pr_discount,
    p.pr_discount_price,
    p.pr_is_discount, 
    p.pr_status,
    p.pr_pic_image,
    p.pr_created_at,
    p.pr_updated_at
    FROM product as p
    INNER JOIN category as ct
    ON p.ct_id = ct.ct_id
    WHERE ${searchKey} LIKE '%${searchValue}%' ORDER BY p.pr_id DESC LIMIT ${limit} OFFSET ${offset}`, (err, result, fields) => {
      if (!err) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },

  getProductByHigherModel: (searchKey, searchValue, limit, offset, callback) => {
    dbConnect.query(`
    SELECT 
    p.pr_id, 
    ct.ct_id, 
    ct.ct_name,
    ct.ct_pic_image,
    p.pr_name, 
    p.pr_price, 
    p.pr_desc,
    p.pr_discount,
    p.pr_discount_price,
    p.pr_is_discount, 
    p.pr_status,
    p.pr_pic_image,
    p.pr_created_at,
    p.pr_updated_at
    FROM product as p
    INNER JOIN category as ct
    ON p.ct_id = ct.ct_id
    WHERE ${searchKey} LIKE '%${searchValue}%' ORDER BY p.pr_price DESC LIMIT ${limit} OFFSET ${offset}`, (err, result, fields) => {
      if (!err) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },

  getProductByLowerModel: (searchKey, searchValue, limit, offset, callback) => {
    dbConnect.query(`
    SELECT 
    p.pr_id, 
    ct.ct_id, 
    ct.ct_name,
    ct.ct_pic_image,
    p.pr_name, 
    p.pr_price, 
    p.pr_desc,
    p.pr_discount,
    p.pr_discount_price,
    p.pr_is_discount, 
    p.pr_status,
    p.pr_pic_image,
    p.pr_created_at,
    p.pr_updated_at
    FROM product as p
    INNER JOIN category as ct
    ON p.ct_id = ct.ct_id
    WHERE ${searchKey} LIKE '%${searchValue}%' ORDER BY p.pr_price ASC LIMIT ${limit} OFFSET ${offset}`, (err, result, fields) => {
      if (!err) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },

  updateProductModel: (prId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
          UPDATE 
          product
          SET ? 
          WHERE pr_id = ${prId}
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

  deleteProductModel: (prId) => {
    return new Promise((resolve, reject) => {
      const query = `
          DELETE 
          FROM product
          WHERE ?
          `
      dbConnect.query(query, { pr_id: prId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}
