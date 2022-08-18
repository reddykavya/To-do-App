//DEFAULT PARAMETERS & REST PARAMETERS
//===============================

function sum(a,b=1){
    console.log(a*b);
}
sum(3)

//PASSING FUNCTION AS AN ARUGUMENT:
//===============================

function displaycar(display){
    display();
    console.log("helo")
}
displaycar(function(){
    console.log("kavya")
})
//===============================================


//SCHEDULERS(SETINTERVAL):

// let count = 0;
// setInterval(function(){
//     console.log(count);
//     count = count+1;
// },1000);

// let set = document.getElementById("set")
// let clear = document.getElementById("clear")
// let uniqueid = null;
// set.onclick = function(){
    
//     let count = 0;
//     uniqueid = setInterval(function(){
//         console.log(count);
//         count = count+1;
//     },1000);
// }
// clear.onclick = function(){
//   clearInterval(uniqueid);
// }

//KEYBOARD EVENTS========================================

// let inputEl = document.createElement("input");

// function printKeydown() {
//   console.log("key pressed");
// }

// inputEl.addEventListener("keyup", printKeydown);
// document.body.appendChild(inputEl);

//FACTORY & CONSTRUCTOR FUNCTIONS:==================

// function createCar(color,brand){
//     return{
//         color: color,
//         brand:brand,
//         start:function(){
//           console.log("started")
//         }
//     }
// }
// let car1 = createCar("blue","audi");
// console.log(car1)

//============
// function Car(color,brand){
    
//         this.color = color;
//         this.brand = brand;
//         this.start = function(){
//           console.log("started")
//         }
    
// }
// let mycar2 = new Car("blue","audi");
// console.log(mycar2);

//BUILT IN CONSTRUCTOR FUNCTIONS==================

// let a = new Date();
// console.log(a);
// console.log(typeof(a))

//=========================

var arr1 = ['1','2','3','4'];
for(var i=0;i<arr1.length-1;i--){
    console.log(arr1[i])
}

 