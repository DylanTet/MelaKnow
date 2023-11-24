import * as tf from '@tensorflow/tfjs-node';

export const reqImageClassification = {
    body: tf.tensor([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]).arraySync(),
};
