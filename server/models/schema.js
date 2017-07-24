'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.dataModels = {
    patients : function() {
        let patientSchema = mongoose.Schema({
            id: Schema.ObjectId,
            firstname: String,
            lastname: String,
            imageUrl: String,
            createdAt: Date,
            updatedAt: Date
        });

        return mongoose.model('Patients',patientSchema);
    },

    doctors : function() {
        let doctorSchema = mongoose.Schema({
            id: Schema.ObjectId,
            firstname: String,
            middlename: String,
            lastname: String,
            imageUrl: String,
            createdAt: Date,
            updatedAt: Date
        });

        return mongoose.model('Doctors',doctorSchema);
    }
};
