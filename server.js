// server.js  --  minimal proxy that forwards an audio blob to Ollama Whisper

import express from "express";
import multer  from "multer";
import fetch   from "node-fetch";

const upload = multer();
const app     = express();

app.post("/stt", upload.single("audio"), async (req, res) => {
    try {
        const resp = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "dimavz/whisper-tiny",   // or any local Whisper model
                stream: false,
                audio: req.file.buffer.toString("base64"),
            }),
        });
        const json = await resp.json();
        res.json(json);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

app.listen(3333, () => console.log("STT proxy listening on :3333"));