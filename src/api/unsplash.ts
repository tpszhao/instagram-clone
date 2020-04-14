import Unsplash from "unsplash-js";

declare var process: {
  env: {
    REACT_APP_UNSPLASH_ACCESS_KEY: string;
  };
};

const unsplashWrapper = new Unsplash({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
});

interface UnsplashWrapper {
  [key: string]: any | { [key: string]: any };
}

const unsplash: UnsplashWrapper = unsplashWrapper;

export default unsplash;
