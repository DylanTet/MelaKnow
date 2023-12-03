import * as tf from '@tensorflow/tfjs-node';
import { decodeJpeg } from '@tensorflow/tfjs-node/dist/image';
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

export const predictFromPhoto = async (model: tf.GraphModel, imgBuffer: Uint8Array) : Promise<number[] | undefined>  => {
    try {
        const raw = new Uint8Array(imgBuffer);
        let imgTensor = decodeJpeg(raw);
        const scalar = tf.scalar(255);

        imgTensor = tf.image.resizeNearestNeighbor(imgTensor, [299, 299]);
        const tensorScaled = imgTensor.div(scalar);
        const img = tf.reshape(tensorScaled, [1,299,299,3]);

        let pred = img.squeeze().arraySync() as number[];
        return pred;
    } catch(err) {
        console.log("There was an error predicting image", err);
    }
}

export const getPrediction = async (imgBuffer: Uint8Array) => {
    await tf.ready();
    const model = await loadModel() as tf.GraphModel
    const prediction = await predictFromPhoto(model, imgBuffer);
    console.log(prediction);
    return prediction;
}