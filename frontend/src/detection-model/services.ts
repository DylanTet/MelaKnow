import axios from 'axios'
import { readAsStringAsync, EncodingType } from 'expo-file-system';

export const reqFromModelServer = async (photoUri : string) => {
    try {
        const data = await readAsStringAsync(photoUri, { encoding: EncodingType.Base64 });
        const photoBuffer = Buffer.from(data, 'base64');
        
        const response = await axios.post('localhost', {
            tensorData: photoBuffer,
        })
        
        if (response.status === 200) {
            const tensorPrediction = response.data;
            console.log(tensorPrediction);
        }

    } catch (err) {
        console.log('There was an error fetching the model server', err);
    }
}