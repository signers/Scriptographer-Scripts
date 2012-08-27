var region = new Rectangle(0, 0, 400, 400);
var colors = ["#576372", "#5CC4BE", "#C8DC67", "#F26B6C", "#F6D86B", "#F26B43"];
var numberOfLines = 500;

for(var i = 0; i < numberOfLines; i++){
    
    var lineStart = new Point(randomNumber(0, region.width), randomNumber(0, region.height));
    var lineEnd = new Point(randomNumber(0, region.width), randomNumber(0, region.height));
    var path = new Path.Line(lineStart, lineEnd);
    
    path.style.strokeColor = getRandomColor();
    path.opacity = randomNumber(0.5, 1);
}

function getRandomColor(){
	return colors[Math.floor(randomNumber(0, colors.length-1))];
}

function randomNumber(min, max){
    return min + Math.random() * (max - min);
}