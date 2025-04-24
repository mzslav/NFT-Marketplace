import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NFTDetails from "./Components/NFTDetails/NFTDetails";
import NFTSlider from "./Components/NFTSlider/NFTSlider";
import Header from "../../Header/Header";

const NFTPage = () => {
  const { id } = useParams(); 
  const [nft, setNft] = useState(null);
  const [collectionNFTs, setCollectionNFTs] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchNftAndCollection = async () => {
      try {
        const nftResponse = await axios.get(`http://localhost:3500/nft/${id}`); 
        console.log("NFT Response:", nftResponse.data); 
        if (nftResponse.data.success) {
          const nftData = nftResponse.data.data;
          setNft(nftData);

          const collectionResponse = await axios.get(
            `http://localhost:3500/collections/${nftData.collectionId}`
          );
          console.log("Collection Response:", collectionResponse.data); 
          if (collectionResponse.data) {
            setCollectionNFTs(collectionResponse.data.nfts);
          }
        } else {
          setError("NFT not found");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false); 
      }
    };

    fetchNftAndCollection();
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  const handleBuyClick = () => {
    alert(
      `You have ${
        nft.NftStatus === "on auction" ? "placed a bid" : "bought"
      } on ${nft.title}!`
    );
  };

  return (
    <div className="nft-page">
      <Header />
      <NFTDetails
        title={nft.title}
        price={`${nft.price} ETH`}
        imageUrl={nft.imageUrl}
        owner={nft.owner ? nft.owner.username : "Unknown"}
        creator={nft.creatorId ? nft.creatorId.username : "Unknown"}
        description={nft.description}
        isAuction={nft.NftStatus === "on auction"}
        onBuyClick={handleBuyClick}
        collectionName={nft.collectionName || "Unknown"}
        collectionId={nft.collectionId}
      />

      <NFTSlider
        collectionNFTs={collectionNFTs}
        currentCollectionId={nft.collectionId}
      />
    </div>
  );
};

export default NFTPage;