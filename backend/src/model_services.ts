import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';

export const predictFromPhoto = (imgBuffer: Buffer) : Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
        try {
            const base64Img = Buffer.from(imgBuffer).toString("base64");
            const tempFilePath = path.join(process.cwd(), 'temp_image.txt');
            fs.writeFileSync(tempFilePath, base64Img);

            const pythonProcess = spawn('python3', ["-u", "src/utils/model.py", tempFilePath]);
            pythonProcess.stdout.on('data', (result) => {
                const output = result.toString();
                resolve(output);
            })

            pythonProcess.stderr.on('data', (error) => {
                console.log(error.toString());
                reject(error.toString());
            })

            pythonProcess.stdin.on('error', (error) => {
                reject(error.message);
            })
            
        } catch(err) {
            console.log("There was an error predicting image", err);
            reject(err)
        }    
    })
}