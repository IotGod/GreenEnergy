$(document).ready(function() {
    $('input#amount, input#to, input#from, input#balance').characterCounter();
});

$(document).ready(function(){
    $('.tooltipped').tooltip();
});

function testClick() {
    alert("testClick")
}