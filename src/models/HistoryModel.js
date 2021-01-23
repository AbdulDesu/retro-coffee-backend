const dbConnect = require('../../config/db.config')

module.exports = {
  createHis: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
                INSERT INTO history
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
  getHisByCsId: (csId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
          FROM history
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
  }
}
