const DOSCGModel = require("../model/DOSCG.model");
const _ = require('lodash')
const algebra = require('algebra.js');

const model = new DOSCGModel()

const getGoogleApiData = (req,res) =>{
    try {
        model.setGoogleApiKey()
        return res.status(200).json(model.readGoogleApiKey())
    }catch(error){
        return res.status(500).json({status:"500",message:error})
    }
}

const receivedLineMessage = (req,res) =>{
    try{
        const id = _.get(req,'params.id',null)
        const data = _.get(req,'body.data',{})
        if(id === null){
            return res.status(500).json({status:"500",message:"Missing Line Id"})
        }
        model.writeLineLog(data)
    }catch(error){
        return res.status(500).json({status:"500",message:error.message})
    }
}

const polynomial = async (n) => {
    return (3 + n + (n * n))
}

const calculateCompletePolynomial = async (req,res) =>{
    try{
        const list = _.get(req,'body.list',['X','Y','5','9','15','23','Z'])
        const paramList = await Promise.all(_.map(list,async(item,index)=>{
            if(isNaN(parseInt(item))){
                const num = await polynomial(index)
                return num.toString()
            }
            return item.toString()
        }))
   return res.status(200).json(paramList)

    }catch(error){
        return res.status(500).json({status:"500",message:error.message})
    }
}

const calculateAlgebra = (req,res) =>{
    try{
        const aValue = _.get(req,'params.a','21')
        const a = `a = ${aValue}`
        const b = `b = 23 - ${aValue}`
        const c = `c = -21 - ${aValue}`
        const expr1 = algebra.parse(a)
        const expr2 = algebra.parse(b)
        const expr3 = algebra.parse(c)
        const results = {
            a: expr1.toString(),
            b: expr2.toString(),
            c: expr3.toString(),
        }
        res.status(200).json(results)

    }catch (error){
        return res.status(500).json({status:"500",message:error.message})
    }
}
module.exports = {getGoogleApiData,receivedLineMessage,calculateCompletePolynomial,calculateAlgebra}
