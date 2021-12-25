require("dotenv").config();
const express = require("express");
const app = express();


require("./routes/routes.api.auth").routesConfig(app);
require("./routes/routes.api.user").routesConfig(app);
require("./routes/routes.api.tweet").routesConfig(app);



app.listen(process.env.PORT, ()=>{
    console.log("Server started at port: ", process.env.PORT);
});
