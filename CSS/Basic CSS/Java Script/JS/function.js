
/*function sayHello(number1, number2) 
{
    console.log(` ${number1} + ${number2} = ${number1 + number2}`);
}
sayHello(5000,100);*/

let visitedlist=["India", "USA", "UK", "Canada", "Australia"];
visitedlist.forEach((country,position)=> {
    console.log(` ${++position }.  I have visited ${country}`);
});

