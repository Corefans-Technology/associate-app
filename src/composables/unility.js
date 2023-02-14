export const useTruncate = (length, body) => {
  if (!body) return "";
  body = body.toString();
  if (body.length > length) {
    return body.substring(0, length) + "...";
  } else {
    return body;
  }
};

export const formatCurrency = (number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(number);
};

export const createImageUrl = async (file) => {
  /* create a reader */
  const readData = (f) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(f);
    });

  /* Read data */
  const data = await readData(file);

  return data;
};
