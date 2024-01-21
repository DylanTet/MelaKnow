import axios from 'axios';
import { reqFromModelServer } from '../src/detection-model/services';
import MockAdapter from 'axios-mock-adapter';

describe('reqFromModelServer', () => {
  it('returns prediction from server running python model', done => {
    let mock = new MockAdapter(axios);
    mock.onPost('https://localhost:4000/get-prediction').reply(200);

    const testPhotoPath = 
    reqFromModelServer('/Users/dylantettemer/Desktop/projects/MelaKnow/frontend/tests/cancer-test.jpg').then(response => {
      expect(response);
      done();
    })
  })
})

