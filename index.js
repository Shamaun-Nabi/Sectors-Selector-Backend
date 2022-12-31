const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

// sPwiZyKiH0JjZPXe

app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://nabi:sPwiZyKiH0JjZPXe@cluster0.saeb9nj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   console.log("DATABASe CONNECTED");
// });
async function run() {
  try {
    await client.connect();
    const sectorCollection = client.db("sectorSelector").collection("selector");
    const allUsersInformation = client
      .db("userInformation")
      .collection("infoUsers");
    console.log("DATABASe CONNECTED");

    // Get API FOR FINDING All selectors
    app.get("/sectors", async (req, res) => {
      const cursor = sectorCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/userInfo", async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await allUsersInformation.insertOne(data);
      res.send(result);
    });

    app.get("/userInfoGet", async (req, res) => {
      const cursor = allUsersInformation.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    app.put("/updateInfo/:id", async (req, res) => {
      const postId = req.params.id;
      const updateData = req.body;
      console.log(updateData);
      const filter = { _id: ObjectId(postId) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          userName: updateData.userName,
          sectors: updateData.sectors,
          terms: updateData.terms,
        },
      };

      const result = await allUsersInformation.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // query for movies that have a runtime less than 15 minutes
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
