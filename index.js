const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
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
			res.end();
		}
	});
});

function getRandomUser(user) {
	const randomIndex = Math.floor(Math.random() * user.length);
	const randomUser = user[randomIndex];
	return randomUser;
}

app.get("/user/random", (req, res) => {
	if ((req.url = "/user/random")) {
		fs.readFile("data.json", (err, data) => {
			if (err) {
				res.write("Failed to load a random user!");
				res.end();
			} else {
				console.log(data);
				let user = getRandomUser(data);
				console.log(user);
				res.writeHead(200, { "Content-Type": "application/json" });
				res.write(JSON.stringify(user));
				res.end();
			}
		});
	}
});

// var http = require("http");

// const server = http.createServer(function (req, res) {
// 	//write code here
// });

// server.listen(5000);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
