#!/usr/bin/env node

/*
PROJECT DETAILS
Project Name: Clinic Management App
JavaScript Concept: Objects, Methods
Concept Focus:

    Objects are a collection of properties and methods.
    Methods are functions inside objects that perform actions.

*/




// Import yargs with ES module compatibility
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'; // Required for ES module compatibility


//Clinic object with methods 
let clinic = {
    name: "Healthy Life Clinic",
    address: "123 Health st, Wellness City",
    doctors: ["Dr. John", "Dr Smith", "Dr. Lisa"],
    patients: [],

 //Method to display clinic Info
getClinicInfo: function() {
    console.log(`Clinic: ${this.name}, Address: ${this.address}`);
    console.log(`Available Doctors: ${this.doctors.join(",")}`);
},

//Method to book appointment
bookAppointment: function(patientName, doctorName) {
    if(this.doctors.includes(doctorName)) {
        this.patients.push({patientName, doctorName});
        console.log(`Appointment booked for ${patientName} with ${doctorName}`);  

    } else {
        console.log(`Doctor ${doctorName} is not available.`);

    }
},

//Method to display booked appointments
getAppointments: function () {
    if (this.patients.length === 0 ) {
        console.log("No appointments booked. ");
    } else {
        console.log("Appointments:");
        this.patients.forEach((appointment, index) => {
            console.log(`${index + 1}. Patient: ${appointment.patientName}, Doctor: ${appointment.doctorName}`);
        });
    }
}
};


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