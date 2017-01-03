var express = require('express');
var router = express.Router();
var Model = require('../models/item.js')




//add item to db
router.post('/item', function(require, response){
  console.log(require.body)
  var item = new Model(require.body);
  item.save(function(err, resource){
    if(err){
      response.send(err).status(501);
    }else{
      response.json(resource).status(201);
    }
  });
});




router.get('/items', function(require, response){
  Model.find({}, function(err, resource){
    if(err){
      response.send(err).status(404);
    }else{
      response.send(resource).status(200);
    }
  });
});


router.delete('/item/:id', function(require, response){
  var id = require.params.id;
  Model.remove({_id: id}, function(err, resource){
    if(err){
      return response.send(err);
    }else{
      return response.json(resource);
    }
  })
});



router.put('/itemup/:id', function(require, response){
  var item = require.body;
  console.log("api"+item);
  var updItem = {};
  if(item.engPhrase){
    updItem.engPhrase = item.engPhrase;
  }
  if(item.plPhrase){
    updItem.plPhrase = item.plPhrase;
  }
  if(item.engPhrase){
    updItem.description = item.description;
  }
    if(item.creationDate){
    updItem.creationDate = item.creationDate;
  }
  if(item.nextRepeat){
    updItem.nextRepeat = item.nextRepeat;
    console.log("updajtuje date");
  }

  if(updItem){
    var id = require.params.id;
    Model.update({_id: id},updItem, function(err, resource){
      if(err){
        return response.send(err);
      }else{
        return response.json(resource);
      }
    })

  }


});

router.get('/itemsToday', function(require, response){
var start = new Date();
start.setHours(0,0,0,0);

var end = new Date();
end.setHours(23,59,59,999);

  Model.find({nextRepeat: {$gte: start, $lt: end}}, function(err, resource){
    if(err){
      response.send(err).status(404);
    }else{
      response.send(resource).status(200);
    }
  });
});





/*
jednak logike wyboru powtorek przenoszę do MainService

router.get('/item/main', function(require, response){
var today = new Date()-1;
Model.find({"created_on": {"$gte": new Date(2016, 12, 19), "$lt": new Date(2016, 12, 31)}}).exec(function(err, users) {
  if (err){
    response.send(err).status(404);
  }else{
    response.send(resource).status(200);
  }

})
});
*/

module.exports = router;