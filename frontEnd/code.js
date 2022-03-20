

function WordAdd (letter,souce) {
    document.getElementById(souce).innerHTML += letter;
}

function WordInput (letter){
    WordAdd(letter,'Word1');
}

function WordDes(){
    WordDel('Word1');
}

function WordDel(souce){
    let str = (document.getElementById(souce).innerHTML).slice(0, -1);
    document.getElementById('Word1').innerHTML = str
}

function on() {
    document.getElementById("overlay").style.display = "block";
  }
  
  function off() {
    document.getElementById("overlay").style.display = "none";
  } 