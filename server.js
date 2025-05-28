const http = require('http');
const app = './app';
require('dotenv').config();
require('./config/databaseConnection')

const server = http.createServer(require(app));

const PORT = process.env.PORT || 5500;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});