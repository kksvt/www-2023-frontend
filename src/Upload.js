import { useNavigate } from 'react-router-dom';
import databaseStore from './Database';

function Upload() {
  const redirect = useNavigate();
  const types = ['image/jpeg', 'image/png', 'image/gif'];

  const fileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        if (!types.includes(file.type)) {
            window.alert('Invalid file type!');
            return;
        }
        if (file) {
            databaseStore((store) => {
                const addRequest = store.add({image: {file}, comments: []});
                addRequest.onsuccess = () => {
                  console.log('Upload successful');
                  redirect('/comments/' + addRequest.result);
                };
            });
        }
  };

  return (
    <div>
      <h2>Create a new image post</h2>
      <p><input type="file" onChange={fileUpload} accept={types.reduce((accumulator, currentValue) => accumulator.concat(', ' + currentValue), '').substring(2)}/></p>
    </div>
  );
}

export default Upload;