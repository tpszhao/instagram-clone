import React from "react";

export const photoProps = (photo: any) => {
  const src = photo.urls.regular;
  const color = photo.color;
  const overlayElement = <div>{photo.likes} likes</div>;
  const props = { src, color, overlayElement, key: photo.id };
  return props;
};

export const collectionProps = (collection: any) => {
  const coverPhoto = collection.cover_photo;
  const src = coverPhoto.urls.regular;
  const color = coverPhoto.color;
  const overlayElement = <div>{collection.total_photos} photos</div>;
  const props = { src, color, overlayElement, key: collection.id };
  return props;
};


const getProps:{[key:string]:any;} = {
  photos: photoProps,
  collections: collectionProps,
};

export default getProps;
