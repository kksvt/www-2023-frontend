function databaseStore(callback) {
    const request = window.indexedDB.open('imageboard_db');

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore('files', { keyPath: 'id', autoIncrement: true });
    };

    request.onerror = (event) => {
        console.error('IndexedDB error: ' + event.target.errorCode);
    };

    request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['files'], 'readwrite');
        const store = transaction.objectStore('files');

        callback(store);

        transaction.oncomplete = () => {
            db.close();
        };
    };
}

export default databaseStore;