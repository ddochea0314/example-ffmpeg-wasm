import FFmpegContext from "../context/FFmpegContext";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import React, { useState, useRef, useContext } from "react";

function Mp3CoverImport(): JSX.Element {
  const fileCoverHtml = useRef<HTMLInputElement>(null);
  const fileMp3Html = useRef<HTMLInputElement>(null);
  const ffmpeg = useContext<FFmpeg>(FFmpegContext);
 
  const [message, setMessage] = useState("Click Start to import");
  const [downloadLink, setDownloadLink] = useState("");

  const getFileExtension = (file: File) => file.name.split(".")[1];

  const getFile = (file: React.RefObject<HTMLInputElement>) => {
    if (file.current && file.current.files && file.current.files.length !== 0) {
      return file.current.files[0];
    } else {
      return null;
    }
  };

  const doImport = async () => {
    setMessage("Loading ffmpeg-core.js");
    if(!ffmpeg.isLoaded()){
      await ffmpeg.load();
    }
    const cover = getFile(fileCoverHtml);
    const mp3 = getFile(fileMp3Html);
    if (cover && mp3) {
      const coverName = `test.${getFileExtension(cover)}`;
      ffmpeg.FS(
        "writeFile",
        coverName,
        new Uint8Array(await cover.arrayBuffer())
      );
      ffmpeg.FS(
        "writeFile",
        "test.mp3",
        new Uint8Array(await mp3.arrayBuffer())
      );
      setMessage("Start Import");
      const args = [
        "-i",
        "test.mp3",
        "-i",
        coverName,
        "-c:a",
        "copy",
        "-c:v",
        "copy",
        "-map",
        "0:0",
        "-map",
        "1:0",
        "-id3v2_version",
        "3",
        "output.mp3",
      ]; // must split
      await ffmpeg.run(...args);
      setMessage("Complete Import");
      const data = ffmpeg.FS("readFile", "output.mp3");
      URL.revokeObjectURL(downloadLink);
      setDownloadLink(
        URL.createObjectURL(new Blob([data.buffer], { type: "audio/mp3" }))
      );
    } else {
      setMessage("Can not Import. need file check. 😪");
    }
  };

  return (
    <div>
      <h1>Example 2. Import Image mp3 cover</h1>
      <p />
      <label htmlFor="img">image </label>
      <input
        ref={fileCoverHtml}
        id="img"
        type="file"
        accept=".png,.jpg,.jpeg"
      />
      <label htmlFor="mp3">mp3 </label>
      <input ref={fileMp3Html} id="mp3" type="file" accept=".mp3" />
      <p />
      <button onClick={doImport}>Start</button>
      <p>{message}</p>
      {downloadLink.length !== 0 && (
        <a href={downloadLink} download="result.mp3">
          download
        </a>
      )}
    </div>
  );
}

export default Mp3CoverImport;
