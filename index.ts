const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/", require("./routes/auth.route"));
app.use("/expenses", require("./routes/expense.route"));
app.use("/notes", require("./routes/note.route"));
app.use("/expensesStatistic", require("./routes/expensesStatistic.route"));
app.use("/tags", require("./routes/tag.route"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
