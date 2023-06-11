import { useNavigate } from 'react-router-dom';
import databaseStore from './Database';

function Upload() {
  const redirect = useNavigate();

  const fileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const types = ['image/jpeg', 'image/png', 'image/gif'];
        if (!types.includes(file.type)) {
            window.alert('Invalid file type!');
            return;
        }
        if (file) {
            databaseStore((store) => {
                const addRequest = store.add({image: {file}, comments: []});
                addRequest.onsuccess = () => {
                    console.log('Upload successful');
                    redirect('/');
                };
            });
        }
  };

  return (
    <div>
      <h2>Create a new image post</h2>
      <input type="file" onChange={fileUpload} />
    </div>
  );
}

export default Upload;