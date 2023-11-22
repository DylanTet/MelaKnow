const fs = require('fs')
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

const modelJSON = require('./model_assets/model.json');
const modelWeights = require('./model_assets/group1-shard1of1.bin');

export const loadModel = async () : Promise<void | tf.LayersModel> => {
    try {
        const model = await tf.loadLayersModel(bundleResourceIO(modelJSON, modelWeights))
        return model;
    } catch(err) {
        console.log("There was an error loading the model", err);
    }
}

export const predictFromPhoto = async (batch: number, model: tf.LayersModel, imagesTensor: tf.Tensor) : Promise<tf.Tensor[] | undefined> => {
    try {
        const predictionData : tf.Tensor = model.predict(imagesTensor) as tf.Tensor;
        let pred = predictionData.split(batch);
        return pred;
    } catch(err) {
        console.log("There was an error predicting image", err);
    }
}

export const getPrediction = async (image: tf.Tensor) => {
    await tf.ready();
    const model = await loadModel() as tf.LayersModel
    const prediction = await predictFromPhoto(1, model, image);
    console.log(prediction);
    return prediction;
}