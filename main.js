objectDetector = "";

img = "";
objects = [];
status1 = "";

function preload() {

}


function setup() {
  canvas = createCanvas(600, 300);
  canvas.center();
  video = createCapture(VIDEO)
  video.size(600, 300);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Baby";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status1 = true;
  objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 640, 420);

  if (status1 != "") {
    r = random(255)
    g = random(255)
    b = random(255)
    objectDetector.detect(video, gotResult);
    for (var i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status : baby Detected";
      document.getElementById("number_of_objects").innerHTML = "Number of Baby detected are : " + objects.length

      fill(r, g, b);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke(r, g, b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}

function start() {
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting"
}