import { DownloadSimple } from '@phosphor-icons/react';
import React from 'react'

const images = [
    {
        key: 0,
        src: 'https://images.pexels.com/photos/28345214/pexels-photo-28345214/free-photo-of-a-view-of-a-street-in-a-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        key: 1,
        src: 'https://images.pexels.com/photos/28345214/pexels-photo-28345214/free-photo-of-a-view-of-a-street-in-a-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        key: 2,
        src: 'https://images.pexels.com/photos/28345214/pexels-photo-28345214/free-photo-of-a-view-of-a-street-in-a-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        key: 3,
        src: 'https://images.pexels.com/photos/28345214/pexels-photo-28345214/free-photo-of-a-view-of-a-street-in-a-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },

];

export default function Grid(props) {

    const renderImage = () => {
        if (images.length === 1) {
            return <div className='relative col-span-2 row-span-2 rounded-2xl'>
                <img src={images[0].src} className='h-full w-full rounded-lg object-cover object-center ' />
                <button className='absolute top-3 right-4 bg-gray/80 dark:bg-boxdark p-2 rounded-md hover:bg-opacity-70 hover:text-black dark:hover:text-white'>
                    <DownloadSimple size={24} />
                </button>
            </div>
        }
        else if (images.length === 2) {
            return images.map((image) => {
                return (
                    <div className='relative col-span-1 row-span-2 rounded-2xl'>
                        <img src={image.src} className='h-full w-full rounded-lg object-cover object-center ' />
                        <button className='absolute top-3 right-4 bg-gray/80 dark:bg-boxdark p-2 rounded-md hover:bg-opacity-70 hover:text-black dark:hover:text-white'>
                            <DownloadSimple size={24} />
                        </button>
                    </div>
                )
            });
        }
        else if (images.length === 3) {
            return (
                <>
                    {images.slice(0, 2).map((image) => (
                        <div
                            key={image.key}
                            className="col-span-1 row-span-1 relative rounded-2xl"
                        >
                            <img
                                src={image.src}
                                className="h-full w-full rounded-lg object-cover object-center"
                            />
                            <button className="absolute top-3 right-4 bg-gray/80 dark:bg-boxdark p-2 rounded-md hover:bg-opacity-80 hover:cursor-pointer hover:text-black dark:hover:text-white">
                                <DownloadSimple size={20} />
                            </button>
                        </div>
                    ))}
                    <div className="col-span-1 row-span-1 relative rounded-2xl">
                        <img
                            src={images[2].src}
                            className="h-full w-full rounded-lg object-cover object-center"
                        />
                        <button className="absolute top-3 right-4 bg-gray/80 dark:bg-boxdark p-2 rounded-md hover:bg-opacity-80 hover:cursor-pointer hover:text-black dark:hover:text-white">
                            <DownloadSimple size={20} />
                        </button>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    {images.slice(0, 3).map((image) => (
                        <div
                            key={image.key}
                            className="col-span-1 row-span-1 relative rounded-2xl"
                        >
                            <img
                                src={image.src}
                                className="h-full w-full rounded-lg object-cover object-center"
                            />
                            <button className="absolute top-3 right-4 bg-gray/80 dark:bg-boxdark p-2 rounded-md hover:bg-opacity-80 hover:cursor-pointer hover:text-black dark:hover:text-white">
                                <DownloadSimple size={20} />
                            </button>
                        </div>
                    ))}
                    <div className="relative rounded-2xl bg-body/50 flex flex-row items-center justify-center text-xl text-white font-semibold">
                        <div>+{images.length - 3}</div>
                    </div>
                </>
            );
        }

    }

    return (
        <div className={`grid grid-cols-2 grid-rows-2 pt-4 pb-2 gap-3 rounded-2xl rounded-tl-none ${props.incoming ? 'bg-gray dark:bg-boxdark-2' : 'bg-transparent'}`}>
            {renderImage()}
        </div>
    )
}
