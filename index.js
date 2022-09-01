const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("My random user api!!");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});