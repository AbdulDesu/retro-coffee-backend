const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {
  createAccountModel,
  getAccountByEmailModel,
  loginAccountModel,
  getAccountById,
  updateAccountModel
} = require('../models/AccountModel')

const {
  statusRegistration,
  statusRegistrationFail,
  statusRegistrationUnique,
  statusLogin,
  statusLoginFail,
  statusNotFoundAccount,
  statusServerError,
  statusUpdate,
  statusUpdateFail,
  statusNotFound
} = require('../helpers/status')

module.exports = {
  createAccount: async (req, res, _next) => {
    try {
      const findData = await getAccountByEmailModel(req.body.ac_email)

      if (!findData.length) {
        const result = await createAccountModel(req.body)

        if (result.affectedRows) {
          statusRegistration(res)
        } else {
          statusRegistrationFail(res)
        }
      } else {
        statusRegistrationUnique(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  },
  loginAccount: async (req, res) => {
    try {
      const { email, password } = req.body

      const login = await loginAccountModel(email)

      if (login.length > 0) {
        let peyLoad
        const cekPsw = bcrypt.compareSync(password, login[0].ac_password)
        if (cekPsw) {
          peyLoad = {
            ac_id: login[0].ac_id,
            ac_name: login[0].ac_name,
            ac_email: login[0].ac_email,
            ac_phone: login[0].ac_phone,
            ac_level: login[0].ac_level,
            ac_status: login[0].ac_phone,
            cs_id: login[0].cs_id
          }
          const token = jwt.sign(peyLoad, 'retrocoffee', { expiresIn: '7d' })
          peyLoad = { ...peyLoad, token }
          const result = {
            ...peyLoad,
            token: token
          }
          statusLogin(res, result)
        } else {
          statusLoginFail(res)
        }
      } else {
        statusNotFoundAccount(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },
  updateAccount: async (req, res, _next) => {
    try {
      const { acId } = req.params
      const findData = await getAccountById(acId)

      if (findData.length) {
        const result = await updateAccountModel(acId, req.body)

        if (result.affectedRows) {
          statusUpdate(res)
        } else {
          statusUpdateFail(res)
        }
      } else {
        statusNotFound(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  },

  updateAccountPass: async (req, res, _next) => {
    try {
      const { acId } = req.params
      const findData = await getAccountById(acId)

      if (findData.length) {
        const result = await updateAccountModel(acId, req.body)

        if (result.affectedRows) {
          statusUpdate(res)
        } else {
          statusUpdateFail(res)
        }
      } else {
        statusNotFound(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  }
}
