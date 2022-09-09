let user = [
	{
		id: "1",
		photoUrl: "http://placehold.it/32x32",
		name: "Maryanne Madden",
		gender: "female",
		contact: "+1 (918) 530-2617",
		address: "100 Sands Street, Kanauga, Puerto Rico, 1525",
	},
];

const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const port = process.env.PORT || 5000;

// app.use(cors());
app.use(express.json());

app.get("/user/all", (req, res) => {
	fs.readFile("data.json", (err, data) => {
		if (err) {
			res.write("Failed to load data!");
			res.end();
		} else {
			const { limit, page } = req.query;
			console.log(limit, page);
			res.json(JSON.parse(data).slice(0, limit));
			// res.write(data);
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
	// if ((req.url = "/user/random")) {
	fs.readFile("data.json", (err, data) => {
		if (err) {
			res.write("Failed to load a random user!");
			res.end();
		} else {
			console.log(data);
			let user = getRandomUser(JSON.parse(data));
			console.log(user);
			// res.writeHead(200, { "Content-Type": "application/json" });
			res.write(JSON.stringify(user));
			res.end();
		}
	});
});

app.post("/user/save", (req, res) => {
	console.log(req.body);

	let data = JSON.stringify(user);
	fs.appendFile("data.json", data, (err) => {
		if (err) {
			res.write("Failed to save user!");
			res.end();
		} else {
			user.push(data);
			res.send(user);
			// res.write("data written successfully");
			// res.end();
		}
	});
	// res.send("sending data");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
