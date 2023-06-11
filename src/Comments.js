import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import databaseStore from './Database';

function Comments() {
    const {id} = useParams();
    const [image, setImage] = useState(null);
    const [comments, setComments] = useState(null);

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [numId, setNumId] = useState(1);

    useEffect(() => {
        if (image && comments) {
            return;
        }
        setNumId(parseInt(id));
        if (isNaN(numId)) {
            return;
        }
        databaseStore((store) => {
            const data = store.get(numId);
            data.onsuccess = (event) => {
                const d = data.result;
                if (!d || !d.image || !d.comments) {
                    return;
                }
                const blob = d.image.file;
                const url = URL.createObjectURL(blob);
                setImage(url);
                setComments(d.comments);
            };
        });
    }, [image, comments, id, numId]);

    const changeName = (event) => {
        setName(event.target.value);
    };

    const changeMessage = (event) => {
        setMessage(event.target.value);
    }

    const sendComment = () => {
        if (name.length === 0) {
            window.alert('Invalid name.');
            return;
        }
        if (message.length === 0) {
            window.alert('Invalid message.');
            return;
        }
        databaseStore((store) => {
            let data = store.get(numId);
            data.onsuccess = (event) => {
                const d = data.result;
                if (!d || !d.image || !d.comments) {
                    window.alert('Failed to add your comment!');
                    return;
                }
                d.comments.push({author: name, content: message});
                console.log(d.comments);
                store.put(d);
                setComments(d.comments);
            };
        });
    };

    return (
        <div>
        {image ? ( 
            <div>
            <div /*className='imageboard-img'*/><img src={image} alt='uploaded'></img></div>
            <div>
                <h1>Leave a comment:</h1>
                <div className='imageboard-form'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" placeholder="Enter your name" onChange={changeName}/>
                </div>
                <div className='imageboard-form'>
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" rows="4" placeholder="Enter your message" onChange={changeMessage}></textarea>
                </div>
                <div>
                    <button id="sendButton" onClick={sendComment}>Send</button>
                </div>
            </div>
            <h1>Comments:</h1>
                <div className='imageboard-comments'>
                {comments.map((comment, index) => (
                    <div key={index} className="comment">
                    <p className="author">Author: {comment.author}</p>
                    <p className="message">Message: {comment.content}</p>
                </div>  
                ))}
                </div>
            </div>
        ) : (<p>Not found!</p>) }
        </div>
    );
}

export default Comments;