import React from "react";

export default function Gifs() {

    const gridRef = React.useRef(null);

    return (
        <div ref={gridRef} className='w-full mt-3'>
            <input type='text' placeholder="Search for a GIF" className='border-stroke rounded-md p-2 w-full mb-2 outline-none'></input>
        </div>
    )
}