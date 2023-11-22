import * as tf from '@tensorflow/tfjs'
import { decodeJpeg } from '@tensorflow/tfjs-react-native'
import * as axios from 'axios'
import * as FileSystem from 'expo-file-system';

const reqFromModelServer = async (tensorImg : tf.Tensor) => {
    try {
        const tensorDataArray = tensorImg.arraySync();

        const ax = new axios.Axios();
        const response = await ax.post('localhost', {
            tensorData: tensorDataArray,
        })
        
        if (response.status === 200) {
            const tensorPrediction = response.data;
            console.log(tensorPrediction);
        }

    } catch (err) {
        console.log('There was an error fetching the model server', err);
    }
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
    const tensorImg = await transformPhotoToTensor(image);
    const imgPrediction = await reqFromModelServer(tensorImg);
}