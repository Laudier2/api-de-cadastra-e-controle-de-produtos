const mongoose = require('mongoose');
const Product = require('../models/Product');
const ValidationContract = require('../validators/validator');
const Repository = require('../repository/repository')


exports.post = (req, res, next) => {
    /**
     * Observe a importação do ValidationContract logo acima, que vem do arquivo validators,
     * e abaixo determionamos as menssagem de aviso paraum pocivel erro ou não cumprimento dos requisitos
     */
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 1, "O pampo campo name é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.price, 1, "O pampo campo price é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.peso, 1, "O campo peso é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.image1, 1, "O pampo campo é obrigatorio no minimo 1 item!")
    contract.hasMinLen(req.body.quantity, -1, "O pampo campo é obrigatorio no minimo 1 item!")

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    Repository
        .create(req.body)
        .then(() => {
            res.status(201).send({message: 'Produto cadastrado com sucesso!' })  
        }).catch((err) => {
            res.status(400).send(`Houve um erro ao cadastra o produto ${err}`)
        })
};

exports.get = async(req, res, next) => {
    try {
        let data = await Repository.get()        
        res.status(200).send(data)  
    } catch (err) {
        res.status(400).send(`Houve um erro ${err}`)
    }
};

exports.getById = async(req, res, next) => {
    try{
        let data = await Repository.getBayId(req.params.id)
            res.status(200).send(data)  
        } catch (err) {
            res.status(400).send(`Esse produto não existe ou foi apagado anteriormente!`)
        }
};

exports.put = async(req, res, next) => {
    try{
        let data = await Repository
        .update(req.params.id, req.body)
            res.status(201).send({
                message: "Produto Atualizado com Sucesso!"
            })  
        } catch (err) {
            res.status(400).send(`Falha ao Atualiza o Produto ${err}`)
        }
};
  
exports.delete = async(req, res, next) => {
    try{
        let data = await Repository.delete(req.params.id)
        res.status(200).send({
            message: "Produto Removido com Sucesso!"
        })  
    } catch (err) {
        res.status(400).send(`Falha ao Remover o Produto ${err}`)
    }
};
