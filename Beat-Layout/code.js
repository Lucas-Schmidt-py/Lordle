function firstWord (letter) {
    document.getElementById('Word1').innerHTML += letter;
}

function WordInput (letter){
    firstWord(letter);
}

function WordDes(){
    firstDel();
}

function firstDel(){
    let str = (document.getElementById('Word1').innerHTML).slice(0, -1);
    document.getElementById('Word1').innerHTML = str
}