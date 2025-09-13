const getBaseUrl = () => {
  const urls = {
    development: "http://localhost:5000",
    production: "https://book-app-backend-rust.vercel.app/",
  };

  const mode = import.meta.env.MODE; // 'development' or 'production'

  return urls[mode];
};

export default getBaseUrl;
