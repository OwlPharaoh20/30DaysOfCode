#!/usr/bin/env node

/*
PROJECT DETAILS
Project Name: Clinic Management App
JavaScript Concept: Objects, Methods, File Storage
Concept Focus:
    - Objects are a collection of properties and methods.
    - Methods are functions inside objects that perform actions.
    - File Storage allows persisting data across program runs.
*/

// Import yargs and necessary modules for file handling
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'; // Required for ES module compatibility
import fs from 'fs'; // For reading and writing files

// File to store appointment data
const DATA_FILE = 'appointments.json';

//Clinic object with methods 
let clinic = {
    name: "Healthy Life Clinic",
    address: "123 Health st, Wellness City",
    doctors: ["Dr. John", "Dr Smith", "Dr. Lisa"],
    
    // Load appointments from file
    loadAppointments: function() {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf-8');
            this.patients = JSON.parse(data);
        } else {
            this.patients = [];
        }
    },

    // Save appointments to file
    saveAppointments: function() {
        fs.writeFileSync(DATA_FILE, JSON.stringify(this.patients, null, 2));
    },

    //Method to display clinic Info
    getClinicInfo: function() {
        console.log(`Clinic: ${this.name}, Address: ${this.address}`);
        console.log(`Available Doctors: ${this.doctors.join(", ")}`);
    },

    //Method to book appointment
    bookAppointment: function(patientName, doctorName) {
        if (this.doctors.includes(doctorName)) {
            this.patients.push({ patientName, doctorName });
            this.saveAppointments(); // Save after booking the appointment
            console.log(`Appointment booked for ${patientName} with ${doctorName}`);
        } else {
            console.log(`Doctor ${doctorName} is not available.`);
        }
    },

    //Method to display booked appointments
    getAppointments: function () {
        if (this.patients.length === 0 ) {
            console.log("No appointments booked.");
        } else {
            console.log("Appointments:");
            this.patients.forEach((appointment, index) => {
                console.log(`${index + 1}. Patient: ${appointment.patientName}, Doctor: ${appointment.doctorName}`);
            });
        }
    }
};

// Load existing appointments before interacting with the clinic
clinic.loadAppointments();

// Yargs setup (for ES Modules)
yargs(hideBin(process.argv))
    // Command to display clinic information
    .command('info', 'Display clinic information', {}, () => {
        clinic.getClinicInfo();
    })

    // Command to book an appointment
    .command('book', 'Book an appointment', {
        patient: {
            describe: 'Patient name',
            demandOption: true,
            type: 'string'
        },
        doctor: {
            describe: 'Doctor name',
            demandOption: true,
            type: 'string'
        }
    }, (argv) => {
        clinic.bookAppointment(argv.patient, argv.doctor);
    })

    // Command to view all appointments
    .command('appointments', 'View all booked appointments', {}, () => {
        clinic.getAppointments();
    })

    // Help command to explain usage
    .help()
    .argv;
