import React, { useState, useEffect } from 'react';
import databaseStore from './Database';
import { Link } from 'react-router-dom';

function Main() {

    const [images, setImages] = useState([]);
    const [isLoaded, setIsLoadedd ] = useState(false);

    useEffect(() => {
        if (isLoaded) {
            return;
        }

        databaseStore((store) => {
            const data = store.getAll();
            data.onsuccess = (event) => {
                let new_images = []
                data.result.forEach(d => {
                        const blob = d.image.file;
                        const url = URL.createObjectURL(blob);
                        new_images.push({id: d.id, image: url, comments: d.comments});
                    }
                );
                setImages(new_images);
                setIsLoadedd(true);
            };
        }); 
    });
    return (
        <div>
            <h2>Main Page</h2>
            <p>Welcome to the Imageboard! there are {images.length} posts available.</p>
            {images.map((img) => (
                <div className='imageboard-img-section'>
                <Link to={`/comments/${img.id}`}>
                <div><img src={img.image} alt='uploaded' className='imageboard-img'></img></div>
                </Link>
                <h3>Comments: {img.comments.length}</h3>
                </div>
            ))}
        </div>
    );
}
export default Main;