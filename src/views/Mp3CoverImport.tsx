import { createFFmpeg } from "@ffmpeg/ffmpeg";
import React, { useState, useRef } from "react";

function Mp3CoverImport(): JSX.Element {
  const fileCoverHtml = useRef<HTMLInputElement>(null);
  const fileMp3Html = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState("Click Start to import");
  const ffmpeg = createFFmpeg({
    log: true,
  });

  const getfileArrayBuffer = async (file : React.RefObject<HTMLInputElement>) => {
    if(file.current && file.current.files && file.current.files.length !== 0) {
        return await file.current.files[0].arrayBuffer();
    }
    else {
        return null;
    }
  }

  const doImport = async () => {
    setMessage("Loading ffmpeg-core.js");
    await ffmpeg.load();
    const png = await getfileArrayBuffer(fileCoverHtml);
    const mp3 = await getfileArrayBuffer(fileMp3Html);
    if(png && mp3){
        ffmpeg.FS("writeFile", "test.png", new Uint8Array(png));
        ffmpeg.FS("writeFile", "test.mp3", new Uint8Array(mp3));
        setMessage("Start Import");
        await ffmpeg.run("-i", "test.mp3", "-i", "test.png", "-c:a", "copy", "-c:v" ,"copy" ,"-map" ,"0:0", "-map", "1:0", "-id3v2_version", "3", "output.mp3");
        setMessage("Complete Import");
        const data = ffmpeg.FS("readFile", "output.mp3");
        console.log(data);
    }
    else {
        setMessage("Can not Import. need file check. 😪");
    }
    // setVideoSrc(
    //   URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
    // );
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
        accept=".png"
      />
      <label htmlFor="mp3">mp3 </label>
      <input ref={fileMp3Html} id="mp3" type="file" accept=".mp3" />
      <p />
      <button onClick={doImport}>Start</button>
      <p>{message}</p>
    </div>
  );
}

export default Mp3CoverImport;
