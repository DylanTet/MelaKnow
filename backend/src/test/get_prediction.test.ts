import supertest from 'supertest';
import { app } from '../../index';
import { reqImageClassification } from '../utils/data/prediction.data';

describe("POST /get-prediction", () => {
    it("should return a estimated number", async () => {
        return supertest(app)
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