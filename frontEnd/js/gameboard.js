let row = 0;
let collumn = 0;
let current_word= "";
const WORD_LENGTH = 5;
const ROW_COUNT = 6;
const CHAMP_SET = new Set(['AKALI','AMUMU','ANNIE','BRAND','BRAUM','CORKI','DIANA','ELISE','FIORA','GALIO','GAREN','IVERN','JANNA','JAYCE','KARMA','KAYLE','LEONA','MUNDO','NASUS','NEEKO','POPPY','QUINN','RAKAN','RIVEN','SENNA','SHACO','SIVIR','SWAIN','SYLAS','TALON','TARIC','TEEMO','URGOT','VARUS','VAYNE','VIEGO','XAYAH','YASUO','YUUMI','ZIGGS']);

function wordInput (letter){
    if(letter==='ENTER'){   
        if(CHAMP_SET.has(current_word)){
            //if(wordGuessed) --> WIN
            //trigger color change and animation
            colorChange(row, '12312');  
            collumn = 0;
            row += 1;            
            current_word= "";

            if(row===ROW_COUNT){
                //result screen LOSE
            }
        }
        else{
            //nicht möglich Animation
        }
    }else{
        if(collumn < WORD_LENGTH && row < ROW_COUNT){
            if(letter==='SPACE'){
                letter='/'
            }
            current_word += letter;
            let all_tiles = document.querySelectorAll('game-tile');
            all_tiles[row*WORD_LENGTH+collumn].innerHTML = letter;
            all_tiles[row*WORD_LENGTH+collumn].style.border = '2px solid #878A8C'
            all_tiles[row*WORD_LENGTH+collumn].style.animation = 'highlight 200ms ease 0s 1 normal forwards';
            collumn += 1;
        }
    }
}

function wordDes(){
    if(collumn!==0){
        collumn -= 1;
        current_word = current_word.slice(0, -1);
        let all_tiles = document.querySelectorAll('game-tile');
        all_tiles[row*WORD_LENGTH+collumn].innerHTML = "";
        all_tiles[row*WORD_LENGTH+collumn].style.border = '2px solid #D3D6DA'
        all_tiles[row*WORD_LENGTH+collumn].style.animation = '';        
    }

}

//input: 2 strings 
/**description: for each position in ROW_COUNT concatenate a str corresponding whether the letter 
is (1)in the same position, (2) included, (3) or not included in str2**/
function compareWords(str1, str2){
    str1 = str1.toUpperCase();
    str2 = str2.toUpperCase();
    let result_array = new Array(WORD_LENGTH);
    let letters_not_found = Array.from(str2);

    for(let i = 0; i < WORD_LENGTH; i++){
        if(i >= str1.length || i >= str2.length) continue;
        if(str1[i] === str2[i]){
            result_array[i] = '1';
            letters_not_found[i] = null;
        }
    }

    for(let i = 0; i < WORD_LENGTH; i++){
        if(result_array[i] === undefined){
            index = letters_not_found.indexOf(str1[i]);
            if(index === -1){
                result_array[i] = '3';
            }
            else{
                result_array[i] = '2';
                letters_not_found[index] = null;
            }
        }
    }
    return result_array.join('');
}

//changes background color in currenRow based on comp_str
async function colorChange(currentRow, comp_str){
    let all_tiles = document.querySelectorAll('game-tile');
    for(let i = 0; i < WORD_LENGTH; i++){
        current_tile = all_tiles[currentRow*WORD_LENGTH + i];
        current_tile.style.animation = 'flip-out-hor-top 0.45s cubic-bezier(0.550, 0.085, 0.680, 0.530) both';
        await delay(300);
        
        //WIP COLOR
        if(comp_str[i] === '1') current_tile.style.backgroundColor = '#6AAA64';
        if(comp_str[i] === '2') current_tile.style.backgroundColor = '#C9B458';
        if(comp_str[i] === '3') current_tile.style.backgroundColor = '#787C7E';
        current_tile.style.color = 'white';
        current_tile.style.border = 'none';
        current_tile.style.paddingTop = '22%';
        current_tile.style.animation = 'flip-in-hor-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
    }
}

function delay(time){
    return new Promise(resolve => setTimeout(resolve, time));
}