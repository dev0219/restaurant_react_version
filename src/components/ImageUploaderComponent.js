import React, {useState} from 'react';
import "../styles/imageuploader.css";


const ImageUploaderComponent = ({ src, getImage }) => {

    const [previewImage, setPreviewImage] = useState(src)

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result)
                getImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }
    return (
        <div>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            {previewImage && 
                <div className="preview-div">
                    <img src={previewImage} alt="Preview" />
                </div>
            }
        </div>
    )    
}


export default ImageUploaderComponent;