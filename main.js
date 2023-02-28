status1 = "";
object_name = "";
objects = [];

function setup(){
    canvas = createCanvas(600,420);
    canvas.position(400,300);

    video = createCapture(VIDEO);
    video.size(600,420);
    video.hide();

}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("model loaded");
    status1 = true;
}

function draw(){
    image(video,0,0,600,420);

    if(status1 != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            percent = floor(100 * objects[i].confidence);
            fill('#00BFFF');
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke('#00BFFF');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = "Object Mentioned Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name);
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML = "Object Mentioned Not Found";
            }
            
        }
    }
}

function gotResult(error,results){

    if(error){
        console.log(error);

    }
    console.log(results);
    objects = results;

    
}