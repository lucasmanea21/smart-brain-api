import Clarifai from 'clarifai';

const app= new Clarifai.App({
  apiKey: '7494e75d996a4792b9a6517c690889fa'
});

const handleApiCall = (req,res) => {
	app.models
	.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(400).json('unable to work with API'))
}
const handleImage = (req,res,db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries => {
	  	res.json(entries[0]);
	  })
	  .catch(err => res.status(400).json('unable to get entries'))
}

const exports1 = [handleImage,handleApiCall]

export default exports1
