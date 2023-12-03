import * as tf from '@tensorflow/tfjs-node';

function createBuffer() {
    const buffer = Buffer.alloc(4905199);
    
    for (let i = 0; i < buffer.length; i++) {
        buffer[i] = Math.floor(Math.random() * 256);
    }

    return buffer;
}


export const reqImageClassification = {
    imgBuffer: createBuffer()
};
