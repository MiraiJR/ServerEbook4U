const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({ // config mail server
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'truongvanhao159@gmail.com',
        clientId: "1007037731241-f2gqg6soa1l16efclfu62lrg0m7pmsvo.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken: "1//04XQuN_M4WUPACgYIARAAGAQSNwF-L9Ir-uc_G0S-xaA7oCuS2mZ-eOztb8XxOOoblkK8zRYEFDinx6SvUgYfgOwJc8rNufnTKxQ",
    }
})

module.exports = transporter