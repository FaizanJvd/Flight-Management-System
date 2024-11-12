const isLocalStorageAvailable = () =>
  typeof window !== "undefined" && window.localStorage;

export const getAccessToken = () => {
  return isLocalStorageAvailable() ? localStorage.getItem("accessToken") : null;
};

export const setAccessToken = (token: string) => {
  if (isLocalStorageAvailable()) {
    localStorage.setItem("accessToken", token);
  }
};

export const removeAccessToken = () => {
  if (isLocalStorageAvailable()) {
    localStorage.removeItem("accessToken");
  }
};

export const setTokens = (access_token: string) => {
  setAccessToken(access_token);
};

export const removeTokens = () => {
  removeAccessToken();
};

export const getRole = () => {
  return isLocalStorageAvailable() ? localStorage.getItem("role") : null;
};

export const setRole = (token: string) => {
  if (isLocalStorageAvailable()) {
    localStorage.setItem("role", token);
  }
};

export const removeRole = () => {
  if (isLocalStorageAvailable()) {
    localStorage.removeItem("role");
  }
};
export const redirectToLogin = () => {
  if (isLocalStorageAvailable()) {
    window.location.replace("/signin");
  }
};


