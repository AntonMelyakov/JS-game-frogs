function startgame(frogs) {
  let gameDiv = $('.game');
  let frogsArray = [];
  let frogsNumber = +frogs;
  let emptyLilia = {position: +frogs, direction: "noFrog"};

//put some css on game field:
function putGameBorder() {
let pixels = ((frogs*2)*80) + 80;
gameDiv.css({"width": pixels})
};

function drawLake(frogsArray){
  gameDiv[0].innerHTML = " ";
  for (var i = 0; i < frogsArray.length; i++) {
    let $div = $('<div>', {
      'class': frogsArray[i].direction,
      id: frogsArray[i].position
    });
    gameDiv.append($div);
  }
addEventsListeners();
};

function createLake(frogsNumber, frogsArray) {
  for (var i = 0; i < frogsNumber; i++) {
    let frog = new Frog("right", i);
    frogsArray.push(frog);
  };
  frogsArray.push(emptyLilia);
  for (var i = frogsNumber + 1; i <= frogsNumber * 2; i++) {
    let frog = new Frog("left", i);
    frogsArray.push(frog);
  };
};//createLake

function movement(x,y,frogsArray,id) {
  for (var i = 0; i < frogsArray.length; i++) {
    if(frogsArray[i].position == id) {
      if(frogsArray[(i+x)].direction  == "noFrog"){
        let oldPosition = frogsArray[i].position;
        let oldDirection = frogsArray[i].direction;

        frogsArray[i].position = frogsArray[(i+x)].position;
        frogsArray[i].direction = frogsArray[(i+x)].direction;

        frogsArray[(i+x)].position = oldPosition;
        frogsArray[(i+x)].direction = oldDirection;
        document.getElementById('message').innerHTML = "<h2>Moved!<h2>";
      }
    else if (frogsArray[(i+y)].direction  == "noFrog") {
      let oldPosition = frogsArray[i].position;
      let oldDirection = frogsArray[i].direction;

      frogsArray[i].position = frogsArray[(i+y)].position;
      frogsArray[i].direction = frogsArray[(i+y)].direction;

      frogsArray[i+y].position = oldPosition;
      frogsArray[i+y].direction = oldDirection;

      document.getElementById('message').innerHTML = "<h2>Moved!<h2>";
    }
    else {
      document.getElementById('message').innerHTML = "<h2>This frog is blocked<h2>";
    }
    break;
    };
  };
  drawLake(frogsArray);
  setTimeout(function(){winCheck()}, 1000);
}; //movement

function winCheck() {
  let allLeftFrogs = true; //if all frogs from the left are putted correctly

  for (var i = 0; i < frogsNumber; i++) {
    if(frogsArray[i].direction == 'right'){
      allLeftFrogs = false;
      break;
    }
  };

  if(allLeftFrogs){
    if(frogsArray[frogsNumber].direction == "noFrog") {
      document.getElementById('message').innerHTML = "<h1>YOU WIN<h1>";;
    };
  };
};

//eventListeners:
function addEventsListeners() {
$(".noFrog").on('click', function() {
document.getElementById('message').innerHTML = "<h1>You can move any frog here<h1>";
});

$(".right").on('click', function() {
  let $id = $(this)[0].id;
  movement(1,2,frogsArray,$id);
});

$(".left").on('click', function() {
  let $id = $(this)[0].id;
  movement(-1,-2,frogsArray,$id);
});

}; //listeners

createLake(frogsNumber, frogsArray);
drawLake(frogsArray);
putGameBorder();
};
