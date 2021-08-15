interface API {
  API_URL: string;
}

const prod: API = {
  API_URL: "https://group-up-server.herokuapp.com",
};

const local: API = {
  API_URL: "http://localhost:5000",
};

function getConfig(): API {
  if (process.env.REACT_APP_NODE_ENV === "production") {
    return prod;
  } else {
    return local;
  }
}

export const config = getConfig();
