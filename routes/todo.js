var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://nvd:nvd@ds048719.mlab.com:48719/firstdb', ['TourHeroes']);

/* GET All Todos or matching query*/
router.get('/todos', function(req, res, next) {
	var qu=req.query;
	if(qu && qu.name) {
		console.log(qu)
		db.TourHeroes.find({"name": new RegExp('^' + qu.name, 'i')},function(err, docs) {
			if (err) {
				res.send(err);
			} else {
				res.json(docs);
			}
		});
	}else {
		db.TourHeroes.find(function(err, docs) {
			if (err) {
				res.send(err);
			} else {
				res.json(docs);
			}
		});
	}
});

/* GET One Todo with the provided ID */
router.get('/todo/:id', function(req, res, next) {
    db.TourHeroes.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            res.json(docs);
        }
    });
});

/* POST/SAVE a Todo */
router.post('/todo', function(req, res, next) {
    var todo = req.body;
	db.TourHeroes.find(function(err,docs){
		db.TourHeroes.insert({id:docs[docs.length-1].id+1,name:todo.name}, function(err, result) {
			if (err) {
				res.send(err);
			} else {
				res.json(result);
			}
		})
	});
});

/* PUT/UPDATE a Todo */
router.put('/todo/:id', function(req, res, next) {
    var todo = req.body;
	console.log(todo)
    var updObj = {};

    if (todo.isCompleted) {
        updObj.isCompleted = todo.isCompleted;
    }
    if (todo.text) {
        updObj.text = todo.text;
    }

    if (!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.TourHeroes.update({
            _id: mongojs.ObjectId(req.params.id)
        }, {
			$set: {id:todo.id,name:todo.name}
		  },
		  false, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }


});

/* DELETE a Todo */
router.delete('/todo/:id', function(req, res) {
    db.TourHeroes.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });

});

module.exports = router;