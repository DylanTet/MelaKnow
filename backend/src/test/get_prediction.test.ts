import supertest from 'supertest';
import * as App from '../../index';
import { reqImageClassification } from '../utils/data/prediction.data.test';

describe("POST /get-prediction", () => {
    it("should return a estimated number", async () => {
        return supertest(App)
            .post('/get-prediction')
            .set('File', 'Tensor Image')
            .send(reqImageClassification)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    })
})