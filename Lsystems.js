/**
 * L-systems 0.2
 * https://github.com/davidpaulrosser/Scriptographer-Scripts
 * 
 * An Adobe Illustrator Scriptpgrapher 2.9.072 script 
 * 
 * Created by David Paul Rosser on 28/10/2011. Copyright 2011 David Paul Rosser.
 * All rights reserved.
 * 
 * 
 * This script is heavly based off the principles and techniques in The Algorithmic Beauty of Plants (ABOP)
 * The majority of the presets in this script are listed in ABOP.
 * http://algorithmicbotany.org/papers/#abop
 * 
 * 
 * To generate an Lsystem you can either use an existing preset or write your own using the following snippet:
 * 
 * var ls = new lsystem("Koch Curve", "F", {"F":"drawForward", "+":"turnLeft", "-":"turnRight"});
 * ls.rules.push(new ls.rule("F", "F+F-F-F+F"));
 * ls.draw(4, 90, 0, 10, {x:0, y:0});
 * 
 * 
 * tip - Use 'enter' to generate
 * 
 */

/**
 * Presets
 */
var presets = {}, activePreset = {};

presets["Koch Curve"] = {
    axiom:"F",
    iterations:4,
    angle:90,
    startingAngle:0,
    stepSize:10,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "+":"turnLeft", "-":"turnRight"},
    rules:[{production:"F", sucessor:["F+F-F-F+F"]}]
};

presets["Quadratic Koch Island"] = {
    axiom:"F-F-F-F",
    iterations:4,
    angle:90,
    startingAngle:0,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "+":"turnLeft", "-":"turnRight"},
    rules:[{production:"F", sucessor:["F-F+F+FF-F-F+F"]}]
};

presets["Koch Snowflake"] = {
    axiom:"F--F--F",
    iterations:4,
    angle:60,
    startingAngle:0,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "+":"turnLeft", "-":"turnRight"},
    rules:[{production:"F", sucessor:["F+F--F+F"]}]
};

presets["Koch AntiSnowflake"] = {
    axiom:"F++F++F",
    iterations:4,
    angle:60,
    startingAngle:0,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "+":"turnLeft", "-":"turnRight"},
    rules:[{production:"F", sucessor:["F+F--F+F"]}]
};

presets["Island and lakes"] = {
    axiom:"F+F+F+F",
    iterations:2,
    angle:90,
    startingAngle:0,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "f":"moveForward", "+":"turnLeft", "-":"turnRight"},
    rules:[{production:"F", sucessor:["F+f-FF+F+FF+Ff+FF-f+FF-F-FF-Ff-FFF"]}, {production:"f", sucessor:["ffffff"]}]
};

presets["Koch Curve Fig. 1.9 a"] = {
    axiom:"F-F-F-F",
    iterations:3,
    angle:90,
    startingAngle:0,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward","+":"turnLeft", "-":"turnRight"},
    rules:[{production:"F", sucessor:["FF-F-F-F-F-F+F"]}]
};

presets["Koch Curve Fig. 1.9 b"]= {
    axiom:"F-F-F-F",
    iterations:4,
    angle:90,
    startingAngle:0,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward","+":"turnLeft", "-":"turnRight"},
    rules:[{production:"F", sucessor:["FF-F-F-F-FF"]}]
};

presets["Koch Curve Fig. 1.9 c"]= {
    axiom:"F-F-F-F",
    iterations:4,
    angle:90,
    startingAngle:0,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward","+":"turnLeft", "-":"turnRight"},
    rules:[{production:"F", sucessor:["FF-F+F-F-FF"]}]
};

presets["Koch Curve Fig. 1.9 d"]= {
    axiom:"F-F-F-F",
    iterations:4,
    angle:90,
    startingAngle:0,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward","+":"turnLeft", "-":"turnRight"},
    rules:[{production:"F", sucessor:["FF-F--F-F"]}]
};

presets["Koch Curve Fig. 1.9 e"]= {
    axiom:"F-F-F-F",
    iterations:5,
    angle:90,
    startingAngle:0,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward","+":"turnLeft", "-":"turnRight"},
    rules:[{production:"F", sucessor:["F-FF--F-F"]}]
};

presets["Koch Curve Fig. 1.9 f"]= {
    axiom:"F-F-F-F",
    iterations:5,
    angle:90,
    startingAngle:0,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward","+":"turnLeft", "-":"turnRight"},
    rules:[{production:"F", sucessor:["F-F+F-F-F"]}]
};

presets["Plant Fig. 1.24 a"] = {
    axiom:"F",
    iterations:5,
    angle:27.5,
    startingAngle:-90,
    stepSize:10,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "+":"turnLeft", "-":"turnRight", "[":"pushState", "]":"popState"},
    rules:[{production:"F", sucessor:["F[+F]F[-F]F"]}]
};

presets["Plant Fig. 1.24 b"] = {
    axiom:"F",
    iterations:5,
    angle:20,
    startingAngle:-90,
    stepSize:10,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "+":"turnLeft", "-":"turnRight", "[":"pushState", "]":"popState"},
    rules:[{production:"F", sucessor:["F[+F]F[-F][F]"]}]
};

presets["Plant Fig. 1.24 c"] = {
    axiom:"F",
    iterations:3,
    angle:22.5,
    startingAngle:-90,
    stepSize:15,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "+":"turnLeft", "-":"turnRight", "[":"pushState", "]":"popState"},
    rules:[{production:"F", sucessor:["FF-[-F+F+F]+[+F-F-F]"]}]
};

presets["Plant Fig. 1.24 d"] = {
    axiom:"X",
    iterations:7,
    angle:20,
    startingAngle:-90,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "+":"turnLeft", "-":"turnRight", "[":"pushState", "]":"popState"},
    rules:[{production:"X", sucessor:["F[+X]F[-X]+X"]}, {production:"F", sucessor:["FF"]}]
};

presets["Plant Fig. 1.24 e"] = {
    axiom:"X",
    iterations:7,
    angle:25.7,
    startingAngle:-90,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "+":"turnLeft", "-":"turnRight", "[":"pushState", "]":"popState"},
    rules:[{production:"X", sucessor:["F[+X][-X]FX"]}, {production:"F", sucessor:["FF"]}]
};

presets["Plant Fig. 1.24 f"] = {
    axiom:"X",
    iterations:5,
    angle:22.5,
    startingAngle:-90,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "+":"turnLeft", "-":"turnRight", "[":"pushState", "]":"popState"},
    rules:[{production:"X", sucessor:["F-[[X]+X]+F[+FX]-X"]}, {production:"F", sucessor:["FF"]}]
};

presets["Stochastic plant Fig. 1.27"] = {
    axiom:"F",
    iterations:5,
    angle:22.5,
    startingAngle:-90,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "+":"turnLeft", "-":"turnRight", "[":"pushState", "]":"popState"},
    rules:[{production:"F", sucessor: ["F[+F]F[-F]F", "F[+F]F", "F[-F]F"], probability:[0.3, 0.3, 0.4]}]
};

presets["Sierpinski Triangle"] = {
    axiom:"F-G-G",
    iterations:8,
    angle:120,
    startingAngle:180,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "G":"drawForward", "+":"turnLeft", "-":"turnRight"},
    rules:[{production:"F", sucessor: ["F-G+F+G-F"]}, {production:"G", sucessor: ["GG"]}]
};

presets["Carpet"] = {
    axiom:"F-F-F-F",
    iterations:4,
    angle:90,
    startingAngle:0,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "+":"turnLeft", "-":"turnRight", "[":"pushState", "]":"popState"},
    rules:[{production:"F", sucessor: ["F[F]-F+F[--F]+F-F"]}]
};

presets["Dragon Curve"] = {
    axiom:"FX",
    iterations:10,
    angle:90,
    startingAngle:0,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "+":"turnLeft", "-":"turnRight", "[":"pushState", "]":"popState"},
    rules:[{production:"X", sucessor: ["X+YF"]}, {production:"Y", sucessor: ["FX-Y"]}]
};

presets["Levy Curve"] = {
    axiom:"F",
    iterations:6,
    angle:45,
    startingAngle:0,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "+":"turnLeft", "-":"turnRight"},
    rules:[{production:"F", sucessor: ["+F--F+"]}]
};

presets["McWorter's Pentigree"] = {
    axiom:"F",
    iterations:3,
    angle:36,
    startingAngle:0,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "+":"turnLeft", "-":"turnRight"},
    rules:[{production:"F", sucessor: ["+F++F----F--F++F++F-"]}]
};

presets["Pentadentrite"] = {
    axiom:"F",
    iterations:3,
    angle:72,
    startingAngle:0,
    stepSize:5,
    position:{x:0, y:0},
    commandsMap:{"F":"drawForward", "+":"turnLeft", "-":"turnRight"},
    rules:[{production:"F", sucessor: ["F+F-F--F+F+F"]}]
};

configure(activePreset, presets["Koch Curve"]);

/**
 * lsystem generator
 * @prop id {String} - The name of the lsystem
 * @prop axiom {String} - The starting production rule
 * @prop commandsMap {Object} - A object that maps the drawing constants to drawing commands, it's easier to add more this way
 * @prop rules {Array} - An array to contain all the rules for the lsystem
 * @prop turtleInstructions {String} - The set of instructions that gets generated from the string re-writing process
 */
var lsystem = function(id, axiom, commandsMap){
    
    this.id = id;
    this.axiom = axiom;
    this.commandsMap = commandsMap;
    this.rules = [];
    this.turtleInstructions = "";
}

/**
 * lsystem constants
 * @prop DRAW_FORWARD {String} - The move forward and draw command
 * @prop MOVE_FORWARD {String} - The move forward without drawing command
 * @prop TURN_LEFT {String} - Turn left command
 * @prop TURN_RIGHT {String} - Turn right command
 * @prop PUSH_STATE {String} - Push the current state of the turtle command
 * @prop POP_STATE {String} - Pop the current state of the turtle back to it's previous command
 */
lsystem.constants = {
        
    DRAW_FORWARD:"drawForward",
    MOVE_FORWARD:"moveForward",
    TURN_LEFT:"turnLeft",
    TURN_RIGHT:"turnRight",
    PUSH_STATE:"pushState",
    POP_STATE:"popState"
}

/**
 * lsystem rule
 * @param production {String} - The production rule - which will get replaced by the successor
 * @param sucessor {Array} - The sucessor, an array of sucessive rules that determine the outcome. Only a single rule if there's no probabilties set
 * @param probability {Array} - An array of probabilties that act as weights to detmine the outcome of the sucessor.
 */
lsystem.prototype.rule = function(production, sucessor, probability){
    
    this.production = production;
    this.successor = sucessor;
    this.probabilities = probability;
    var totalWeights = 0;
    
    if(probability){
                
        for (var i = 0; i < probability.length; i++) {
            totalWeights += probability[i];
        }
        
        if(totalWeights > 1) throw "The probabilities must add up to the sum of 1";
    }
   
    /**
    * lsystem rule getSucessor
    * @return sucessor {String} A sucessor to the production rule. If this is an Stochastic lsystem the outcome will be affected by the probability weights set for each sucessor
    */
    this.getSucessor = function(){
       
        if(probability){
           
            var randomNum = Math.random()*totalWeights;
            var randomProbability = "";

            for (var i = 0; i < this.probabilities.length; i++) {

                if(randomNum >= this.probabilities[i]){

                    randomProbability = this.successor[i];

                    break;
                }
            }
           
            return randomProbability;
 
        } else {
           
            return this.successor[0];
        }      
    }
}

/**
 * lsystem generate
 * @param iterations {int} - The number of lsystem generations. The strings can get expotentially large so don't stray too far away from the preset defaults
 * @return currentGeneration {String} - The current string generation
 */
lsystem.prototype.generate = function(iterations){

    print('lsystems::generate() ' + this.id + " - generations:" + iterations);
    
    var _iterations = Math.floor(iterations+1);
    var nextGeneration, currentGeneration;
            
    for(var i = 0; i < _iterations; i++){
        
        nextGeneration = "";
        
        if(i == 0){
            
            currentGeneration = this.axiom
           
        } else {
            
            nextGeneration = currentGeneration;
            currentGeneration = "";
            
            for(var j = 0; j < nextGeneration.length; j++){
            
                var character = nextGeneration.charAt(j);
            
                for(var k = 0; k < this.rules.length; k++){
                    
                    var production = this.rules[k].production;
                    var successor = this.rules[k].getSucessor();
                                                        
                    if(character == production){                               
                        character = successor;
                    }  
                }
            
                currentGeneration += character;
            }
        }
        
    //print("Lsystems::generate() n:" + i + " " + currentGeneration);
    }
        
    return currentGeneration;
}

/**
 * turtle
 * @prop style {Object} - An object for the path style
 * @prop angle {Number} - The constant angle for the left and right turns
 * @prop stepSize {Number} - The amount of pixels the turtle will draw or move forward to
 * @prop states {Array} - The array of states - mainly used for Bracketed OL-systems. This will always default to one.
 */
var turtle = function(){
    this.style;
    this.angle;
    this.stepSize;
    this.states;
    this.currentState;
    
    this.init = function(){
        this.configureStyles();
    }
            
    this.resetStyles = function(){
        
        configure(paletteStylesValues, paletteStylesResetValues);
        this.configureStyles();
    }
    
    this.configureStyles = function(){
        
        // Set line fill
        var fillColor = (paletteStylesValues.linesFill) ? fillColor = paletteStylesValues.fillColor : fillColor = null;
        
        this.style = {
            strokeColor:paletteStylesValues.strokeColor,
            fillColor: fillColor,
            strokeWidth: paletteStylesValues.strokeWidth,
            strokeCap:paletteStylesValues.strokeCap,
            strokeJoin:paletteStylesValues.strokeJoin
        }  
    }
    
    this.reset = function(){        
        this.angle = 0;
        this.stepSize = 10;
        this.states = [];
        this.currentState = null;  
    }
}

/**
 * turtle state
 * @param position {Point} - The current position of the turtle
 * @param lastPosition {Point} - The last position of the turtle
 * @param angle {Number} - The current angle of the turtle
 */
turtle.prototype.state = function(position, angle){
    this.position = new Point(position.x, position.y);
    this.lastPosition = new Point(position.x, position.y);
    this.angle = angle;
}
var t = new turtle();

/**
 * lsystem draw
 * @param iterations {int} - The amount of generations to generate
 * @param angle {Number} - The constant angle for the turtle
 * @param startAngle {Number} - The starting angle of the turtle
 * @param stepSize {Number} - The amount of pixels the turtle will draw or move forward to
 * @param position {Point} - The inital turtle position
 */
lsystem.prototype.draw = function(iterations, angle, startAngle, stepSize, position){
        
    this.iterations = iterations;
    
    t.reset();
    t.configureStyles();
    t.angle = angle;
    t.stepSize = stepSize;
    t.states.push(new t.state(position, startAngle));
    t.currentState = t.states[0];
    
    var path = new Path();
    path.add(t.currentState.position);
    path.style = t.style;
    
    var text;
            
    this.turtleInstructions = this.generate(iterations);
                
    for (var i = 0; i < this.turtleInstructions.length; i++) {
        
        var instruction = this.turtleInstructions.charAt(i);
        var command = this.commandsMap[instruction];
        
        addStyles(command);
        
        t.currentState.lastPosition.x = t.currentState.position.x;
        t.currentState.lastPosition.y = t.currentState.position.y;
                        
        switch(command){
            
            case lsystem.constants.DRAW_FORWARD:
                                                
                t.currentState.position.x += Math.cos(t.currentState.angle.toRadians()) * t.stepSize;
                t.currentState.position.y += Math.sin(t.currentState.angle.toRadians()) * t.stepSize;
                path.lineTo(t.currentState.position);    
               
                break;
                
            case lsystem.constants.MOVE_FORWARD:
                
                t.currentState.position.x += Math.cos(t.currentState.angle.toRadians()) * t.stepSize;
                t.currentState.position.y += Math.sin(t.currentState.angle.toRadians()) * t.stepSize;
                path = new Path();
                path.add(t.currentState.position); 
                
                break;
                
                
            case lsystem.constants.TURN_LEFT:
                
                t.currentState.angle += -t.angle;
                checkTurtleAngle();
                
                break;
                
                
            case lsystem.constants.TURN_RIGHT:
                
                t.currentState.angle += t.angle;
                checkTurtleAngle();
                
                break;
                
                
            case lsystem.constants.PUSH_STATE:
                
                var index = t.states.length-1;
                var newState = new t.state({
                    x:t.states[index].position.x, 
                    y:t.states[index].position.y
                }, t.states[index].angle);
                
                path.add(newState.position); 
                t.states.push(newState);
                
                t.currentState = t.states[t.states.length-1];
                         
                break;
                
                
            case lsystem.constants.POP_STATE:
                
                t.states.pop();
                
                var index = t.states.length-1;
                t.currentState.position.x = t.states[index].position.x;
                t.currentState.position.y = t.states[index].position.y;
                t.currentState.angle = t.states[index].angle;
                path.add(t.currentState.position);
                
                t.currentState = t.states[t.states.length-1];
                
                break;
        }
        
    }
        
    function addStyles(command){
        
        if(paletteStylesValues.type){
            
            if(text == undefined){
                text = new PointText(t.currentState.position);
            }

            if(t.currentState.position != t.currentState.lastPosition){
                text = new PointText(t.currentState.position);
            }
            
            text.content += instruction;
            
            var textRange = text.range.words[0]; 
            textRange.characterStyle.fontSize = paletteStylesValues.typeSize;
            textRange.characterStyle.fillColor = paletteStylesValues.typeColor;
        }
    }
    
    function checkTurtleAngle(){
        if (t.currentState.angle > 360)
            t.currentState.angle - 360;
    }
}

/**
 * Palettes
 */
var presetKeysArray = [];
for(var key in presets){
    presetKeysArray.push(key);
}

/**
 * Settings
 */
var paletteSettingsValues = {};
configure(paletteSettingsValues, activePreset);

/**
 * Styles
 */
var paletteStylesResetValues = {}, paletteStylesValues = {
    strokeColor:new RGBColor([0,0,0]),
    strokeWidth:0.2,
    fillColor: new RGBColor([1,1,1]),
    linesFill:false,
    strokeCap:"round",
    strokeJoin:"round",
    type:true,
    typeSize:3,
    typeColor:new RGBColor([1,0,0])
};
configure(paletteStylesResetValues, paletteStylesValues);

var paletteSettingsComponents = {

    presetsList:{
        type: "list", 
        label:"Presets",
        value:"Select a preset",
        options:presetKeysArray,
        onChange:function(value){
            configure(paletteSettingsValues, presets[value]);
        }
    },
    iterations:{
        type:"number",
        label:"Iterations",
        value:paletteSettingsValues.iterations
    },
    angle:{
        type:"number",
        label:"Angle",
        value:paletteSettingsValues.angle
    },
    startingAngle:{
        type:"number",
        label:"Starting angle",
        value:paletteSettingsValues.startingAngle
    },
    stepSize:{
        type:"number",
        label:"Step size",
        value:paletteSettingsValues.stepSize
    },
    generate:{
        type:"button",
        label:"",
        value:"Generate",
        onClick:function(){
            generatePreset();
        }
    },
    divider1:{
        type: 'ruler'
    },
    text: {
        type: "text", 
        label: "",
        value: "Lsystems.js 0.2"
    }
};

var paletteStylesComponents = {
    
    linesFill:{
        type:"checkbox",
        label:"Lines fill",
        value:paletteStylesValues.linesFill
    },
    strokeColor:{
        type:"color",
        label:"Line color",
        value:paletteStylesValues.strokeColor
    },
    fillColor:{
        type:"color",
        label:"Fill color",
        value:paletteStylesValues.fillColor
    },
    strokeWidth:{
        type:"number",
        label:"Line width",
        value:paletteStylesValues.strokeWidth,
        range:[0.1, 50],
        fractionDigits:1,
        increment:0.1
    },
    divider1:{
        type:"ruler"  
    },
    type:{
        type:"checkbox",
        label:"Show type",
        value:paletteStylesValues.type
    },
    typeColor:{
        type:"color",
        label:"Type color",
        value:paletteStylesValues.typeColor
    },
    typeSize:{
        type:"number",
        label:"Type size",
        value:paletteStylesValues.typeSize,
        range:[0.1, 10],
        increments:0.1
    },
    resetStyles:{
        type:"button",
        value:"Reset style",
        onClick:function(){
            t.resetStyles();
        }
    }
};

var settingsPalette = new Palette("Lsystem settings", paletteSettingsComponents, paletteSettingsValues);
var stylesPalette = new Palette("Lsystem styles", paletteStylesComponents, paletteStylesValues);

/**
 * Generate a new lsystem from the selected preset
 */
function generatePreset(){
    
    configure(activePreset, paletteSettingsValues);
    
    var id = presetKeysArray[paletteSettingsComponents.presetsList.selectedIndex];
        
    var ls = new lsystem(id, activePreset.axiom, activePreset.commandsMap);
    for (var i = 0; i < activePreset.rules.length; i++) {
        if(activePreset.rules[i].probability){
            ls.rules.push(new ls.rule(activePreset.rules[i].production, activePreset.rules[i].sucessor, activePreset.rules[i].probability));
        } else {
            ls.rules.push(new ls.rule(activePreset.rules[i].production, activePreset.rules[i].sucessor));
        }
    }
    ls.draw(activePreset.iterations, activePreset.angle, activePreset.startingAngle, activePreset.stepSize, activePreset.position);
}

t.init();

/**
 * Keyboard events
 */
function onKeyDown(event) { 
    if(event.keyCode == 'return') { 
        generatePreset();
    } 
} 

/**
 * Utils
 */
function configure(config, settings) {

    for(var prop in settings) {
        config[prop] = settings[prop];
    }
}