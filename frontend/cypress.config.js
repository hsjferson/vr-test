const { defineConfig } = require('cypress')
const MailosaurClient = require('mailosaur')
//responsavel por capturar o otp na etapada do checkout
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY)

      on('task', {
        async getOtp() {

          const serverId = process.env.MAILOSAUR_SERVER_ID
          const emailAddress = `anything@${serverId}.mailosaur.net`

          console.log('aguardando email...')

          const startTime = new Date(Date.now() - 10000)

          let message = null
          let attempts = 0

          while (!message && attempts < 20) {
            try {

              message = await mailosaur.messages.get(
                serverId,
                { sentTo: emailAddress },
                { receivedAfter: startTime, timeout: 5000 }
              )

            } catch (err) {
            }
            if (!message) {
              await new Promise(r => setTimeout(r, 3000))
              attempts++
              console.log(`Tentativa ${attempts}...`)
            }
          }
          if (!message) {
            throw new Error('Email não chegou a tempo')
          }

          console.log('Email recebido')
          const from = message.from?.[0]?.email || ''

          if (!from.includes('naoresponda@vr.com.br')) {
            throw new Error('email inesperado: ' + from)
          }

          console.log('remetnte:', from)
          const body =
            message.text?.body ||
            message.html?.body ||
            ''
          //extração do otp
          const match = body.match(/(\d{6})/)
          const otp = match ? match[1] : null

          if (!otp) {
            throw new Error('otp não encontrado')
          }

          console.log('otp capturado:', otp)
          return otp
        }

      })
    }
  }
})