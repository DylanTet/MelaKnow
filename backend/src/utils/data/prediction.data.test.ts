import * as tf from '@tensorflow/tfjs-node';

export const reqImageClassification = {
    tensorData: tf.zeros([1, 299, 299, 3]).arraySync(),
};
