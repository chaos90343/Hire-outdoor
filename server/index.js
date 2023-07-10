var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var urlencoded = bodyParser.urlencoded(({ extended: true }));
var sha1 = require('sha1');
var querystring = require('querystring');
var coon = require('./routes/db');
var app=express();
app.use(cors());
app.use(urlencoded);
app.use('/img',express.static('public/img'))
app.get('/',function(req,res){
    let a = sha1('1234','kjdsfkjds');
    ['$','#',]
    res.send(a);
});
app.get('/cart',function(req,res){
    res.send('cartInfo');
});
// app.get('/api/tradeitem', function(req, res) {
//   const query = 'SELECT tradeitemId FROM tradeitem';
//   coon.query(query, function(error, results) {
//     if (error) {
//       console.log(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       res.json(results);
//     }
//   });
// });

// ...其餘程式碼

app.get('/api/tradeitems', function(req, res) {
  const query = 'SELECT tradeitemId, productId, state FROM tradeitem';
  coon.query(query, function(error, results) {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        const productIds = results.map((result) => result.productId);
        const query = 'SELECT productId, productName FROM product WHERE productId IN (?)';
        coon.query(query, [productIds], function(error, productResults) {
          if (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            const tradeitems = results.map((result) => {
              const product = productResults.find((product) => product.productId === result.productId);
              return {
                tradeitemId: result.tradeitemId,
                productName: product ? product.productName : 'Product not found',
                state: result.state,
              };
            });
            res.json(tradeitems);
          }
        });
      } else {
        res.json([]);
      }
    }
  });
});

// ...其餘程式碼


// ...其餘程式碼



// app.get('/api/tradeitem', (req, res) => {
//     const qur = 'SELECT * FROM tradeitem WHERE 1'
//     coon.query(qur, (err, data) => {
//         res.json(data)
//     })
// })
app.listen(8000,function(){
    // console.clear();
    console.log(new Date().toLocaleDateString());
});