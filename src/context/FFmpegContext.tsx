import { createContext } from "react";
import { createFFmpeg } from "@ffmpeg/ffmpeg";

export default createContext(
  createFFmpeg({
    log: true,
    corePath: '/ffmpeg-core.js' // corepath 없을 경우 cdn에서 가져옴
  })
);
