'use strict';
//Forma1
function Animal(nombre, tipo) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.comer = function () {
        console.log(this.nombre + ' está comiendo');
    }
    this.dormir = function () {
        console.log(this.nombre + ' está durmiendo');
    }
    this.hacerRuido = function () {
        if (this.tipo === 'perro' || this.tipo === 'Perro') {
            console.log(this.nombre + ' hace guau');
        } else if (this.tipo === 'gato' || this.tipo === 'Gato') {
            console.log(this.nombre + ' hace miau');
        } else {
            console.log(this.nombre + ' hace ruido');
        }
    }
}

//lo pruebo 
console.log('Forma1');
let toby = new Animal(
    'Jara',
    'perro'
);
toby.comer();
toby.dormir();
toby.hacerRuido();

//Forma2
class AnimalES6 {
    constructor(nombre, tipo) {
        this.nombre = nombre;
        this.tipo = tipo;
    }

    comer() {
        console.log(this.nombre + ' está comiendo');
    }

    dormir() {
        console.log(this.nombre + ' está durmiendo');
    }

    hacerRuido() {
        console.log(this.nombre + ' hace ruido');
    }
}

class Perro extends AnimalES6 {
    #_raza;
    constructor(nombre, raza) {
        super(nombre);
        this.raza = raza;
    }

    hacerRuido() {
        console.log(this.nombre + ' hace guau');
    }

    mostrarRaza() {
        console.log(this.nombre + ' es de raza ' + this.raza);
    }
}

class Gato extends AnimalES6 {
    #_color;
    constructor(nombre, color) {
        super(nombre);
        this.color = color;
    }

    hacerRuido() {
        console.log(this.nombre + ' hace miau');
    }

    mostrarColor() {
        console.log(this.nombre + ' es de color ' + this.color);
    }
}

console.log('Forma2');
let laika = new Perro(
    'Laika',
    'Border Collie'
);
laika.comer();
laika.dormir();
laika.hacerRuido();
laika.mostrarRaza();

let misha = new Gato(
    'Misha',
    'Gris'
); 
misha.comer();
misha.dormir();
misha.hacerRuido();
misha.mostrarColor();

let gallo = new AnimalES6(
    'Gallo',
    'Perro'
);

gallo.comer();
gallo.dormir();
gallo.hacerRuido();