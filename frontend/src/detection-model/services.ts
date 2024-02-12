import { Buffer } from 'buffer'
import axios from 'axios'
import { readAsStringAsync, EncodingType } from 'expo-file-system';

import Constants from "expo-constants";
const uri = Constants?.expoConfig?.hostUri
  ? `${Constants.expoConfig.hostUri.split(`:`)[0]}:4000`
  : `ADD AWS SERVER IP HERE`;

interface PredictionResponse {
    Prediction: string;
}

export const reqFromModelServer = async (photoUri : string) : Promise<PredictionResponse | undefined> => {
    try {
        const data = await readAsStringAsync(photoUri, { encoding: EncodingType.Base64 });
        const photoBuffer = Buffer.from(data, 'base64');
        const response = await axios.post(`http://${uri}/get-prediction`, {
            imgBuffer: photoBuffer,
        });

        if (response.status === 200) {
            return response.data;
        }

    } catch (err) {
        const errorMessage = `Error requesting to server: ${err}`;
        throw new Error(errorMessage);        
    }
}