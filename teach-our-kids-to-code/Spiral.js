var circleRadius = 0;
var spiralRadius = 0;
var angle = 0;
var numberOfCircles = 100;

for(var i = 0; i < numberOfCircles; i++){
    
    angle++;
    spiralRadius += 2;
    circleRadius += 0.2;
    
    var x = (document.size.width / 2) + Math.cos(angle) * spiralRadius;
    var y = (document.size.height / 2) + Math.sin(angle) * spiralRadius;
    
    createCircle(x, y, circleRadius);
}

function createCircle(x, y, radius){
        
    var circle = new Path.Circle(new Point(x, y), radius){
        fillColor:"#5CC4BE"
    };
}

function randomNumber(min, max){
    return min + Math.random() * (max - min);
}