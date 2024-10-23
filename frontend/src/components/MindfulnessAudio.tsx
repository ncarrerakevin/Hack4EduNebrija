import { useRef, useState, useEffect } from 'react';
import './MindfulnessAudio.css';

const MindfulnessAudio = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showButton, setShowButton] = useState(false); // Nuevo estado para el botón

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handleLoadedMetadata = () => {
                setDuration(audio.duration);
            };

            const handleTimeUpdate = () => {
                setCurrentTime(audio.currentTime);
            };

            const handleAudioEnd = () => {
                setShowButton(true); // Mostrar botón cuando termine el audio
            };

            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('ended', handleAudioEnd); // Escuchar evento 'ended'

            return () => {
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('ended', handleAudioEnd);
            };
        }
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = Number(e.target.value);
            setCurrentTime(audio.currentTime);
        }
    };

    const handleRestart = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = 0;
            setCurrentTime(0);
            setShowButton(false); // Ocultar botón si se reinicia el audio
        }
    };

    const handleEnd = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = duration;
            setCurrentTime(duration);
            setShowButton(true); // Mostrar botón si se adelanta al final
        }
    };

    return (
        <div className="audio-player-container">
            <img src="/assets/Player-Image.png" alt="Meditación Guiada" className="audio-image" />
            <h2>Meditación Guiada</h2>
            <p>Paz interior</p>

            <audio ref={audioRef} src="/assets/meditacionLarga.mp3"></audio>

            <div className="audio-controls">
                <button onClick={handleRestart}>⏪</button>
                <button onClick={togglePlayPause}>{isPlaying ? '⏸️' : '▶️'}</button>
                <button onClick={handleEnd}>⏩</button>
            </div>

            <div className="audio-progress">
                <span>{formatTime(currentTime)}</span>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleTimeChange}
                />
                <span>{formatTime(duration)}</span>
            </div>

            {showButton && (
                <button className="study-button">Empezar a estudiar 📖</button>
            )}
        </div>
    );
};

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default MindfulnessAudio;