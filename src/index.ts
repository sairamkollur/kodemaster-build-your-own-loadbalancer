import express from 'express';
import { Config } from './utils/config';
import { BackendServerDetails } from './backend-server-details';

// 1. Load Configuration
Config.load();
const config = Config.getConfig();

// 2. Initialize Backend Server Objects
const serverPool: BackendServerDetails[] = config.be_servers.map(
  (server) => new BackendServerDetails(server.domain, server.weight)
);

const app = express();

app.get('/', (req, res) => {
  res.send('Load Balancer v1.0');
});

app.listen(config.lbPORT, () => {
  console.log(`🚀 Load Balancer running on port ${config.lbPORT}`);
  console.log(`Initialized ${serverPool.length} backend servers.`);
});