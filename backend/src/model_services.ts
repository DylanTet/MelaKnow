import * as tf from '@tensorflow/tfjs-node';
import path from 'path'
import fs from 'fs';

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

export const predictFromPhoto = async (model: tf.GraphModel) : Promise<tf.Tensor | string | undefined>  => {
    try {
        const uri = path.join(process.cwd(), 'src/utils/data/test_image/cancer-test.jpg');
        const imgBuffer = fs.readFileSync(uri);
        let imgTensor = tf.node.decodeJpeg(imgBuffer, 3);
        const resizedImage = imgTensor.resizeBilinear([299,299]);
        const normalizedImgTensor = resizedImage.toFloat().div(tf.scalar(255));
        const expandedImgTensor = normalizedImgTensor.expandDims(0);

        const prediction = model.predict(expandedImgTensor) as tf.Tensor;
        const string = prediction.arraySync().toString();
        console.log(string)
        return prediction;
    } catch(err) {
        console.log("There was an error predicting image", err);
    }
}

export const getPrediction = async (imgBuffer: Uint8Array) => {
    await tf.ready();
    const model = await loadModel() as tf.GraphModel
    const prediction = await predictFromPhoto(model);
    return prediction;
}