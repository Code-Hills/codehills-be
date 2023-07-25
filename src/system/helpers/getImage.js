export const getImageUrl = (image) => {
  if (!image) {
    return null;
  } else if (image.startsWith("http")) {
    return image;
  }
  return `${process.env.HOST}/uploads/${image}`;
};
