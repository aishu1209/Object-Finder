status1 = "";
object_name = "";

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
}