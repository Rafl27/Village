const express = require('express');
const bp = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bp.json());

app.get('/listaVisitantes', async (req, res) => {
    
    const data = fs.readFileSync('C:/Users/jean4/Desktop/VillageFinalV2/json/visitantes.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        return data;
      });
    return res.status(200).send(JSON.parse(data));
})

app.post('/listaVisitantes', (req, res) => {
    var obj = req.body;

    console.log(obj);
    //fs.writeFileSync('../data/phraseFreqs.json', JSON.stringify(output));
})


app.listen('3333');