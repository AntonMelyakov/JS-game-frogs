(function() {
let $lake = $('.lake');
let $firstPanel = $('.firstPanel')

$('.btn').on("click", function() {
  let frogs = $('.howManyFrogs').val();
  start(frogs);
})

function start(frogs) {
$firstPanel.html('');
$lake.html('<div id="message"><h2>Every frog can jump over one water lily.You should move all of them<h2></div><div class="game"></div>');
startgame(frogs);
};
}) ();
