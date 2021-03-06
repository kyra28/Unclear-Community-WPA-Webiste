import * as models from '../models/model';
var router = require('express').Router();

router.post('', function(req, res) {
    models.News.create({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        publishedAt: req.body.publishedAt,
        author_id: req.body.author_id
    }).then(function() {
        res.setHeader('Content-Type','application/json');
        res.send({status :1});
    });
});

router.get('', function(req, res) {
    models.News.findAll({
        include: [{model: models.Admin, attributes: models.Admin.pseudo}]
    }).then(function(data) {
        if(data.length == 0){
            res.send({status :0});
        } else{
            res.setHeader('Content-Type','application/json');
            res.send(data);
        }
    });
});

router.get('/:id', function(req, res) {
    models.News.findOne({
        where: {
            id: req.params.id
        },
        include: [{model: models.Admin, attributes: models.Admin.pseudo}]
    }).then(function(data) {
        if(data.length == 0){
            res.send({status :0});
        } else{
            res.setHeader('Content-Type','application/json');
            res.send(data);
        }
    });
});

router.put('/:id', function(req, res) {
    models.News.update(
        {
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            publishedAt: req.body.publishedAt,
            author_id: req.body.author_id
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(function() {
        res.send({status :1});
    });
});

router.delete('/:id', function(req, res) {
    models.News.destroy({
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.send({status :1});
    });
});
module.exports = router;