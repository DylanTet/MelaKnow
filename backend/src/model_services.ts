import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';

export const predictFromPhoto = (imgBuffer: Buffer) : string | undefined => {
    try {
        const base64Img = Buffer.from(imgBuffer).toString("base64");
        const tempFilePath = path.join(process.cwd(), 'temp_image.txt');
        fs.writeFileSync(tempFilePath, base64Img);

        const pythonProcess = spawn('python3', ["-u", "src/utils/model.py", tempFilePath]);
        pythonProcess.stdout.on('data', (result) => {
            const output = result.toString();
            return output;
        })

        pythonProcess.stderr.on('data', (error) => {
            console.log(error.toString());
            return error.toString();
        })

        pythonProcess.stdin.on('error', (error) => {
            return error.message;
        })
        
    } catch(err) {
        console.log("There was an error predicting image", err);
        return err as string;
    }    
}
