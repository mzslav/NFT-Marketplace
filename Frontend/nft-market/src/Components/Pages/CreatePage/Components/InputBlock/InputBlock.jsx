import { useState } from "react";
import PropTypes from "prop-types";
import "./InputBlock.css";
import { collectionData } from "../InputBlock/coll_data"; // Імпортуємо фейкові дані колекцій
import { useEffect } from "react";
import PreviewCard from "../PreviewCard/PreviewCard";

const InputBlock = () => {
  const [fileName, setFileName] = useState(null);
  const [nftTitle, setNftTitle] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [isOnMarketplace, setIsOnMarketplace] = useState(false);

  const [isAuction, setIsAuction] = useState(false);
  const [price, setPrice] = useState("");
  const [auctionEndTime, setAuctionEndTime] = useState("");
  const [selectedCollection, setSelectedCollection] = useState(null); // Стейт для збереження вибраної колекції
  const [newCollectionName, setNewCollectionName] = useState(""); // Стейт для нової назви колекції
  const [newCollectionSymbol, setNewCollectionSymbol] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [calculatedFee, setCalculatedFee] = useState(0);
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result);  // Зберігаємо дані зображення
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleMarketplace = () => {
    setIsOnMarketplace(!isOnMarketplace);
  };

  const handleDescriptionChange = (e) => {
    setNftDescription(e.target.value);
  };

  const handleTitleChange = (e) => {
    setNftTitle(e.target.value);
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
  };

  useEffect(() => {
    if (price) {
      setCalculatedFee(price - price * 0.02); // Вираховуємо 2%
    }
  }, [price]);

  const toggleAuction = () => {
    setIsAuction(!isAuction);
  };

  const handleAuctionEndTimeChange = (e) => {
    setAuctionEndTime(e.target.value);
  };

  const handleCollectionSelect = (collection) => {
    setSelectedCollection(collection);
    if (collection === null) {
      setNewCollectionName("");
      setNewCollectionSymbol(""); // Очистити назву при виборі "Create"
    }
  };

  const handleNewCollectionNameChange = (e) => {
    setNewCollectionName(e.target.value);
  };
  const handleNewCollectionSymbolChange = (e) => {
    setNewCollectionSymbol(e.target.value);
  };

  return (
    <div className="page-content">
                
      <div className="input-block">
        <h1 className="title-i">CREATE NEW NFT</h1>

        {/* Блок для завантаження фото */}
        <div className="upload-block">
          <div className="upload-text">Upload File</div>
          <div className="upload-box">
            <input
              type="file"
              id="file-upload"
              style={{ display: "none" }}
              onChange={handleFileInput}
            />
            <div className="upload-button-container">
              <button
                className="upload-button"
                onClick={() => document.getElementById("file-upload").click()}
              >
                Choose file
              </button>
            </div>
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
            <textarea
              className="nft-description-input"
              value={nftDescription}
              onChange={handleDescriptionChange}
              placeholder="Enter NFT description"
            />
          </div>
        </div>

        <div className="marketplace-block">
          <div className="marketplace-texts">
            <p className="marketplace-title">Put on marketplace</p>
            <p className="marketplace-subtitle">
              Enter to allow users instantly purchase your NFT
            </p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={isOnMarketplace}
              onChange={toggleMarketplace}
            />
            <span className="slider-i round"></span>
          </label>
        </div>

        {isOnMarketplace && (
          <>
            {/* Блок для аукціону */}
            <div className="auction-block">
              <div className="auction-texts">
                <p className="auction-title">Put the item up for auction</p>
                <p className="auction-subtitle">
                  The item will be sold at the end of the auction
                </p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isAuction}
                  onChange={toggleAuction}
                />
                <span className="slider-i round"></span>
              </label>
            </div>

            {/* Блок для введення ціни */}
            <div className="price-block">
              <div className="title-text">
                {isAuction ? "Start price" : "Enter price"}
              </div>
              <div className="input-border">
                <input
                  className="nft-title-input"
                  type="text"
                  value={price}
                  onChange={handlePriceChange}
                  placeholder="Enter price"
                />
              </div>
            </div>

            {isAuction && (
              <div className="auction-end-time-block active">
                <div className="title-text">Date of listing expiration</div>
                <div className="input-border">
                  <input
                    type="datetime-local"
                    value={auctionEndTime}
                    onChange={handleAuctionEndTimeChange}
                    className="nft-auction-end-time-input"
                  />
                </div>
              </div>
            )}
          </>
        )}
        {/* Блок для вибору колекції */}
        <div className="collection-block">
          <div className="title-text">Choose collection</div>
          <div className="collection-container">
            {/* Квадрат для додавання нової колекції */}
            <div
              className="collection-box add-collection"
              onClick={() => handleCollectionSelect(null)} // Для додавання нової колекції
            >
              <div className="plus-sign">+</div>
              <div>Create</div>
            </div>

            {/* Якщо колекція вибрана */}
            {selectedCollection ? (
              <div className="collection-box selected-collection">
                <div className="collection-name">
                  {selectedCollection.title}
                </div>
              </div>
            ) : (
              // Відображення всіх доступних колекцій
              collectionData.map((collection) => (
                <div
                  key={collection.id}
                  className={`collection-box ${
                    selectedCollection &&
                    selectedCollection.id === collection.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleCollectionSelect(collection)}
                >
                  <div className="collection-name">{collection.title}</div>
                </div>
              ))
            )}

            {/* Якщо користувач вибрав додати нову колекцію */}
            {selectedCollection === null && (
              <div className="new-collection-name">
                <div className="input-border">
                  <input
                    className="nft-title-input"
                    type="text"
                    value={newCollectionName}
                    onChange={handleNewCollectionNameChange}
                    placeholder="Enter Collection title"
                  />
                </div>
                <div className="symbol_imput">
                  <div className="input-border">
                    <input
                      className="nft-title-input"
                      type="text"
                      value={newCollectionSymbol}
                      onChange={handleNewCollectionSymbolChange}
                      placeholder="Enter Collection symbol"
                    />
                  </div>
                </div>
              </div>
            )}

            {isOnMarketplace && (
              <>
                <div className="price-container">
                  <div className="price-box">
                    {/* Верхня частина */}
                    <div className="price-header">
                      <span>Price :</span>
                      <span>{price}</span>
                    </div>

                    {/* Комісія */}
                    <div className="price-fee">
                      <span>Reliable fee (2%):</span>
                      <span>{calculatedFee}</span> {/* Показуємо 2% */}
                    </div>

                    {/* Розділяюча лінія */}
                    <div className="divider-line"></div>

                    {/* Нижня частина */}
                    <div className="receiving-amount">
                      <span>You receive:</span>
                      <span>{(price - price * 0.02).toFixed(6)}</span>{" "}
                      {/* Рахуємо скільки отримає користувач */}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          

          <button className="create-btn">Create</button>

        
        </div>
        

      </div>

      <PreviewCard 
          title={nftTitle} 
          
          releaseDate={Date.now}
          price={price} 
          imageUrl={imageFile}  // Передаємо фото
        />
    </div>
  );
};

InputBlock.propTypes = {
    collectionData: PropTypes.array.isRequired,
  };

export default InputBlock;
