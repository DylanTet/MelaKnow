import supertest from 'supertest';
import { app } from '../../index';
import { reqImageClassification } from '../utils/data/prediction.data';

describe("POST /get-prediction", () => {
    it("should return a estimated number", async () => {
         const res = await supertest(app)
            .post('/get-prediction')
            .send({ imgTensor: reqImageClassification })
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        expect(res.statusCode).toBe(200);
    }, 50000)
})