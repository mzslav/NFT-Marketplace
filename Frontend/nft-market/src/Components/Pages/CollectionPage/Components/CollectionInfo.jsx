import PropTypes from "prop-types";
import './CollectionInfo.css';

const CollectionInfo = ({ collection }) => {
  const { name, description, creator, nfts } = collection;

  // Визначаємо унікальних власників
  const uniqueOwners = new Set(nfts.map((nft) => nft.owner));

  return (
    <div className="collection-info-container">
      {/* Назва колекції */}
      <h1 className="collection-name-p">{name}</h1>

      {/* Опис колекції та інформація про творця */}
      <div className="creator-info">
        <p><strong>Creator:</strong> {creator}</p>
        <p className="collection-description">{description}</p>
      </div>

      {/* Інпут для пошуку */}
      <input className="input-name" type="text" placeholder="Search by name..." />

      {/* Блок з інформацією про ITEMS, OWNERS, ADDRESSES */}
      <div className="info-block">
        {/* ITEMS */}
        <div className="info-item">
          <p className="info-title">ITEMS : {nfts.length}</p>
          <div className="underline"></div>
        </div>

        {/* OWNERS */}
        <div className="info-item">
          <p className="info-title">OWNERS: {uniqueOwners.size}</p>
          <div className="underline"></div>
        </div>

        {/* ADDRESSES */}
        <div className="info-item">
          <p className="info-title">ADDRESSES: {creator}</p>
          <div className="underline"></div>
        </div>
      </div>
    </div>
  );
};

CollectionInfo.propTypes = {
  collection: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    nfts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default CollectionInfo;
