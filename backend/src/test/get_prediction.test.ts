import supertest from 'supertest';
import { app } from '../../index';
import createBuffer from '../utils/data/prediction.data';

describe("POST /get-prediction", () => {
    it("should return a estimated number", async () => {
        const testImgBuffer = createBuffer();
         const res = await supertest(app)
            .post('/get-prediction')
            .send({ imgBuffer: testImgBuffer})
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        expect(res.statusCode).toBe(200);
    }, 50000)
})