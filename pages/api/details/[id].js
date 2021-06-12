import fs from 'fs'

export default async (req, res) => {
    const id = parseInt(req.query.id);
  await new Promise((resolve, reject) => 
    fs.readFile('data/houses.json', function(err, data) {
      var json = JSON.parse(data);
      const house = json.filter(item => item.id === id)[0];
      res.status(200).json(house)
      resolve(res);
    }));

}
