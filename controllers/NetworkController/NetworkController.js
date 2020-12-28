const Network = require("../../Models/Network/networkModel");
const { okResponse, badRequestError, to } = require("../../global_functions");
const Teacher = require("../../Models/Teacher/teacherModel");

const AddNetwork = async (req,res) => {
    console.log("Add Network");

    const data = req.body;

    const modified = Object.assign({},{
        ...data,
        teacherId : req.user.id
    })
    console.log(modified);
    const [error,network] = await to(Network.query().skipUndefined().insert(modified).first().returning("*"));
    if(error) return badRequestError(res,error);

    const networks = await Teacher.query().skipUndefined().where("id",network).withGraphFetched('[posts,education,experience,skill,interest]').returning("*");
    
    return okResponse(res,networks,"Network added");
}

const GetNetworks = async (req,res) => {
    console.log("Get Networks");

    const [error, network] = await to(Network.query().skipUndefined().select("networkId").where("teacherId",req.query.teacherId).returning("*"));

    if(error) return badRequestError(res,error);

    const Ids = [];
    network.map(network => {
        Ids.push(network.networkId);
    })

    const networks = await Teacher.query().skipUndefined().whereIn("id",Ids).withGraphFetched('[posts,education,experience,skill,interest]').returning("*");


    return okResponse(res,networks,"Networks");
// here are the networks
}

module.exports = {
    AddNetwork,
    GetNetworks
}
