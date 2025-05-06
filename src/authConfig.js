export const msalConfig = {
    auth: {
        clientId: "ff1a22a4-17d8-4630-8521-7f7e4e6337dd",
        authority: "https://login.microsoftonline.com/e5df6bf4-0508-404d-86e4-f0958a55e57f",
        redirectUri: "http://localhost:3000"
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false
    }
};

export const loginRequest = {
    scopes:
        ["api://6b641d72-9da5-46fd-bba6-7671e841c9c6//access_as_user"]
};