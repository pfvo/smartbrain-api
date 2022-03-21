const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey:'88558e72ac7e4dd6a1a1e736ff83a095'
  });
  

const handleImage = (db) => (req, res) => {
    return db('users')
    .where('id', '=', req.body.id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0].entries))
}

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })    
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}