'use strict';
/**
 * express module
 * @express
 * collection module
 * @categories
 * @products
 */

const express = require('express');
const category = require('../models/categories/categories.collection.js');
const products = require('../models/products/products.collection.js');
const router = express.Router();
const bearer = require('../../auth/middleware/bearer-auth.js');
const acl = require('../../auth/middleware/acl-middleware.js');

router.param('model', getModel);
function getModel(req, res, next) {
  const model = req.params.model;
  switch (model) {
  case 'categories':
    req.model = category;
    next();
    return;
  case 'products':
    req.model = products;
    next();
    return;
  default:
    next('invalid model');
    return;
  }
}

/**
 * routs
 * @param string
 * @param function
 * @returns {Response} 
 */

// routs
router.get('/:model',bearer, getData);
router.get('/:model/:id' ,bearer,  getById);
router.post('/:model' ,bearer, acl('add'), addNew);
router.put('/:model/:id' ,bearer, acl('update'), update);
router.delete('/:model/:id' ,bearer,acl('delete'), deleteById);



//FUNCTIONS 

async function getData(req, res , next) {
  try{
    let data = await req.model.get();  
    const count = data.length;
    const result = data;
    res.status(200).json({count , result});
  }catch(error){
    next(error.message);
  }
}

async function getById(req,res,next){
  let id = req.params.id;
  try{
    let data = await req.model.get(id);  
    res.status(200).json(data);
  }catch(error){
    next(error.message);
  }

}

async function addNew(req ,res,next){
  try{
    let data = await req.model.create(req.body);
    res.status(200).json(data);
  }catch(error){
    next(error.message);
  }
  
}

async function update(req,res,next){
  let id = req.params.id;
  try{
    let data = await req.model.update(id,req.body);
    res.status(200).json(data);
  }catch(error){
    next(error.message);
  }

}

async function deleteById(req,res,next){
  let id = req.params.id;
  try{
    await req.model.delete(id);
    let data =  {
      status: 'item deleted',
    };
    res.status(200).json(data);
  }catch(error){
    next(error.message);
  }
}

module.exports = router;