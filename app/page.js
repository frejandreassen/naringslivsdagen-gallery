'use client'
import { useEffect, useState } from 'react';
import { fetchImages } from './actions';


// Assuming fetchImages function is defined similarly to previous examples

function HomePage() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Fetch initial list of images on component mount
        async function loadImages() {
            const fetchedImages = await fetchImages();
            setImages(fetchedImages);
            setCurrentIndex(0);
        }

        loadImages();

        // Set up interval for fetching new images periodically
        const intervalId = setInterval(async () => {
            const fetchedImages = await fetchImages();
            setImages(fetchedImages);
        }, 60000); // every 60 seconds

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // Carousel effect to cycle through images every 5 seconds
        const timeoutId = setTimeout(() => {
            setCurrentIndex((currentIndex + 1) % images.length);
        }, 8000);

        return () => clearTimeout(timeoutId);
    }, [currentIndex, images]);

    return (
    <div className="relative flex flex-col items-center justify-center h-screen py-24 bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100">
            {/* QR Code Overlay */}
            <div className="absolute top-0 left-0 hidden md-block md:p-4">
                <div className="flex flex-col items-center">
                    <img src="/qr-code.png" alt="QR Code" className="w-1/2" />
                    <p className="mt-2 text-gray-700 font-bold text-2xl">Scanna för att skapa bild</p>
                </div>
            </div>

            {/* Main Content */}
            {images.length > 0 && (
                <>
                    <img src={images[currentIndex]?.url} alt="Dynamic Image" className="max-w-90 max-h-full rounded-md" />
                    <p className="text-center text-3xl mx-10">{images[currentIndex]?.key.replace(/\.png$/, '')}</p>

                </>
            )}
        </div>
    );
}

export default HomePage;
