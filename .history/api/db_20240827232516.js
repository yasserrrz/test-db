import { createServer } from "json-server";
import path from "path";

const server = createServer({
    dbFile: path.join(__dirname, '..', 'db.json'),
});

server.listen(3000, () => {
    console.log('JSON Server is running');
});

export default server;
