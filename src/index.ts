import app from "./app.js";
import cfg from "./config.js";

app.listen(cfg.port, cfg.host, () => {
  console.log(`Server running at http://${cfg.host}:${cfg.port}/`);
});
