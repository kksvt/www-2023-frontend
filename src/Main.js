import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import databaseStore from './Database';
import { Link  } from 'react-router-dom';

function Main() {

    const [images, setImages] = useState([]);
    const [isLoaded, setIsLoadedd ] = useState(false);
    const [lastIndex, setLastIndex] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    //const [isScrolled, setIsScrolled] = useState(false);
    const maxItems = 3;

    const updateHash = ((event) => {
        //setIsScrolled(false);
        //window.location.hash = '#' + window.scrollY;
    });

    const loadData = (() => {
        databaseStore((store) => {
            const query = IDBKeyRange.lowerBound(lastIndex, true);
            const data = store.getAll(query, maxItems);
            data.onsuccess = (event) => {
                let new_images = []
                data.result.forEach(d => {
                        const blob = d.image.file;
                        const url = URL.createObjectURL(blob);
                        new_images.push({id: d.id, image: url, comments: d.comments});
                        setLastIndex(d.id);
                    }
                );
                if (new_images.length === 0) {
                    setHasMore(false);
                    return;
                }
                setImages([...images, ...new_images]);
            };
        }); 
    });

    useEffect(() => {
        /*if (!isScrolled) {
            const destY = parseInt(window.location.hash.substring(1))
            if (isNaN(destY)) {
                setIsScrolled(true);
                return;
            }
            window.scrollTo(window.scrollX, destY);
            if (window.scrollY === destY) {
                setIsScrolled(true);
            }
        }*/
        if (isLoaded) {
            return;
        }
        loadData();
        setIsLoadedd(true);
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