var region = new Rectangle(0, 0, 400, 400);
var numberOfNodes = 100;
var nodesArray = [];
var nodeDistanceThreshold = 60;
var colors = ["#576372", "#5CC4BE", "#C8DC67", "#F26B6C", "#F6D86B", "#F26B43"];

for(var i = 0; i < numberOfNodes; i++){
    
    var x = randomNumber(0, region.width);
    var y = randomNumber(0, region.height);
    var radius = randomNumber(1, 30);
    
    createNode(x, y, radius);
}

for(var j = 0; j < nodesArray.length; j++){
    
    for(var k = 0; k < nodesArray.length; k++){
              
        var vector = nodesArray[j].position - nodesArray[k].position;
        
        if(Math.floor(vector.length) < nodeDistanceThreshold){
        
            var connectedLine = new Path.Line(nodesArray[j].position, nodesArray[k].position){
                strokeColor:getRandomColor(),
                opacity:0.2
            };
        }
    }
}

function createNode(x, y, radius){
    
    var node = new Path.Circle(new Point(x ,y), radius) {
        fillColor:getRandomColor(),
        blendMode:"multiply",
        opacity:1
    };
    
    nodesArray.push(node);    
}

function getRandomColor(){
	return colors[Math.floor(randomNumber(0, colors.length-1))];
}

function randomNumber(min, max){
    return min + Math.random() * (max - min);
}