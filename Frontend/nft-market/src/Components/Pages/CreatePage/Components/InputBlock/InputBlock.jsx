import { useState } from 'react';
import './InputBlock.css';

const InputBlock = () => {
    // Стейт для збереження вибраного файлу
    const [fileName, setFileName] = useState(null);
    const [nftTitle, setNftTitle] = useState(""); // Стейт для збереження назви NFT

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name); // Оновлюємо стан на ім'я файлу
        }
    };

    const handleTitleChange = (e) => {
        setNftTitle(e.target.value); // Оновлюємо назву NFT
    };

    return (
        <div className="page-content">
            <div className="input-block">
                <h1 className="title-i">CREATE NEW NFT</h1>
                <div className="input-container">
                    {/* Тут будуть майбутні елементи */}
                </div>

                {/* Блок для завантаження фото */}
                <div className="upload-block">
                    <div className="upload-text">Upload File</div>
                    <div className="upload-box">
                        {/* Інпут для вибору файлу з кнопкою для взаємодії */}
                        <input 
                            type="file" 
                            id="file-upload" 
                            style={{ display: 'none' }} 
                            onChange={handleFileInput} 
                        />
                        <div className="upload-button-container">
                            <button 
                                className="upload-button" 
                                onClick={() => document.getElementById('file-upload').click()}
                            >
                                Choose file
                            </button>
                        </div>

                        {/* Якщо файл вибрано, показуємо його ім'я */}
                        {fileName && <div className="file-name">{fileName}</div>}
                    </div>
                    <div className="file-types">PNG, JPEG, WEB, JPG, GIF</div>
                </div>

                {/* Блок для введення назви NFT */}
                <div className="title-block">
                    <div className="title-text">Title</div>
                    <div className="input-border">
                        <input 
                            className="nft-title-input" 
                            type="text" 
                            value={nftTitle} 
                            onChange={handleTitleChange} 
                            placeholder="Enter NFT title"
                        />
                    </div>
              </div>
                <div className="description-block">
                  <div className="title-text">Description</div>
                 <div className="input-border">
                   <input className="nft-description-input" type="text" placeholder="Enter description" />
               </div>
               </div>
               <div className="category-block">
    <div className="title-text">Category</div>
    <div className="input-border">
        <select className="nft-category-select">
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
            <option value="melodrama">Melodrama</option>
            <option value="metal">Metal</option>
        </select>
    </div>
</div>



            </div>
        </div>
    );
};

export default InputBlock;
