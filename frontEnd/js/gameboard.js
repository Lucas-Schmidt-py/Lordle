let row = 0;
let collum = 0;
let current_word= "";
const WORD_LENGTH = 5;
const ROW_COUNT = 6;
const CHAMP_SET = new Set(['AKALI','AMUMU','ANNIE','BRAND','BRAUM','CORKI','DIANA','ELISE','FIORA','GALIO','GAREN','IVERN','JANNA','JAYCE','KARMA','KAYLE','LEONA','MUNDO','NASUS','NEEKO','POPPY','QUINN','RAKAN','RIVEN','SENNA','SHACO','SIVIR','SWAIN','SYLAS','TALON','TARIC','TEEMO','URGOT','VARUS','VAYNE','VIEGO','XAYAH','YASUO','YUUMI','ZIGGS']);
let result= '';

function createResult(){
    let i = Math.floor(Math.random() * CHAMP_SET.size);
    document.getElementById('test').innerHTML = Array.from(CHAMP_SET)[i]
    RESULT = Array.from(CHAMP_SET)[i];
}


function wordInput (letter){
    if(letter==='ENTER'){   
        if(CHAMP_SET.has(current_word)){
            //trigger color change and animation
            colorChange(row, compareWords(current_word,RESULT));
            collum = 0;
            row += 1;            
            current_word= "";
        }
        else{
            let all_tiles = document.querySelectorAll('game-tile'); 
            for (let i = 0;i<WORD_LENGTH;i++){
                let current_tile = all_tiles[row*WORD_LENGTH+i]  
                current_tile.style.animation='none';
                void current_tile.offsetWidth;
                current_tile.style.animation= 'shake-horizontal .5s cubic-bezier(.455,.03,.515,.955) both';                
            }
        }
    }else{
        if(collum < WORD_LENGTH && row < ROW_COUNT){
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

function judge(code){
    for(let i =0;i<code.length;i++){
        if(code[i]!='1'){
            return false;
        }
    }
    return true;
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
        await delay(200);
        
        //WIP COLOR
        if(comp_str[i] === '1') current_tile.style.backgroundColor = 'green';
        if(comp_str[i] === '2') current_tile.style.backgroundColor = 'yellow';
        if(comp_str[i] === '3') current_tile.style.backgroundColor = 'gray';
        current_tile.style.animation = 'flip-in-hor-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
    }

    await delay(500)
    if(judge(comp_str)){
        document.getElementById('win_layer').style.display = 'block';    
    }else if(currentRow+1===ROW_COUNT){
        document.getElementById('win_layer').style.display = 'block'; 
        document.getElementById('game_result').innerHTML = 'You Loose'
    }
    
}

function delay(time){
    return new Promise(resolve => setTimeout(resolve, time));
}