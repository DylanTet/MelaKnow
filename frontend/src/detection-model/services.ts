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

const transformPhotoToTensor = async (uri: string) : Promise<Uint8Array> => {
    const img64 = await FileSystem.readAsStringAsync(uri, {encoding:FileSystem.EncodingType.Base64});
    const imgBuffer = tf.util.encodeString(img64, 'base64');
    return imgBuffer;
}

export const getPrediction = async (image: string) => {
    await tf.ready();
    const tensorImg = await transformPhotoToTensor(image);
    // const imgPrediction = await reqFromModelServer(tensorImg);
}