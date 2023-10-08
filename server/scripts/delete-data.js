const dotenv = require("dotenv");
dotenv.config();
const index = require("../singletons/db");

index
  .query({
    vector: new Array(1536).fill(0),
    topK: 50,
    includeMetadata: false,
    includeValues: false,
  })
  .then((res) => {
    const ids = res.matches.map((x) => x.id);
    index.deleteMany(ids);
  });
