import express from "express"
import { getPrediction } from "./src/model_services";
import * as tf from '@tensorflow/tfjs-node'
import bodyParser from "body-parser";

export const app = express()

app.use(bodyParser.json({ limit: '10mb' }));

app.post('/get-prediction', async (req, res) => {
    try {
        const { tensorData } = req.body;
        const dataToTensor = tf.tensor(tensorData);
        const prediction = await getPrediction(dataToTensor);

        if (prediction) {
            const predictionsArray = prediction[0].arraySync;
            res.setHeader('Content-Type', 'application/json');
            res.json({ prediction: predictionsArray });
        } else {
            res.status(400).json({ error: "There was an error with the prediction." })
        }
    } catch(err) {
        console.error('Error processing tensor:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(4000);
