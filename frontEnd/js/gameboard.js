let row = 0;
let collum = 0;
let current_word= "";
let WORD_LENGTH = 5;
let ROW_LENGTH = 6;



function wordInput (letter){
    document.getElementById('test').innerHTML = compareWords('etere','there')
    if(letter==='ENTER'){      
        //if(in_list(current_word)){
            //trigger color change and animation  
            collum = 0;
            row += 1;            
            current_word= "";


            if(row===ROW_LENGTH){
                //result screen
            }
        //}
    }else{
        if(collum < WORD_LENGTH && row < ROW_LENGTH){
            if(letter==='SPACE'){
                letter='/'
            }
            current_word += letter;
            let all_tiles = document.querySelectorAll('game-tile');
            all_tiles[row*WORD_LENGTH+collum].innerHTML = letter;
            collum += 1;
        }
    }

}

function wordDes(){
    if(collum!==0){
        collum -= 1;
        current_word = current_word.slice(0, -1);
        let all_tiles = document.querySelectorAll('game-tile');
        all_tiles[row*WORD_LENGTH+collum].innerHTML = " ";        
    }

}

//removes word[index] from word
function removeChar(word, index){
    return word.slice(0,index) + word.slice(index + 1);
}


//input: 2 strings 
/**description: for each position in ROW_LENGTH concatenate a str corresponding whether the letter 
is (1)in the same position, (2) included, (3) or not included in str2**/
function compareWords(str1, str2){
    let result = '';
    let letters_not_found = str2;

    for(let i = 0; i < WORD_LENGTH; i++){
        if(i >= str1.length){
            result += '3';
            continue;
        }

        index = letters_not_found.indexOf(str1[i]);
        
        if(i < str2.length){
            if(str1[i] === str2[i]){
                result += '1';
                letters_not_found = removeChar(letters_not_found, index);
                continue;
            }
        }

        if(index !== -1){
            result += '2';
            letters_not_found = removeChar(letters_not_found, index);
        }
        else{
            result += '3';
        }
    }
    return result;
}