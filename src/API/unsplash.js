import Unsplash from 'API/node_modules/unsplash-js';

const unsplash = new Unsplash({
    accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY
});

export default unsplash;