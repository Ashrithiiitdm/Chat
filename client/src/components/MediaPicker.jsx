import React from 'react';
import { useDropzone } from 'react-dropzone';
import { LinkSimple } from '@phosphor-icons/react'; // Import your icon component

export default function MediaPicker() {
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*,video/*',
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            console.log(file);
            // Handle file preview and other actions here
        }
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {/* Custom Button to trigger file selection */}
            <button
                className="hover:text-primary"
                {...getRootProps()} // Spread the dropzone props here
            >
                <LinkSimple size={20} />
            </button>

            {/* Hidden file input */}
            <input {...getInputProps()} style={{ display: 'none' }} />

            {/* Optional: You can display a preview of the selected file */}
            {/* Add your preview logic here, if needed */}
        </div>
    );
}
