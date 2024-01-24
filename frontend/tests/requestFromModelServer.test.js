import axios from 'axios';
import { reqFromModelServer } from '../src/detection-model/services';
import { EncodingType, readAsStringAsync } from 'expo-file-system';
import { waitFor } from '@testing-library/react-native'

jest.mock('expo-file-system', () => ({
  ...jest.requireActual('expo-file-system'),
  readAsStringAsync: jest.fn(() => Promise.resolve("Mock binary data"))
}))

describe('reqFromModelServer', () => {
  it('returns prediction successfully from server', async() => {
    // Buffer.from = jest.fn(() => {
    //   return Buffer("Mock Binary Data");
    // });

    axios.post = jest.fn(() => {
      return Promise.resolve({
        status: 200,
        data: "Correct prediction"
      })
    });

    await expect(reqFromModelServer('Path to user photo')).resolves.toEqual("Correct prediction");

    await waitFor(() => {
      expect(readAsStringAsync).toHaveBeenCalledWith("Path to user photo", { encoding: EncodingType.Base64 });
      expect(axios.post).toHaveBeenCalled();
    });
  })

  it('returns error from bad request', async() => {

    axios.post = jest.fn(() => Promise.reject({
      response: {
        status: 400,
        data: "Bad request",
      },
    }));

    await expect(reqFromModelServer('Path to user photo')).rejects.toThrow("Error requesting to server");

    await waitFor(() => {
      expect(readAsStringAsync).toHaveBeenCalled();
      expect(axios.post).toHaveBeenCalled();
    });

  })
})

