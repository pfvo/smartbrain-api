const handleProfile = (req, res, db) => {
    return db.select('*').from('users').where({
    id: req.params.id
    })
    .then(user => {
        user.length
        ? res.json(user[0])
        : res.status(400).json('user not found')
    })
    .catch(err => res.status(400).json('Error Getting User'))

}

module.exports = {
    handleProfile: handleProfile
}