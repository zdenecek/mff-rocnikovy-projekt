require('../src/init')

const {registerUser} = require('../src/auth')

registerUser( process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD, 'Admin', 'admin', (err, user) => {
    if (err) {
        console.log(err)
    }
    console.log("Admin user created")
})