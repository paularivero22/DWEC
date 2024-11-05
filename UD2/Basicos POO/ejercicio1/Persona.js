'use strict';
//Objeto literal
const personaJSON = {
    nombre: 'Paula',
    nacimiento: '2004-10-02',
    hobbies: ['leer', 'musica'],

    saludar: function () {
        console.log('Hola me llamo '+ this.nombre + ' y me gusta ' + this.hobbies + '.');
    }
};


//Funcion constructora
function Persona(nombre, nacimiento, hobbies) {
    this.nombre = nombre;
    this.nacimiento = nacimiento;
    this.hobbies = hobbies;
    this.saludar = function () {
        console.log('Hola me llamo '+ this.nombre + ' y me gusta ' + this.hobbies + '.');
    }
}

//Formato ES6
class PersonaES6 {
    constructor(nombre, nacimiento, hobbies) {
        this.nombre = nombre;
        this.nacimiento = nacimiento;
        this.hobbies = hobbies;
    }

    saludar() {
        console.log('Hola me llamo '+ this.nombre + ' y me gusta ' + this.hobbies + '.');
    }
}

//pruebo la funcion constructora
let p = new Persona(
    'Paula',
    '2004-12-02',
    ['leer', 'musica']
);
p.saludar();

//pruebo el formato ES6
let p2 = new PersonaES6(
    'Elsa',
    '2004-04-17',
    ['peliculas', 'musica']
);

p2.saludar();