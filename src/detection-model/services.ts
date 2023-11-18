import * as tf from '@tensorflow/tfjs'
import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native'
import * as FileSystem from 'expo-file-system';

const loadModel = async () : Promise<void | tf.LayersModel> => {
    const modelJSON = require('./model-assets/model.json');
    const modelWeights = await require('./model-assets/group1-shard1of1.bin');

    if (!modelJSON || !modelWeights) {
        throw new Error("Failed to load the model files required.")
    }

    const model = await tf.loadLayersModel(
        bundleResourceIO(modelJSON, modelWeights)
        
    ).then((m) => {
        return m
    }).catch((err) => console.log('There was an error loading the model', err))
}

const predictFromPhoto = async (batch: number, model: tf.LayersModel, imagesTensor: tf.Tensor<tf.Rank>) : Promise<tf.Tensor<tf.Rank>[]> => {
    const predictionData : tf.Tensor = model.predict(imagesTensor) as tf.Tensor;
    let pred = predictionData.split(batch);
    return pred;
}

const transformPhotoToTensor = async (uri: string) : Promise<tf.Tensor> => {
    const img64 = await FileSystem.readAsStringAsync(uri, {encoding:FileSystem.EncodingType.Base64});
    const imgBuffer = tf.util.encodeString(img64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);
    let imgTensor = decodeJpeg(raw);
    const scalar = tf.scalar(255);

    imgTensor = tf.image.resizeNearestNeighbor(imgTensor, [299, 299]);
    const tensorScaled = imgTensor.div(scalar);
    const img = tf.reshape(tensorScaled, [1,299,299,3]);
    return img;
}

export const getPrediction = async (image: string) => {
    await tf.ready();
    const model = await loadModel() as tf.LayersModel
    const tensor_img = await transformPhotoToTensor(image);
    const prediction = await predictFromPhoto(1, model, tensor_img);
    console.log(prediction);
    return prediction;
}