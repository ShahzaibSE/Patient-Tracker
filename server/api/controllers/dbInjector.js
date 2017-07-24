'use strict'

const models = require('./../../models/schema.js').dataModels;

exports.dbModels = {
    patient_model : models.patients(),
    doctor_model : models.doctors() 
};
