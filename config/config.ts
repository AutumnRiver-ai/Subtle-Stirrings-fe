import devConfig from "./devConfig";
import prodConfig from "./prodConfig";
console.log('hihihi')

const getConfig = () => {
    console.log(process.env.NODE_ENV)
    switch (process.env.NODE_ENV) {
        case "development":
            return devConfig;
        case "production":
            return prodConfig;
        default:
            return devConfig;
    }
};

const config = getConfig();

export default config;