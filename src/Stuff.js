import { useEffect, useState } from "react";

function Stuff() {
    const [quotes, setQuotes] = useState([]);
    const [currentQuote, setCurrentQuote] = useState(0);
    const [rerand, setRerand] = useState(false);

    const irand = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    const newQuote = () => {
        setRerand(!rerand);
    };

    useEffect(() => {
        fetch('quotes.txt')
            .then(response => response.text())
            .then(text => {
                const loaded_quotes = text.split('\n');
                setQuotes(loaded_quotes);
            })
            .catch(error => {
                console.error('Failed to load quotes.txt: ' + error);
            });
    }, []);

    useEffect(() => {
        const rand = irand(0, quotes.length);
        setCurrentQuote(rand);
    }, [rerand, quotes]);

    return (
        <div>
            <h2>Stuff</h2>
            <blockquote><p>{quotes[currentQuote]}</p></blockquote>
            <div><button id='quote' onClick={newQuote}>New quote</button></div>
            <footer><a href='https://github.com/erossignon/qod4outlook/blob/master/quotes.txt'><div className='link'>Quotes source</div></a></footer>
        </div>
    );
}
export default Stuff;