const express = require("express"),
	path = require("path"),
	exphbs = require("express-handlebars"),
	players = require("./json/Players");

const app = express();

// Handlebars Middleware
app.engine("handlebars", exphbs());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// Static files Middelware
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get("/", (req, res) =>
	res.render("index", {
		title: "Basketball Hall of Fame",
		players,
		addPlayerTitle: "Add new Hall of Famer",
	})
);

// Players Route
app.get("/:id", (req, res) => {
	const found = players.some((player) => player.id === req.params.id);

	if (found) {
		const singlePlayer = players.filter((player) => player.id === req.params.id);
		res.render("player", {
			singlePlayer,
			updatePlayerTitle: "Update Hall of Famer",
		});
	} else {
		res.status(400).json({ message: "This player is not in Hall of Fame" });
	}
});

// Players API routes
app.use("/api/players", require("./routes/api/players"));

// Move to seperate config file
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
