const express = require("express");

const bodyParser = require('body-parser');

const app = express();

const urlencodeParser = bodyParser.urlencoded({ extended: false });

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/src/index.html");
});

let lances = []; //lista de lances sem repetição
let qtd_lances_por_num = []; //qtd de lances por numero da lista acima.

function menorUnico() {

  let menor_unico = -1;
  

  for (var i = 0; i < qtd_lances_por_num.length; i++) { //escolhendo um menor unico como base
    if (qtd_lances_por_num[i] === 1) {

      menor_unico = lances[i];
      break;
    }
  }

  for (var i = 0; i < qtd_lances_por_num.length; i++) {
    if (qtd_lances_por_num[i] === 1) {
 
      if (lances[i] < menor_unico) {
        menor_unico = lances[i]
      }
    }
  }
  if (menor_unico < 0) {
    return 0;
  } else {

    return menor_unico;
  }
}

app.post('/controllerForm', urlencodeParser, function(req, res) {
  var menor_unico;


    if (lances.length === 0) {
      lances.push(req.body.fname);
      qtd_lances_por_num.push(1);
      menor_unico = menorUnico();
    } else {
      var true_lances = false; //1 se ja tinha na lista
  
      for (var i = 0; i < lances.length; i++) {
        if (req.body.fname === lances[i] && !true_lances) {
          qtd_lances_por_num.push(1);
          true_lances = true
          lances.push(req.body.fname);
          menor_unico = menorUnico();
        }
  
        if (req.body.fname === lances[i]) {
          qtd_lances_por_num[i] = qtd_lances_por_num[i] + 1;
  
        }
      };
  
      if (!true_lances) { //entra aqui se n existir na lista
        lances.push(req.body.fname);
        qtd_lances_por_num.push(1);
        menor_unico = menorUnico();
      }
    }

    res.sendFile(__dirname + "/src/result.html");
 
})

app.get("/lista", function(req, res) {
  res.send({ lances, menor: menorUnico() });
});

app.get("/results", function(req, res) {
  // res.send(menorUnico());
  res.sendFile(__dirname + "/src/result.html");
});

app.listen(3030);