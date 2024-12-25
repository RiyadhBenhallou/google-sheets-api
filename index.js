const express = require("express");
const { google } = require("googleapis");
const ejs = require("ejs");

const app = express();

// express.static("public");
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1WP_UCwbad-5z-_9LXbYhf7fuklsDRiP6kYA-TCQQG30";
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });
  const rows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1",
  });
  //   res.send(rows.data);
  res.render("index", { rows: rows.data.values });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
