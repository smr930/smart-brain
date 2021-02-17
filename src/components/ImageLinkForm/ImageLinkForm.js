import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit, isInputBlank }) => {
    return (
        <div>
            <p className="f3 spacer">
                {
                    'This Magic Brain will detect faces in your pictures. Give it a try.'
                }
            </p>
            <div className="yellow f4 spacer">
                {
                    'Sample image: https://portal.clarifai.com/cms-assets/20180320221619/face-006.jpg'
                }
            </div>
            <div className="center spacer">
                <div className="form center pa4 br3 shadow-5">
                    <input
                        className="f3 pa2 w-70 center"
                        type="tex"
                        onChange={onInputChange}
                    />
                    <button
                        className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                        onClick={onPictureSubmit}
                    >
                        Detect
                    </button>
                </div>
            </div>
            {isInputBlank && <p className="input-error">Image url is empty</p>}
        </div>
    );
};

export default ImageLinkForm;
