import React from 'react';

const CollectionImage = ({ imageUrl }) => {
  return (
    <div className="collection-image">
      <img src={imageUrl} alt="Collection" style={{ maxWidth: '100%', maxHeight: '200px' }} />
    </div>
  );
};

export default CollectionImage;