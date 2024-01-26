import axios from 'axios'
import { readAsStringAsync, EncodingType } from 'expo-file-system';

export const reqFromModelServer = async (photoUri : string) : Promise<string | undefined> => {
    try {
        const data = await readAsStringAsync(photoUri, { encoding: EncodingType.Base64 });
        const photoBuffer = Buffer.from(data, 'base64');
        
        const response = await axios.post('localhost', {
            photoBufferData: photoBuffer,
        })
        
        if (response.status === 200) {
            return response.data;
        };

    } catch (err) {
        const errorMessage = `Error requesting to server: ${err}`;
        throw new Error(errorMessage);        
    }
}