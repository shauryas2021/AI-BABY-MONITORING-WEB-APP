status = "";
baby = [];
alarm = "";
function preload(){
alarm = loadSound("ringing_old_phone.mp3")
}
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}
function gotResult(error, results){
    if (error){
        console.log(error);
    }
console.log(results);
baby = results;
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < baby.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected!";
            fill(r,g,b);
            percent = floor(baby[i].confidence * 100);
            text(baby[i].label + "" + percent + "%", baby[i].x + 15, baby[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(baby[i].x, baby[i].y, baby[i].width, baby[i].height);
        
        if (baby[i].label == "person"){
            document.getElementById("detection_of_baby").innerHTML = "Baby Found";
alarm.stop();
        }
        else {
           
            document.getElementById("detection_of_baby").innerHTML = "Baby Not Found";
            alarm.play();
        }
    }
        if (baby.length == 0){
            
            document.getElementById("detection_of_baby").innerHTML = "Baby Not Found";
            alarm.play();
    }
    }
   

}
