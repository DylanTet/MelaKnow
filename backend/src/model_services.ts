import * as tf from '@tensorflow/tfjs-node';
import * as fs from 'fs'
import path from 'path'

export const loadModel = async () : Promise<void | tf.GraphModel> => {
    try {
        const modelJsonPath = path.join(process.cwd(), '/src/model_assets/model.json')
        const handler = tf.io.fileSystem(modelJsonPath)
        const model = await tf.loadGraphModel(handler);
        return model;
    } catch(err) {
        console.log("There was an error loading the model", err);
    }
}

export const predictFromPhoto = async (batch: number, model: tf.GraphModel, imagesTensor: tf.Tensor) : Promise<tf.Tensor[] | undefined> => {
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
    const model = await loadModel() as tf.GraphModel
    const prediction = await predictFromPhoto(1, model, image);
    return prediction;
}