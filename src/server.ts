import App from "./App";

const APP_PORT = 5000;

App.listen(process.env.PORT || APP_PORT, () => {
  console.log(`⚡ server is running`);
});
