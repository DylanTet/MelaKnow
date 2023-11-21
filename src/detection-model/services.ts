import * as tf from '@tensorflow/tfjs'
import { io, util } from '@tensorflow/tfjs-core'
import {Asset} from 'expo-asset';
import { Platform } from 'react-native';
import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native'
import * as FileSystem from 'expo-file-system';

const modelJSON = require('./model-assets/model.json');
const modelWeights = require('./model-assets/group1-shard1of1.bin');

class customIOHandler implements io.IOHandler {
    constructor(
        protected readonly modelJson: io.ModelJSON,
        protected readonly modelWeightsId: Array<string|number>) {
            if (modelJson == null || modelWeightsId == null) {
                throw new Error(
                    'Must pass the model json object and the model weights path.'
                );
            }
        }
    
    async load() : Promise<io.ModelArtifacts> {
        const weightAssets = this.modelWeightsId.map(id => Asset.fromModule(id));
        return this.loadLocalAsset(weightAssets);
    }

    loadLocalAsset = async (weights : Asset[]) : Promise<io.ModelArtifacts> => {
        const modelJson = this.modelJson;
        const modelArtifacts: io.ModelArtifacts = Object.assign({}, modelJson);
        modelArtifacts.weightSpecs = modelJson.weightsManifest[0].weights;
        //@ts-ignore
        delete modelArtifacts.weightManifest;
    
        const weightsArray = await Promise.all(weights.map(async (weightAssets) => {
            let base64Weights: string;
            if (Platform.OS === 'android') {
                // On android we get a resource id instead of a regular path. We
                // need to load the weights from the res/raw folder using this id.
                const fileName = `${weightAssets.uri}.${weightAssets.type}`;
                try {
                  const returnedBase64Weights = await FileSystem.readAsStringAsync(fileName)
                  base64Weights = returnedBase64Weights[0];
                } catch (e) {
                  throw new Error(
                      `Error reading resource ${fileName}. Make sure the file is
                in located in the res/raw folder of the bundle`,
                  );
                }
            } else {
                try {
                  const returnedBase64Weights = await FileSystem.readAsStringAsync(weightAssets.uri.split('?')[0])
                  base64Weights = returnedBase64Weights[0];
                } catch (e) {
                  throw new Error(
                      `Error reading resource ${weightAssets.uri.split('?')[0]}.`,
                  );
                }
            }
            const weightData = util.encodeString(base64Weights, 'base64').buffer;
            return weightData;
        }));
    
        modelArtifacts.weightData = io.CompositeArrayBuffer.join(weightsArray);
        console.log(modelArtifacts);
        return modelArtifacts;
    }
}

const customBundleResourceIO = (modelJson: io.ModelJSON, modelWeightsId: number|number[]): io.IOHandler => {
    const modelWeightsIdArr = Array.isArray(modelWeightsId) ? modelWeightsId : [modelWeightsId];
    return new customIOHandler(modelJson, modelWeightsIdArr);
}

const loadModel = async () : Promise<void | tf.LayersModel> => {
    try {
        const model = await tf.loadLayersModel(customBundleResourceIO(modelJSON, modelWeights))
        return model;
    } catch(err) {
        console.log("There was an error loading the model", err);
    }
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