const express = require("express")

const app = express()



app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("accueil");
});
app.get("/connexion", (req, res) => {
    res.render("connexion");
});
app.get("/inscription", (req, res) => {
    res.render("inscription");
});
app.get("/inscriptionvendeur", (req, res) => {
    res.render("inscriptionvendeur");
});
app.get("/vendeurpage", (req,res)=>{
    res.render("vendeurpage");
});
app.get("/panier", (req, res) => {
    res.render("panier");
});
app.get("/articles", (req,res)=>{
    res.render("articles");
});
app.get("/detail/images/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    res.render("detail", { imageName });
});
app.get("/details", (req,res)=>{
    res.render("details");
});
app.get("/formarticle", (req,res)=>{
    res.render("formarticle");
});
app.get("/editarticle", (req,res)=>{
    res.render("editarticle");
});
app.get("/profile", (req,res)=>{
    res.render("profile");
});
app.get("/connexionvendeur", (req,res)=>{
    res.render("connexionvendeur");
});
app.get("/pagevendeur", (req,res)=>{
    res.render("pagevendeur");
});
app.get("/interfvendeur", (req,res)=>{
    res.render("interfvendeur");
});
app.get("/hubvendeur", (req,res)=>{
    res.render("hubvendeur");
});
app.get("/interfclient", (req,res)=>{
    res.render("interfclient");
});
app.get("/objetachete", (req,res)=>{
    res.render("objetachete");
});
app.get("/paiement", (req,res)=>{
    res.render("paiement");
});
app.get("/modepaiement", (req,res)=>{
    res.render("modepaiement");
});
app.get("/commande", (req,res)=>{
    res.render("commande");
});
app.get("/tache", (req,res)=>{
    res.render("tache");
});
app.get("/apercu", (req,res)=>{
    res.render("apercu");
});
app.get("/emplois", (req,res)=>{
    res.render("emplois");
});
app.get("/individuel", (req,res)=>{
    res.render("individuel");
});
app.get("/modifierprof", (req,res)=>{
    res.render("modifierprof");
});
console.log('L\'application tourne au port 3000')
app.listen('3000')