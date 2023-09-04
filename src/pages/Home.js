import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Loader from './Loader';

function Home() {
    const [recording, setRecording] = useState(false);
    const [timer, setTimer] = useState('03:00');
    const [copied, setCopied] = useState(false);
    const [stream, setStream] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);


    const [redirectUrl, setRedirectUrl] = useState('');
    let [audioId, setAudioId] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [audioBlob, setAudioBlob] = useState(null);
    const [chunks, setChunks] = useState([]);
    const mediaRecorderRef = useRef(null);

    const API_URL = process.env.REACT_APP_API_URL;
    const LISTENING_URL = process.env.REACT_APP_LISTENING_URL;
    const mimetype = { type: process.env.REACT_APP_MIMETYPE };
    const contentType = process.env.REACT_APP_CONTENT_TYPE;

    const SECOND_TIME = process.env.REACT_APP_SECOND_TIME;
    const INTERVAL_TIME = process.env.REACT_APP_INTERVAL_TIME;
    const PREFIX_LINK = process.env.REACT_APP_PREFIX_LINK;

    useEffect(() => {
        let interval;
        if (timer === '00:00') {
            stopRecording();
        } else if (recording) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    const [minutes, seconds] = prevTimer.split(':').map(Number);
                    if (minutes === 0 && seconds === 0) {
                        clearInterval(interval);
                        return prevTimer;
                    }

                    let totalSeconds = minutes * 60 + seconds - 1;
                    const newMinutes = Math.floor(totalSeconds / 60);
                    const newSeconds = totalSeconds % 60;
                    const formattedMinutes = String(newMinutes).padStart(2, '0');
                    const formattedSeconds = String(newSeconds).padStart(2, '0');
                    return `${formattedMinutes}:${formattedSeconds}`;
                });
            }, INTERVAL_TIME);
        }
        return () => {
            clearInterval(interval);
        };
    }, [timer, recording]);

    const startRecording = async () => {
        setIsLoading(false);

        let localChunks = [];
        let mediaStream;

        try {
            mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setStream(mediaStream);
            setCopied(false);
            setRecording(true);
            setTimer('03:00');
        } catch (error) {
            console.error("Not authorized");
            return;
        }

        const mediaRecorder = new MediaRecorder(mediaStream, mimetype);

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorderRef.current.start();
        mediaRecorderRef.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data === 0) return;
            localChunks.push(event.data);
        }
        setChunks(localChunks);

    };

    const stopRecording = async () => {
        setRecording(false);
        setDataLoaded(false)
        if (mediaRecorderRef.current == null || stream == null) return;

        mediaRecorderRef.current.stop();

        const audioTrack = stream.getTracks()[0];
        audioTrack.stop();

        mediaRecorderRef.current.onstop = async () => {
            const audio = new Blob(chunks, mimetype);
            setAudioBlob(audio);
            const formData = new FormData();
            formData.append('attachment', audio, 'recording.mp3');

            setIsLoading(true)
            axios.post(`${API_URL}/audio`, formData, { headers: { 'Content-Type': contentType } })
                .then((response) => {
                    setAudioId(response.data.uuid);
                    setRedirectUrl(`${LISTENING_URL}/${response.data.uuid}`);
                    setIsLoading(false);
                    setDataLoaded(true);
                }).catch((error) => {
                    console.error("Erreur lors de l'envoi de l'enregistrement :", error);
                })
            const audioUrI = URL.createObjectURL(audio);
            setAudioUrl(audioUrI);
            setChunks([]);
        }
    };

    const copyAudioUrl = () => {
        const textField = document.createElement('textarea');
        textField.innerText = PREFIX_LINK + " " + redirectUrl;
        document.body.appendChild(textField);
        textField.select();
        textField.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(textField.value);
        setCopied(true);
        textField.remove();
    };

    /* SUPPRESSION DE L'AUDIO */
    const deleteAudio = () => {
        if (audioId === '') return;
        axios.delete(`${API_URL}/audio/${audioId}`).then(() => {
            setAudioId('');
            setDataLoaded(false);
        }).catch((error) => {
                console.error("Erreur lors de la suppression de l'enregistrement");
        })
    }

    return (
        <div className="flex flex-col justify-center items-center p-4">
            <h3 className="text-4xl p-6 text-primary font-skylar">Vocal Record</h3>
            <button id="startRecordingButton" onClick={recording ? stopRecording : startRecording}>
                <span
                    id="spanIcon"
                    className={`transition-all duration-200 rounded-full w-[125px] h-[125px] flex items-center justify-center ${recording ? 'bg-red-700 shadow-2xl' : 'bg-green-700'
                        } ${audioUrl ? 'mt-0' : 'mt-8'}`}
                >
                    {recording ? (
                        <span id="timer" className="text-4xl text-gray-800 font-semibold">
                            {timer}
                        </span>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-24 h-24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                        </svg>

                    )}
                </span>
            </button>
            {
                isLoading &&
                <div className='h-4 py-4'>
                    <Loader />
                </div>
            }
            {
                (dataLoaded && !recording) &&
                <div className='flex flex-col items-center'>
                    <div className='flex items-center my-2'>
                        <audio controls src={audioUrl}/>

                        <button className='pl-4' onClick={deleteAudio}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 hover:stroke-red-500 transition-alld duration-200">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col items-center mt-4 w-full">
                        <label className="font-semibold">Your audio link:</label>
                        <div className='flex gap-x-1'>
                            <input
                                type="text"
                                value={PREFIX_LINK + " " + redirectUrl}
                                readOnly
                                className="border w-[50vw] border-gray-300 rounded px-2 py-1 mt-2 lg:w-[35vw]"
                            />
                            <button onClick={copyAudioUrl} className="mt-2 py-1 px-4 bg-black text-white rounded">{!copied ? "Copy" : "Copied"}</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Home;
