const handleSignin = (req, res, db, bcrypt) => {
    const {email, password} = req.body
    if (!email || !password) {
        return res.status(400).json('Incorrect form submission')
    }
    db
    .select('email', 'hash')
    .from('login')
    .where('email', '=', req.body.email)
    .then(response => {
        const isValid = bcrypt.compareSync(req.body.password, response[0].hash);
        if(isValid) {
            db.select('*')
            .from('users')
            .where('email', '=', response[0].email)
            .then(user => res.json(user[0]))
        } else {
            res.json('not logged in')
        }
    })
}

module.exports = {
        handleSignin: handleSignin
}