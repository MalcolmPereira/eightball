import magic8service from "./service.js"

const magic8serviceApp = () => {
    const defaultAppName = "Magic8Ball";
    //User Server App Name
    const appName = process.env.APP_NAME || defaultAppName;
    //User Service API Port
    const appPort = process.env.PORT || 3000; //Default PORT 3000
    magic8service().listen(appPort, () => {
        console.log(`Magic 8 API HTTP listening on port ${appPort}!`);
    });
};

magic8serviceApp();

