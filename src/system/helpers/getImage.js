export const getImageUrl = (image) => {
    if (!image) {
      return null;
    }
    return `${process.env.HOST}/uploads/${image}`;
};
