const express=require("express");
const bodyParser=require("body-parser");
const turl=require("turl");
const path=require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/shrinkRoute", async (req, res) => {
    let { url } = req.body;
    let shrinkedLink;
    let linkValid = true;
    await turl.shorten(url).then((res) => { shrinkedLink = res; }).catch((err) => { linkValid = false; });
    res.render("index.ejs", { linkValid, shrinkedLink });
});

app.listen(PORT, () => {
    console.log(`Shrink Route app is Hosted.`);
});