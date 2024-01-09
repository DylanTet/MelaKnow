import * as tf from '@tensorflow/tfjs-node';
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';

export const predictFromPhoto = () : string | undefined  => {
    try {
        const uri = path.join(process.cwd(), 'src/utils/data/test_image/cancer-test.jpg');
        const imgBuffer = fs.readFileSync(uri);
        const base64Img = imgBuffer.toString("base64");

        const tempFilePath = path.join(process.cwd(), 'temp_image.txt');
        fs.writeFileSync(tempFilePath, base64Img);

        const pythonProcess = spawn('python3', ["-u", "./utils/model.py", tempFilePath]);
        pythonProcess.stdout.on('data', (result) => {
            const output = result.toString();
            console.log("Data received");
            return output;
        })

        pythonProcess.on('exit', (code) => {
            console.log(`Python process exited with code ${code}`);
          });

        pythonProcess.stdin.on('error', (error) => {
            console.error(`Error writing to python process: ${error.message}`)
        })
        
    } catch(err) {
        console.log("There was an error predicting image", err);
        return undefined;
    }
}

export const getPrediction = async (imgBuffer: Uint8Array) => {
    // await tf.ready();
    // const model = await loadModel() as tf.GraphModel
    const prediction = await predictFromPhoto();
    return prediction;
}