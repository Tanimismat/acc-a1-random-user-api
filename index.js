const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

// console.log(fs);
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/user", (req, res) => {
	fs.readFile("data.json", (err, data) => {
		if (err) {
			res.write("Failed to load data!");
			res.end();
		} else {
			res.write(data);
			// console.log(data);
			res.end();
		}
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
