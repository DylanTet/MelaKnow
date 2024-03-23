import express from "express"
import { predictFromPhoto } from "./src/model_services";
import bodyParser from "body-parser";

export const app = express()

app.use(bodyParser.json({ limit: '100mb' }));

app.post('/get-prediction', (req, res) => {
    try {
        const { imgBuffer } = req.body;
        const prediction = predictFromPhoto(imgBuffer)
        console.log(prediction);
        res.status(200).json({ Prediction: prediction });
    } catch(err) {
        console.error('Error processing tensor:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(4000);
