import { useState } from "react";
import { uploadFile } from '../utils/uploadFile'

const dummy = 'test';

const TestPage = () => {
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };
  return (
    <div className="TestPage">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={() => uploadFile(file)}>Upload</button>
      </div>
    </div>
  );
}

export default TestPage;