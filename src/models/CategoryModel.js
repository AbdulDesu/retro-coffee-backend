const dbConnect = require('../../config/db.config')

module.exports = {
  addCategoryModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
            INSERT INTO category
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

  getAllCategoryModel: () => {
    return new Promise((resolve, reject) => {
      const query = `
            SELECT * FROM category ORDER BY RAND()
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

  getCategoryByIDModel: (ctId) => {
    return new Promise((resolve, reject) => {
      const query = `
          SELECT *
          FROM category
          WHERE ?
          `
      dbConnect.query(query, { ct_id: ctId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  updateCategoryModel: (ctId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
          UPDATE 
          category
          SET ? 
          WHERE ct_id = ${ctId}
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

  deleteCategoryModel: (ctId) => {
    return new Promise((resolve, reject) => {
      const query = `
          DELETE 
          FROM category
          WHERE ?
          `
      dbConnect.query(query, { ct_id: ctId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}
