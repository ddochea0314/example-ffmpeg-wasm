import { createContext } from "react";
import { createFFmpeg } from "@ffmpeg/ffmpeg";

export default createContext(
  createFFmpeg({
    log: true,
  })
);
