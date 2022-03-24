status1 = "";
objects = [];

function preload(){
    music = loadSound("audio.mp3");
    
}

function draw(){
    image(video,0,0,380,380);
    if (status1 != ''){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotresults);
        for (i = 0; i < objects.length; i++){
         document.getElementById("status").innerHTML = "Objects Detected";
         fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label+"  " +percent + "%" ,objects[i].x+15,objects[i].y+15);
        nofill(); 
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if (objects[i].label = "person"){
            document.getElementById("status").innerHTML = "Baby has been detected";
            music.stop();
        }
        else {
            document.getElementById("status").innerHTML = "Baby is not detected";
            music.play();
        }
        }
        if (objects.length == 0){
            document.getElementById("status").innerHTML = "Baby Not Found";
            music.play();
        }
    }
}


function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetecter = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML = "Model is detecting objects";

}

function modelloaded(){
    console.log("MODEL HAS LOADED SUCCESFULLY !!");
    status1 = true;
  }

  function gotresults(error,results){
    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        objects = results;
    }
}
