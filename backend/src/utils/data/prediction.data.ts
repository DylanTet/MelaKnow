import path from 'path'
import { readFileSync } from 'fs';

export default function createBuffer() {
    const uri = path.join(process.cwd(), 'src/utils/data/test_image/cancer-test.jpg');
    const imgBuffer = readFileSync(uri);
    return imgBuffer;
}