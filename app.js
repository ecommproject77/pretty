const express = require("express")
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require('express-session');
const collection = require("./config");
require('dotenv').config();

const app = express()

//session
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);

//convertir donnee en json
app.use(express.json());

app.use(express.urlencoded({extended:false}));


app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get("/", (req, res) => {
    const email = req.session.email;
 res.render("accueil", {email:email});
});

app.get("/connexionmail", (req, res) => {
    const email = req.query.email;
    res.render("connexionmail",  { email: email });
});

app.post("/connexionmail", async (req, res) => {
  
   
        const checkEmail = await collection.findOne({email: req.body.email});
        if(checkEmail){
            res.redirect("/connexionpass?email=" + req.body.email);
        }else{
            res.status(404).send("l'email n'existe pas");
        }
});

app.get("/connexionpass", (req, res) => {
    const email = req.query.email;
    res.render("connexionpass", { email: email });
});

app.post("/connexionpass", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Récupérer l'utilisateur à partir de la base de données en fonction de l'email
    const utilisateur = await collection.findOne({ email: email });

    if (!utilisateur) {
        // Si l'utilisateur n'existe pas, afficher un message d'erreur
        return res.status(401).send("Email incorrect.");
    }

    // Comparer le mot de passe saisi par l'utilisateur avec le mot de passe hashé dans la base de données
    const isPasswordMatch = await bcrypt.compare(password, utilisateur.password);

    if (isPasswordMatch) {
        // Si le mot de passe correspond, rediriger l'utilisateur vers une autre page ou afficher un message de succès
        // res.send("Mot de passe correct !");
        //stocker l'email dans une session
        req.session.email = email;
        res.redirect("/");
    } else {
        // Si le mot de passe ne correspond pas, afficher un message d'erreur
        res.status(401).send("Mot de passe incorrect.");
    }
});


app.get("/logout", (req, res) => {
    // Détruire la session de l'utilisateur
    req.session.destroy((err) => {
        if (err) {
            console.error("Erreur lors de la déconnexion :", err);
            res.status(500).send("Erreur lors de la déconnexion.");
        } else {
            // Rediriger l'utilisateur vers la page d'accueil après la déconnexion
            res.redirect("/");
        }
    });
});


  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });



//page inscription
app.get("/inscription", (req, res) => {
    res.render("inscription");
});

//script pour l'inscription
app.post("/inscription", async(req, res) => {
    
    const data={
        prenom: req.body.prenom,
        nom: req.body.nom,
        email: req.body.email,
        password: req.body.password
    }

    const utilisateurExistant = await collection.findOne({email: data.email});

    if(utilisateurExistant){
        res.send("utilisateur existant. utilisez une autre adresse email")
    }else{
        const saltHash = 10;//used to crypt the password
        try {
            const hashedPassword = await bcrypt.hash(data.password, saltHash);
            data.password = hashedPassword;// replace hashed with original password
        
            const userData = await collection.insertMany(data);
            console.log(userData);
        
            res.send("Inscription réussie !");
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            res.status(500).send("Une erreur est survenue lors de l'inscription.");
        }
        
    }
    
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