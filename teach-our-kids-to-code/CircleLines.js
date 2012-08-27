var numberOfLines = 360;
var angle = 0;
var radius = 180;
var colors = ["#576372", "#5CC4BE", "#C8DC67", "#F26B6C", "#F6D86B", "#F26B43"];

for(var i = 0; i < numberOfLines; i++){
    
    angle = (i * (360 / numberOfLines)) * Math.PI / 180;
    
    var center = document.bounds.center;
    
    var p1 = center;
    var p2 = new Point(center.x + Math.cos(angle) * radius, center.y + Math.sin(angle) * radius);
    
    createLine(p1, p2);
}

function createLine(p1, p2){
        
    var line = new Path.Line(p1, p2){
        strokeColor:getRandomColor()
    };
}

function getRandomColor(){
	return colors[Math.floor(randomNumber(0, colors.length-1))];
}

function randomNumber(min, max){
    return min + Math.random() * (max - min);
}