const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/", require("./routes/auth.route"));
app.use("/expenses", require("./routes/expense.route"));
app.use("/notes", require("./routes/note.route"));
app.use("/noteGroups", require("./routes/noteGroup.route"));
app.use("/expensesStatistic", require("./routes/expensesStatistic.route"));
app.use("/tags", require("./routes/tag.route"));
app.use("/goals", require("./routes/goal.route"));
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
