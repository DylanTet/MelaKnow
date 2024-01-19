import * as axios from 'axios'
import * as FileSystem from 'expo-file-system';

export const reqFromModelServer = async (photoUri : string) => {
    const ax = new axios.Axios();

    try {
        const data = await FileSystem.readAsStringAsync(photoUri, { encoding: FileSystem.EncodingType.Base64 });
        const photoBuffer = Buffer.from(data, 'base64');
        
        const response = await ax.post('localhost', {
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