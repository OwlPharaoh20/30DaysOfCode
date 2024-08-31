let car = { 
    color : "red",
    model : "Toyota",
    year : 2020,
    start : function ( ) {
        console.log("The car is starting");
    },
    getDetails : function () {
        return `This is a ${this.year} ${this.model} 
        in ${ this.color} color.`;
    }

};

console.log(car.color); //Output: red (accessing property)
car.start(); // Output: The car is starting (calling Method)
console.log(car.getDetails());  /* Output: This is a 2020 Toyota
in Red color( Calling Method that uses properties)*/ 