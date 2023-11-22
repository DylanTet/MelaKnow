import express from "express"
import { getPrediction } from "./model_services";
import * as tf from '@tensorflow/tfjs'
import bodyParser from "body-parser";

const app = express()

app.use(bodyParser.json());

app.post('/get-prediction', async (req, res) => {
    try {
        const { tensorData } = req.body;
        const dataToTensor = tf.tensor(tensorData);
        const prediction = await getPrediction(dataToTensor);

        if (prediction) {
            const predictionsArray = prediction[0].arraySync;
            res.json({ prediction: predictionsArray });
        }
    } catch(err) {
        console.error('Error processing tensor:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(4000, () => console.log('Server listening on port 4000.'));
