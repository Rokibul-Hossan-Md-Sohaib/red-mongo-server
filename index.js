const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const app = express();
app.use(cors());

app.use(bodyParser.json());

const uri = process.env.DB_PATh;

const users = ["asif", "momin", "akter", "javed"];
let client = new MongoClient(uri, { useNewUrlParser: true });

app.post("/addProduct", (req, res) => {
  const product = req.body;
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("Restaurant").collection("items");
    collection.insertMany(product, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops[0]);
      }
    });

    console.log("database connect");
    client.close();
  });
});

app.get("/products", (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("Restaurant").collection("items");
    collection
      .find()
      .limit(12)
      .toArray((err, documents) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: err });
        } else {
          res.send(documents);
        }
      });

    client.close();
  });
});

app.get("/lunchProducts", (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("Restaurant").collection("items");
    collection
      .find({
        $or: [
          {
            key: "lunchi22",
          },
          {
            key: "lunchi23",
          },
          {
            key: "lunchi24",
          },
          {
            key: "lunchi25",
          },
          {
            key: "lunchi26",
          },
          {
            key: "lunchi27",
          },
        ],
      })

      .toArray((err, documents) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: err });
        } else {
          res.send(documents);
        }
      });

    client.close();
  });
});

app.get("/dinnerProducts", (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("Restaurant").collection("items");
    collection
      .find({
        $or: [
          {
            key: "dinniya1",
          },
          {
            key: "dinniya2",
          },
          {
            key: "dinniya3",
          },
          {
            key: "dinniya4",
          },
          {
            key: "dinniya5",
          },
          {
            key: "dinniya8",
          },
        ],
      })

      .toArray((err, documents) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: err });
        } else {
          res.send(documents);
        }
      });

    client.close();
  });
});

app.get("/breakfastProducts", (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("Restaurant").collection("items");
    collection
      .find({
        $or: [
          {
            key: "braki2",
          },
          {
            key: "braki1",
          },
          {
            key: "braki3",
          },
          {
            key: "braki4",
          },
          {
            key: "braki5",
          },
          {
            key: "braki6",
          },
        ],
      })

      .toArray((err, documents) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: err });
        } else {
          res.send(documents);
        }
      });

    client.close();
  });
});

app.get("/item/:key", (req, res) => {
  const key = req.params.key;
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("Restaurant").collection("items");
    collection.find({ key }).toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(documents[0]);
      }
    });

    client.close();
  });
});

app.post("/getProducts", (req, res) => {
  const key = req.params.key;
  const productKeys = req.body;
  console.log(productKeys);

  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("Restaurant").collection("items");
    collection.find({ key: { $in: productKeys } }).toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(documents);
      }
    });

    client.close();
  });
});

app.post("/placeOrder", (req, res) => {
  const orderDetail = req.body;

  orderDetail.orderTime = new Date();
  console.log(orderDetail);

  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db("Restaurant").collection("orders");
    collection.insertOne(orderDetail, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops[0]);
      }
    });

    client.close();
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("port listening 8080"));
