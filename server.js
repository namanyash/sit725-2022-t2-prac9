var express = require("express");

var app = express();
var cors = require("cors");

let projectsCollection;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://namanyash:admin@sit-725-gp-db.gdz2oll.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

const createColllection = (collectionName) => {
  client.connect((err, db) => {
    projectsCollection = client.db().collection(collectionName);
    if (!err) {
      console.log("DB Connected");
    } else {
      console.log("DB Connection Error: ", err);
      process.exit(1);
    }
  });
};

const insertProjects = (project, callback) => {
  projectsCollection.insert(project, callback);
};

const getProjects = (callback) => {
  projectsCollection.find({}).toArray(callback);
};

const cardList = [
  {
    title: "Kitten 2",
    image: "images/kitten-2.jpg",
    link: "About Kitten 2",
    desciption: "Demo desciption about kitten 2",
  },
  {
    title: "Kitten 3",
    image: "images/kitten-3.jpg",
    link: "About Kitten 3",
    desciption: "Demo desciption about kitten 3",
  },
];

app.get("/addNumber/:n1/:n2", (req, res) => {
  result = parseInt(req.params.n1) + parseInt(req.params.n2);
  res.json({ statusCode: 200, data: result });
});

app.post("/api/projects", (req, res) => {
  console.log("New Project added", req.body);
  var newProject = req.body;
  insertProjects(newProject, (err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, message: "Project added", data: result });
    }
  });
});

app.get("/api/projects", (req, res) => {
  getProjects((err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, message: "Success", data: result });
    }
  });
});

var port = process.env.port || 8080;

app.listen(port, () => {
  console.log("App listening to: " + port);
  createColllection("Pets");
});
