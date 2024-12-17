import { Pause, Play } from '@phosphor-icons/react';
import React from 'react'
import { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

export default function AudioWave(props) {

    const waveRef = useRef(null);
    const [wave, setWave] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');


    useEffect(() => {
        if (waveRef.current) {
            const waveSurfer = WaveSurfer.create({
                container: waveRef.current,
                waveColor: '#3c50e0',
                progressColor: '#80caee',
                url: props.src,
                //Rendering function left
            });
            waveSurfer.on('ready', () => {
                const totalDuration = waveSurfer.getDuration();
                setDuration(handleTime(totalDuration));
            });

            waveSurfer.on('audioprocess', () => {
                const currentTime = waveSurfer.getCurrentTime();
                setTime(handleTime(currentTime));
            });

            waveSurfer.on('finish', () => {
                setIsPlaying(false);
                setTime(handleTime(0));
            });

            setWave(waveSurfer);
            return () => {
                waveSurfer.destroy();
            }
        }
    }, [])

    const handleTime = (time) => {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    }

    const handlePlay = () => {
        if (wave) {
            if (isPlaying) {
                wave.pause();
            }
            else {
                wave.play();
            }
            setIsPlaying((prev) => !prev);
        }
    }

    return (
        <div className={`flex flex-row items-center space-x-6 p-2 rounded-md ${!props.incoming ? 'bg-transparent' : 'bg-gray-3 dark:bg-boxdark'}`}>
            <button onClick={handlePlay} className='bg-gray dark:bg-boxdark-2 rounded-full h-18 w-18 flex items-center justify-center shadow-2'>
                {isPlaying ? <Pause size={24} weight='bold' /> : <Play size={24} weight='bold' />}
            </button>
            <div className='grow flex flex-col space-y-1'>
                <div className='w-full !z-0' ref={waveRef} style={{ overflow: 'hidden' }}>

                </div>
                <div className='text-sm'>
                    <p>{time} / {duration}</p>
                </div>
            </div>
        </div>
    )
}
