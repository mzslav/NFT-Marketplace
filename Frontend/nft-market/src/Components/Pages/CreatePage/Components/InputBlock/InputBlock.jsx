import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./InputBlock.css";
import PreviewCard from "../PreviewCard/PreviewCard";

const InputBlock = ({ userAddress }) => {
  const [nftTitle, setNftTitle] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [isOnMarketplace, setIsOnMarketplace] = useState(false);
  const [isAuction, setIsAuction] = useState(false);
  const [price, setPrice] = useState("");
  const [auctionEndTime, setAuctionEndTime] = useState("");
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionSymbol, setNewCollectionSymbol] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await fetch("http://localhost:3500/collections", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        if (response.ok) {
          setCollections(result.map(item => ({
            ...item,
            name: item.collection?.name || "Unnamed Collection",
          })));
        } else {
          console.error("Failed to fetch collections:", result.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCollections();
  }, []);

  const generateRandomAddress = () => {
    return "0x" + Math.random().toString(36).substring(2, 42);
  };

  const blockchainAddress = userAddress || generateRandomAddress();

  const toggleMarketplace = () => {
    setIsOnMarketplace(!isOnMarketplace);
  };

  const toggleAuction = () => {
    setIsAuction(!isAuction);
  };

  const handleCollectionSelect = (collection) => {
    console.log("Selected collection:", collection); // Виводимо колекцію для перевірки
    setSelectedCollection(collection);
  
    // Перевіряємо, чи є в колекції поле collectionId
    if (collection && collection.collection && collection.collection.collectionId) {
      console.log("Selected collection ID:", collection.collection.collectionId); // Виводимо collectionId
    }
  
    if (collection === null) {
      setNewCollectionName("");
      setNewCollectionSymbol("");
    }
  };
  
  
  
  
  const handleCreate = async () => {
    const nftData = {
      title: nftTitle,
      description: nftDescription,
      imageUrl,
      blockchainAddress,
      NftStatus: "created", // Встановлюємо статус "created" за замовчуванням
    };
  
    console.log("NFT Data being sent:", nftData);
  
    // Перевірка, чи вибрана колекція або введена нова
    if (!selectedCollection && !newCollectionName) {
      alert("Please select or create a collection.");
      return;
    }
  
    // Якщо вибрана колекція, додаємо її collectionId
    if (selectedCollection && selectedCollection.collection) {
      if (selectedCollection.collection.collectionId) {
        nftData.collectionId = selectedCollection.collection.collectionId; // Передаємо collectionId існуючої колекції
        console.log("Selected Collection ID:", selectedCollection.collection.collectionId);
      } else {
        alert("Selected collection does not have a valid collectionId.");
        return;
      }
    } else {
      // Якщо створюється нова колекція, передаємо її назву та символ
      if (newCollectionName) {
        nftData.collectionName = newCollectionName; // Передаємо назву нової колекції
        nftData.collectionSymbol = newCollectionSymbol; // Передаємо символ нової колекції
      }
    }
  
    // Статус NFT в залежності від того, чи на ринку чи на аукціоні
    if (!isOnMarketplace) {
      nftData.NftStatus = "created";
    } else if (isAuction) {
      nftData.NftStatus = "on auction";
      nftData.isAuctioned = true;
      nftData.price = parseFloat(price);
      nftData.auctionEndTime = auctionEndTime;
    } else {
      nftData.NftStatus = "on sale";
      nftData.isAuctioned = false;
      nftData.price = parseFloat(price);
    }
  
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:3500/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nftData),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log("NFT created successfully:", result);
        alert("NFT created successfully!");
      } else {
        console.error("Error creating NFT:", result.message);
        alert("Failed to create NFT: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the NFT.");
    }
  };
  
  
  

  return (
    <div className="page-content">
      <div className="input-block">
        <h1 className="title-i">CREATE NEW NFT</h1>

        <div className="upload-block">
          <div className="upload-text">Image URL</div>
          <div className="input-border">
            <input
              className="nft-title-input"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
            />
          </div>
        </div>

        <div className="title-block">
          <div className="title-text">Title</div>
          <div className="input-border">
            <input
              className="nft-title-input"
              type="text"
              value={nftTitle}
              onChange={(e) => setNftTitle(e.target.value)}
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
              onChange={(e) => setNftDescription(e.target.value)}
              placeholder="Enter NFT description"
            />
          </div>
        </div>

        <div className="marketplace-block">
          <div className="marketplace-texts">
            <p className="marketplace-title">Put on marketplace</p>
            <p className="marketplace-subtitle">
              Enter to allow users to instantly purchase your NFT
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

            <div className="price-block">
              <div className="title-text">
                {isAuction ? "Start price" : "Enter price"}
              </div>
              <div className="input-border">
                <input
                  className="nft-title-input"
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
                    onChange={(e) => setAuctionEndTime(e.target.value)}
                    className="nft-auction-end-time-input"
                  />
                </div>
              </div>
            )}
          </>
        )}

<div className="collection-block">
  <div className="title-text">Choose collection</div>
  <div className="collection-container">
    {selectedCollection ? (
      <div className="selected-collection">
        <div className="collection-name">{selectedCollection.name}</div>
        <button
          className="change-collection-btn"
          onClick={() => setSelectedCollection(null)} // Дозволяє змінити вибір
        >
          Change
        </button>
      </div>
    ) : (
      <>
        <div
          className="collection-box add-collection"
          onClick={() => handleCollectionSelect(null)} // Для створення нової колекції
        >
          <div className="plus-sign">+</div>
          <div>Create</div>
        </div>

        {collections.map((collection) => (
          <div
            key={collection._id} // Важливо, щоб це був унікальний ідентифікатор колекції
            className="collection-box"
            onClick={() => handleCollectionSelect(collection)} // Вибір існуючої колекції
          >
            <div className="collection-name">{collection.name}</div>
          </div>
        ))}
      </>
    )}

    {selectedCollection === null && (
      <div className="new-collection-name">
        <div className="input-border">
          <input
            className="nft-title-input"
            type="text"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="Enter Collection title"
          />
        </div>
        <div className="symbol_imput">
          <div className="input-border">
            <input
              className="nft-title-input"
              type="text"
              value={newCollectionSymbol}
              onChange={(e) => setNewCollectionSymbol(e.target.value)}
              placeholder="Enter Collection symbol"
            />
          </div>
        </div>
      </div>
    )}
  </div>
</div>


        <button className="create-btn" onClick={handleCreate}>
          Create
        </button>
      </div>

      <PreviewCard
        title={nftTitle}
        releaseDate={Date.now()}
        price={price}
        imageUrl={imageUrl}
      />
    </div>
  );
};

InputBlock.propTypes = {
  userAddress: PropTypes.string.isRequired,
};

export default InputBlock;
