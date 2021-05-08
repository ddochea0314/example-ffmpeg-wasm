// original source. https://github.com/ffmpegwasm/react-app
// change typescript(.tsx)

import FFmpegContext from "../context/FFmpegContext";
import { fetchFile, FFmpeg } from "@ffmpeg/ffmpeg";
import { useState, useContext } from "react";

function AviToMp4(): JSX.Element {
  const [videoSrc, setVideoSrc] = useState("");
  const [message, setMessage] = useState("Click Start to transcode");
  const ffmpeg = useContext<FFmpeg>(FFmpegContext);
  
  const doTranscode = async () => {
    setMessage("Loading ffmpeg-core.js");
    if(!ffmpeg.isLoaded()){
      await ffmpeg.load();
    }
    setMessage("Start transcoding");
    ffmpeg.FS("writeFile", "test.avi", await fetchFile("/flame.avi"));
    await ffmpeg.run("-i", "test.avi", "test.mp4");
    setMessage("Complete transcoding");
    const data = ffmpeg.FS("readFile", "test.mp4");
    URL.revokeObjectURL(videoSrc);
    setVideoSrc(
      URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
    );
  };

  return (
    <div>
      <h1>Example 1. Convert avi file to mp4</h1>
      <p />
      <video src={videoSrc} controls></video>
      <br />
      <button onClick={doTranscode}>Start</button>
      <p>{message}</p>
    </div>
  );
}

export default AviToMp4;
