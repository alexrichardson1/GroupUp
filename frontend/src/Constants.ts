const prod = {
  API_URL: "https://group-up-server.herokuapp.com",
};

const local = {
  API_URL: "http://localhost:5000",
};

function getConfig() {
  if (process.env.REACT_APP_NODE_ENV === "production") {
    return prod;
  } else {
    return local;
  }
}

export const config = getConfig();
