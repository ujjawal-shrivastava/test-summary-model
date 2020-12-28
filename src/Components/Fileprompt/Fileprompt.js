import React, { useState } from 'react';
import Cancel from '../../Images/cancelLogo/cancel.png';
import axios from 'axios';

const Fileprompt = ({ HandleToggle, GetData }) => {

    const [type, ChangeType] = useState('file');
    const [text, UpdateText] = useState('');
    const [uploadedFile, setUploadedFile] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const HandleChange = (evt) => {
        if (!evt.target.value.trim()) {
            return;
        }
        UpdateText(evt.target.value.trim());
    }

    const HandleSubmit = () => {
        if (type === 'text') {
            console.log(type, ' ', text);
            return GetData({ data: text, type: type });
        }

        if (type === 'file') {
            var formData = new FormData();
            formData.append("file", uploadedFile);
            formData.append("language", "eng");
            formData.append("apikey", "2f7bf18c3f88957");
            formData.append("isOverlayRequired", true);
            axios({
                method: 'post',
                url: 'https://api.ocr.space/parse/image',//'http://localhost:8000/',
                data: formData,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                },
            })
                .then(function (response) {
                    console.log(response.data.ParsedResults[0].ParsedText);
                    setLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
            setLoading(true);
        }
    }

    const OnUpload = (evt) => {
        if (evt.target.files.length && evt.target.files[0]) {
            const file = evt.target.files[0];
            if (file.type === "image/jpeg" || file.type === "image/png") {
                console.log("IMAGE was Uploaded")
            }
            if (file.type === "application/pdf") {
                console.log("PDF was Uploaded")
            }
            setUploadedFile(file)
        }
    }

    return (
        <div className="popup">
            <img src={Cancel} alt="$" onClick={HandleToggle} />
            <ul>
                <li
                    style={{ background: type === 'file' ? 'blue' : 'transparent' }}
                    onClick={() => ChangeType('file')}>File(Pdf/Image)</li>
                <li className='tl'
                    style={{ background: type === 'text' ? 'red' : 'transparent' }}
                    onClick={() => ChangeType('text')}>Raw Text</li>
            </ul>
            {
                type === 'file'
                    ? <div className="fl" style={{ background: "blue" }}>
                        <p>Upload as an Image or as a pdf to get your text scanned.</p>
                        <input type="file" accept="image/jpeg,image/png,application/pdf"
                            onChange={OnUpload} />
                        {
                            loading ? <p>Scanning...</p> : ""
                        }
                    </div>
                    : <div className='txt' style={{ background: "red" }}>
                        <p>Type your text here!</p>
                        <textarea onChange={HandleChange}></textarea>
                    </div>
            }
            <button onClick={HandleSubmit}>Submit</button>
        </div>
    );
}

export default Fileprompt;