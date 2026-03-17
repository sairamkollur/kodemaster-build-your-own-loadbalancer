import express from 'express';
import { Config } from './utils/config';

// 1. Load the configuration immediately
Config.load();
const config = Config.getConfig();

const app = express();

app.get('/', (req, res) => {
  res.send('Load Balancer v1.0');
});

// 2. Use the port from the config file
app.listen(config.lbPORT, () => {
  console.log(`🚀 Load Balancer running on port ${config.lbPORT}`);
  console.log(`Algorithm: ${config.lbAlgo}`);
});