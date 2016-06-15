# ornito-route-handler
Default setup for the endpoints built with Node.js stack

## Installation

```bash
$ npm install --save ornito-route-handler
```

## Usage
```javascript

//Create a file with all your routes
//Example: route_map.js

export const routes = [{
	url: "users", //Endpoint URL
	router: usersRouter //Express Router Object
}, ... ]

//On your server definition file (server.js) you should import the "route map" as shown below
import { routes } from "./route_map";

const handler = require("ornito-route-handler")({
	version: "1.0", //YOUR API VERSION
	route_map: routes //from route_map.js
});

//and then set the routes on express instance
const app = express();
app.use('/', handler);
const server = http.createServer(app);
server.listen(...);

```