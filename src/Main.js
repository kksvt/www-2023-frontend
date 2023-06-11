import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import databaseStore from './Database';
import { Link  } from 'react-router-dom';

function Main() {

    const [images, setImages] = useState([]);
    const [lastIndex, setLastIndex] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const maxItems = 3;

    const updateHash = ((event) => {
        window.location.hash = '#' + event.target.id;
    });

    const loadData = (() => {
        databaseStore((store) => {
            const query = IDBKeyRange.lowerBound(lastIndex, true);
            const data = store.getAll(query, maxItems);
            data.onsuccess = (event) => {
                let new_images = []
                let last = 0;
                data.result.forEach(d => {
                        const blob = d.image.file;
                        const url = URL.createObjectURL(blob);
                        new_images.push({id: d.id, image: url, comments: d.comments});
                        last = d.id;
                    }
                );
                if (new_images.length === 0) {
                    setHasMore(false);
                    return;
                }
                setLastIndex(last);
                setImages([...images, ...new_images]);
            };
        }); 
    });

    useEffect(() => {
        if (window.location.hash && window.location.hash.length > 0) {
            //this works, even though i dont think it should
            let targetElement = document.getElementById(window.location.hash.substring(1));
            if (!targetElement) {
                targetElement = document.getElementById(lastIndex);
            }
            if (targetElement) {
                targetElement.scrollIntoView({behavior: 'smooth'});
            }
        }
        loadData();
    });

    return (
    <div>
      <h2>Main Page</h2>
      <p>Welcome to the Imageboard!</p>
      <InfiniteScroll
        dataLength={images.length}
        next={loadData}
        hasMore={hasMore}
        loader={<h4>Loading more images...</h4>}
        endMessage={<h4>No more images to display.</h4>}
      >
        {images.map((img) => (
                <Link to={`/comments/${img.id}`} key={img.id}>
                <div className='imageboard-img-section'>
                <div><img src={img.image} alt='uploaded' className='imageboard-img' id={img.id} onClick={updateHash} ></img></div>
                <h3>Comments: {img.comments.length}</h3>
                </div>
                </Link>
            ))}
      </InfiniteScroll>
    </div>);
}
export default Main;