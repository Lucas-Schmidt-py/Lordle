let row = 0;
let collum = 0;
let current_word= "";
let word_lenght = 5;
let row_lenght = 6;

function wordInput (letter){
    if(letter==='ENTER'){      
        //if(in_list(current_word)){
            //trigger color change and animation  
            collum = 0;
            row += 1;
            current_word= "";        

            if(row===row_lenght){
                //result screen
            }
        //}
    }else{
        if(collum < word_lenght && row < row_lenght){
            if(letter==='SPACE'){
                letter='/'
            }
            current_word += letter;
            let all_tiles = document.querySelectorAll('game-tile');
            all_tiles[row*word_lenght+collum].innerHTML = letter;
            collum += 1;
        }
    }
    document.getElementById('test').innerHTML = current_word;
}

function wordDes(){
    if(collum!==0){
        collum -= 1;
        current_word = current_word.slice(0, -1);
        let all_tiles = document.querySelectorAll('game-tile');
        all_tiles[row*word_lenght+collum].innerHTML = " ";        
    }
}