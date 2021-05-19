import FFmpegContext from "../context/FFmpegContext";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import React, { useState, useRef, useContext } from "react";

function Mp3CoverExport(): JSX.Element {
  const fileMp3Html = useRef<HTMLInputElement>(null);
  const ffmpeg = useContext<FFmpeg>(FFmpegContext);
 
  const [message, setMessage] = useState("Click Start to Export");
  const [downloadLink, setDownloadLink] = useState("");

//   const getFileExtension = (file: File) => file.name.split(".")[1];

  const getFile = (file: React.RefObject<HTMLInputElement>) => {
    if (file.current && file.current.files && file.current.files.length !== 0) {
      return file.current.files[0];
    } else {
      return null;
    }
  };

  const doExport = async () => {
    setMessage("Loading ffmpeg-core.js");
    if(!ffmpeg.isLoaded()){
      await ffmpeg.load();
    }
    const mp3 = getFile(fileMp3Html);
    if (mp3) {
      ffmpeg.FS(
        "writeFile",
        "test.mp3",
        new Uint8Array(await mp3.arrayBuffer())
      );
      setMessage("Start Export");
      const args = ["-i", "test.mp3", "cover.jpg"];
      await ffmpeg.run(...args);
      setMessage("Complete Export");
      const data = ffmpeg.FS("readFile", "cover.jpg");
      URL.revokeObjectURL(downloadLink);
      setDownloadLink(
        URL.createObjectURL(new Blob([data.buffer], { type: "image/jpeg" }))
      );
    } else {
      setMessage("Can not Export. need file check. 😪");
    }
  };

  return (
    <div>
      <h1>Example 3. Export Image mp3 cover</h1>
      <p />
      <label htmlFor="mp3">mp3 </label>
      <input ref={fileMp3Html} id="mp3" type="file" accept=".mp3" />
      <p />
      <button onClick={doExport}>Start</button>
      <p>{message}</p>
      {downloadLink.length !== 0 && (
        <a href={downloadLink} download="cover.jpg">
          download
        </a>
      )}
    </div>
  );
}

export default Mp3CoverExport;
