let word1 = false
let word2 = false
let word3 = false
let word4 = false
let word5 = false
let word6 = false
let current_word= ""

function WordInput (letter){
    WordAdd(letter);
}

function WordDes(){
    WordDel();
}

function WordAdd (letter){
    current_word += letter;
    document.getElementById('test').innerHTML = current_word;
}

function WordDel(){
    current_word = current_word.slice(0, -1);
    document.getElementById('test').innerHTML = current_word;
}