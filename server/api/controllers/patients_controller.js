'use strict'

//Database Schema
const dbModels = require('./dbInjector.js').dbModels;
const patientModel = dbModels.patient_model;
const exec = require('child_process').execFile;

module.exports = { selectall };

// function selectall(req,res){
//     res.send({
//         status:true,
//         resCode:200,
//         isError:false,
//         message:"Data found successfully"
//     });
// }

function selectall(req,res){  //Returning list of all patient to the caller.
    patientModel.find({}).exec(function(err,data){
        if(err){
            console.log({
                status: false,
                resCode: 500,
                isError: true,
                message: "Internal server error occured",
                data: err
            });
            res.send({
                status: false,
                resCode: 500,
                isError: true,
                message: "Internal server error occured"
                // data: err
            });
        }else if(data){
            console.log({
                status: true,
                resCode: 200,
                isError: false,
                message: "Data found successfully",
                data: data
            });
            res.send({
                status: true,
                resCode: 200,
                isError: false,
                message: "Data found successfully",
                data: data
            });
        }
    });
}

function add_patient(req,res){    //Adding a new patient. 
    let body = req.body;
    patientModel.findOne({ $and: [{firstname: body.firstname.toLowerCase()}, { lastname: body.lastname.toLowerCase() }] })
      .exec(function(err,data){
          if(err){
              console.log({
                  status: false,
                  resCode: 500,
                  isError: true,
                  message: "Internal server error",
                  error: err
              });
              res.send({
                  status: false,
                  resCode: 500,
                  isError: true,
                  message: "Internal server error"
              });
          }else if(data){
              console.log({
                  status: true,
                  resCode: 500,
                  isError: false,
                  message: "Data found successfully",
                  data: data
              });
              res.send({
                  status: true,
                  resCode: 200,
                  isError: false,
                  message: "Data already exist",
                  data: data
              });
          }else{
              var Input = {
                  firstname: body.firstname.toLowerCase(),
                  lastname: body.lastname.toLowerCase(),
                  imageUrl: body.imageUrl,
                  createdAt: new Date().getDate()
              };

              var newDocument = new patientModel(Input);

              newDocument.save(function(err,data){
                  if(err){
                      console.log({
                            status: false,
                            resCode: 500,
                            isError: true,
                            message: "Internal server error while saving data",
                            data:data
                    });

                    res.send({
                            status: false,
                            resCode: 200,
                            isError: true,
                            message: "Internal server error while saving data"
                    });
                  }else if(data){
                    console.log({
                            status: true,
                            resCode: 200,
                            isError: false,
                            message: "Data added successfully",
                            data:data
                    });

                    res.send({
                            status: true,
                            resCode: 200,
                            isError: false,
                            message: "Data added successfully"
                    });
                  }
              });
          } 
      });
}

function update(req,res){   //Updating patient's details
    var body = req.body;

    patientModel.findOne({ $and: [{firstname: body.firstname.toLowerCase()},{lastname: body.lastname.toLowerCase()}] })  
                .exec(function(err,data){
                    if(err){
                        console.log({
                            status: false,
                            resCode: 500,
                            isError: true,
                            message: "Internal server error occured",
                            error: err
                        });
                        
                        res.send({
                            status: false,
                            resCode: 500,
                            isError: true,
                            message: "Internal server error occured"
                            // error: err
                        });
                    }else if(data){
                        console.log({
                            status: true,
                            resCode: 200,
                            isError: false,
                            message: "Data delete successfully",
                            data: data
                        });

                        // res.send({
                        //     status: true,
                        //     resCode: 200,
                        //     isError: false,
                        //     message: "Data delete successfully"
                        //     // data: data
                        // });

                        //When patient found successfully.
                        patientModel.findByIdAndUpdate(data._id,function(err,data){
                            if(err){
                                console.log({
                                    status: false,
                                    resCode: 500,
                                    isError: true,
                                    message: "Internal server error occured",
                                    error: err
                                });
                        
                                res.send({
                                    status: false,
                                    resCode: 500,
                                    isError: true,
                                    message: "Internal server error occured"
                                    // error: err
                                });
                            }else if(data){
                                console.log({
                                    status: true,
                                    resCode: 200,
                                    isError: false,
                                    message: "Data updated successfully",
                                    data: data

                                });

                                res.send({
                                    status: true,
                                    resCode: 200,
                                    isError: false,
                                    message: "Data updated successfully"
                                    // data: data
                                });
                            }
                        });
                    }
                }) 
}

function Delete(req,res){  //Delete patient.
    var body = req.body;

    //Finding patient on both patient's firstname and lastname 
    patientModel.remove({ $and:[ {firstname: body.firstname.toLowerCase()},     
                                 {lastname: body.lastname.toLowerCase()}], $or: [{middlename: body.middlename.toLowerCase()}] })
                .exec(function(err,data){
                    if(err){
                        console.log({
                            status: false,
                            resCode: 500,
                            isError: true,
                            message: "Internal server error occured",
                            error: err
                        });
                        
                        res.send({
                            status: false,
                            resCode: 500,
                            isError: true,
                            message: "Internal server error occured"
                            // error: err
                        });
                    }else if(data){
                        console.log({
                            status: true,
                            resCode: 200,
                            isError: false,
                            message: "Data delete successfully",
                            data: data
                        });

                        res.send({
                            status: true,
                            resCode: 200,
                            isError: false,
                            message: "Data delete successfully"
                            // data: data
                        });
                    }
                })                 
}