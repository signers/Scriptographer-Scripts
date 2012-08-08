var rows = 45
var columns = 36;
var colors = ["#576372", "#5CC4BE", "#C8DC67", "#F26B6C", "#F6D86B", "#F26B43"];

for(var x = 0; x < rows; x++){
    for(var y = 0; y < columns; y++){
        
        var size = randomNumber(5, 10);
        createRectangle(x * 10, y * 10, size, size);
    }
}

function createRectangle(x, y, width, height){
        
    var rectangle = new Rectangle(x - width/2, y - height/2, width, height);
    var roundedRectangle = new Path.RoundRectangle(rectangle, new Size(2, 2)){
        strokeColor:null,
        fillColor:getRandomColor()
    };
}

function getRandomColor(){
    return colors[Math.floor(randomNumber(0, colors.length-1))];
}

function randomNumber(min, max){
    return min + Math.random() * (max - min);
}