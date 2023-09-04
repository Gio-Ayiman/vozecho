import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from './Loader';
import NotFound from './NotFound';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';

function Listening() {
    const [audioUrl, setAudioUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedError, setFetchedError] = useState(false);

    const audioRef = useRef(null);
    const [uuid, setUUID] = useState(null);

    const { path } = useParams();
    const LINK_URL = process.env.REACT_APP_URL_LINK;
    const GET_PATH = process.env.REACT_APP_API_URL_AUDIO;
    const LISTEN_PATH = process.env.REACT_APP_LISTENING_COUNT;
    const VISITE_PATH = process.env.REACT_APP_VISITING_COUNT;

    useEffect(() => {
        const audioElement = audioRef.current;
        setIsLoading(true);

        let pathLocal = "";

        if (path.endsWith(".mp3") || path.endsWith(".webm")) {
            setAudioUrl(`${LINK_URL}${path}`);
        } else {
            setUUID(path);
            axios.get(`${GET_PATH}${path}`).then(response => {
                pathLocal = response.data.path;
                setAudioUrl(`${LINK_URL}${pathLocal}`);
            }).catch((err) => {
                setFetchedError(true);
                console.log("Aucun enregistrement trouvé")
            })
        }

        const handleAudio = () => {
            setIsLoading(false);
            audioElement.play();
        };



        if (audioElement != null) {
            audioElement.addEventListener('canplaythrough', handleAudio);
        }

        handleVisite();

        return () => {
            if (audioElement != null)
                audioElement.removeEventListener('canplaythrough', handleAudio);
        }
    }, [path])

    const handlePlay = () => {
        // console.log("Play")
        axios.post(`${LISTEN_PATH}`, { uuid: uuid });
    }

    const handleVisite = () => {
        axios.post(`${VISITE_PATH}`);
    }

    const NotFoundOrLoader = (expression) => {

        if (expression) {
            return <NotFound />
        } else {
            <div className='py-4'>
                <Loader />
            </div>
        }
    }

    return (
        <div className="flex flex-col justify-center items-center p-4">
            <h3 className="text-4xl p-6 text-primary font-skylar">Vocal Record</h3>
            {(isLoading && audioUrl) ? (
                <div>
                    <div className="my-12 md:w-[60vw] lg:w-[40vw] xl:w-[20vw]">
                        <ReactAudioPlayer src={audioUrl} autoPlay controls onPlay={handlePlay} />
                    </div>
                </div>
            ) : (
                NotFoundOrLoader(fetchedError)
            )}

            <Link to="/" className="bg-black text-white font-light rounded-full px-8 py-2" >
                Do my vocal record
            </Link>
        </div>
    );
}

export default Listening;
