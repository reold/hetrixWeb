import { useEffect, useState } from "preact/hooks";

import { eel } from "../../../eel";

export default function Preview() {
  const [frameNo, setFrameNo] = useState(0);

  useEffect(() => {
    let canvas = document.getElementById("previewcanvas");
    let ctx = canvas.getContext("2d");
    // clear screen
    // ctx.clearRect(0, 0, 400, 200);

    eel.get_image({ frame: frameNo, size: [200, 100] })((img) => {
      console.log(JSON.stringify(img));
      img.forEach((row, row_i) => {
        row.forEach((pixel, pixel_i) => {
          ctx.fillStyle = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
          ctx.fillRect(pixel_i * 2, row_i * 2, 2, 2);
        });
      });
    });
    // setFrameNo(frameNo + 1);
  }, [frameNo]);

  return (
    <div class="flex flex-col w-full h-[60%] bg-gray-400 text-white text-center">
      <div class="flex flex-col justify-center items-center bg-gray-500 h-1/2 w-full">
        <div class="flex flex-col justify-center items-center bg-gray-700 h-[300px] w-[660px]">
          <canvas
            className="border-2 border-red-500 border-solid"
            id={"previewcanvas"}
            height={200}
            width={400}
          >
            <p>
              Your broswer doesn't support Canvas Rendering, so the preview
              isn't rendering.
            </p>
          </canvas>
        </div>
      </div>
      <div>
        <p>Video controls are currently not available.</p>
      </div>
    </div>
  );
}
