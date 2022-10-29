const WIDTH = 300;
const HEIGHT = 300;

const canvas: HTMLCanvasElement = document.createElement("canvas");
document.body.append(canvas);
canvas.id = "plane";
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;  // ! at end asserts result not null

// ctx.fillStyle = 'green';
// ctx.fillRect(10, 10, 100, 100);

type Vector4 = [number, number, number, number];

function getIndexForCoord(x: number, y: number, width: number): number {
    return y * (width * 4) + x * 4;
//     return [red, red + 1, red + 2, red + 3];
}

function getRGBA(x: number, y: number, imgData: ImageData): Vector4 {
    const width = imgData.width;
    const index: number = getIndexForCoord(x, y, width);
    let channels: Vector4 = [0, 0, 0, 0];
    for (let i = 0; i<4; i++) channels[i] = imgData.data[index + i];
    // let indices = [0, 0, 0];
    // channels = indices.map((_, idx) => imgData.data[index + idx]) as Vector4;
    return channels;
}

let imgData: ImageData = ctx.createImageData(1, 1);
for (let x = 0; x < 1; x++) {
    for (let y = 0; y < 1; y++) {
        imgData.data[getIndexForCoord(x,y,1)] = 255;  // set red
        imgData.data[getIndexForCoord(x,y,1)+3] = 255;  // set alpha
    }
}
// imgData.data[0] = 255;
ctx.putImageData(imgData, WIDTH/2, HEIGHT/2);
console.log(getRGBA(WIDTH/2, HEIGHT/2, ctx.getImageData(0, 0, WIDTH, HEIGHT)));
