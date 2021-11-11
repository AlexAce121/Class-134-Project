function setup() {
    canvas = createCanvas(380 , 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380 ,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects" ;
}

img = "";
statuses = "";
objects = [];
alarm = "";

function preload() {
    img = loadImage('dog_cat.jpg')
    alarm=loadSound("Alarm.mp3");
}

function draw() {
    image(video , 0 , 0 , 380 , 380);
    
    if (statuses != "") {
        r = random(255);
        g = random(255);
        b = random(255);     


        objectDetector.detect(video , gotResult)
       for (i = 0; i < objects.length; i++) { 
           if (objects[i]=="person") {
            document.getElementById("status").innerHTML = "Status: Baby Detected" ;
           } else {
            document.getElementById("status").innerHTML = "Status: Baby Not Detected" ; 
            alarm.play();
           }
       
        
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
       rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
       }
    }
}

function modelLoaded() {
    console.log('Model Loaded');
    statuses = true;
    
}

function gotResult(error , results) {
    if (error) {
       console.log(error); 
    }
    console.log(results);
    objects = results;
}