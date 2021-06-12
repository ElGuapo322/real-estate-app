import fs from "fs";

export default async (req, res) => {
  const skip = parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;
  const take = parseInt(req.query.take) ? parseInt(req.query.take) : 20;
  const bedrooms = parseInt(req.query.bedroom);
  const square = parseInt(req.query.square);

  await new Promise((resolve, reject) =>
    fs.readFile("data/houses.json", function (err, data) {
      var json = JSON.parse(data);
      let filteredHouses = json;

      if (square) {
        filteredHouses = filteredHouses.filter((i) => i.square < square);
      }

      if (bedrooms) {
        filteredHouses = filteredHouses.filter((i) => i.bedrooms === bedrooms);
      }
    
      res.status(200).json(filteredHouses.slice(skip, take));
      resolve(res);
    })
  );
};