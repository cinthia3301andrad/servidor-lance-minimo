const express = require("express");

const app = express();

let lances = []; 
let quantidade_lances = []; 

function numeroMenor() {
  let menor_unico = -1;

  for (let i = 0; i < quantidade_lances.length; i++) {
    if (quantidade_lances[i] === 1) {

      menor_unico = lances[i];
      break;
    }
  }

  for (let i = 0; i < quantidade_lances.length; i++) {
    if (quantidade_lances[i] === 1) {
 
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

app.get('/add/:number', function(req, res) {
  let numberReq = req.params.number;

  let menor_unico;


    if (lances.length === 0) {
      lances.push(numberReq);
      quantidade_lances.push(1);
      menor_unico = numeroMenor();
    } else {
      let true_lances = false; 
  
      for (let i = 0; i < lances.length; i++) {
        if (numberReq === lances[i] && !true_lances) {
          quantidade_lances.push(1);
          true_lances = true
          lances.push(numberReq);
          menor_unico = numeroMenor();
        }
  
        if (numberReq === lances[i]) {
          quantidade_lances[i] = quantidade_lances[i] + 1;
  
        }
      };
  
      if (!true_lances) {
        lances.push(numberReq);
        quantidade_lances.push(1);
        menor_unico = numeroMenor();
      }
    }

    res.send(200);
 
})

app.get("/list", function(_, res) {
  res.send({ lances, menor: numeroMenor() });
});

app.listen(3030);