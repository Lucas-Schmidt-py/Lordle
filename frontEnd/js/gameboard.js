let row = 0;
let collumn = 0;
let current_word= "";
let lose = false;
let board_access = true;
const WORD_LENGTH = 6;
const ROW_COUNT = 6;
const CHAMP_SET = new Set(['DRAVEN', 'TALON', 'SORAKA', 'JARVAN', 'SONA', 'RENGAR', 'VEIGAR', 'RAKAN', 'RYZE', 'KAYN', 'AKSHAN', 'RENATA', 'ANIVIA', 'SHACO', 'AMUMU', 'RUMBLE', 'VAYNE', 'ZIGGS', 'BARD', 'LULU', 'TAHM', 'PYKE', 'ORNN', 'EKKO', 'WUKONG', 'KLED', 'YONE', 'XERATH', 'SIVIR', 'MAOKAI', 'DIANA', 'JHIN', 'AKALI', 'THRESH', 'GALIO', 'QUINN', 'DARIUS', 'ZILEAN', 'MUNDO', 'LILLIA', 'ILLAOI', 'RELL', 'SENNA', 'XAYAH', 'GRAGAS', 'EZREAL', 'SINGED', 'AATROX', 'TARIC', 'GRAVES', 'VIEGO', 'SHEN', 'KAYLE', 'ASHE', 'BRAND', 'GAREN', 'LUCIAN', 'TEEMO', 'POPPY', 'SETT', 'FIORA', 'JINX', 'JANNA', 'FIZZ', 'SION', 'QIYANA', 'SAMIRA', 'NEEKO', 'YUUMI', 'YORICK', 'OLAF', 'YASUO', 'SYLAS', 'UDYR', 'VIKTOR', 'NASUS', 'TWITCH', 'IVERN', 'KARMA', 'SWAIN', 'NUNU', 'URGOT', 'NAMI', 'ANNIE', 'BRAUM', 'ELISE', 'VARUS', 'GNAR', 'LEONA', 'IRELIA', 'CORKI', 'AZIR', 'JAYCE', 'ZERI', 'KENNEN', 'RIVEN', 'SYNDRA', 'GWEN', 'RAMMUS', 'AHRI']);
let result= '';
const DATUM = Math.round(Date.now()/(1000*60*60*24))-19085;

function createResult(){
    if(DATUM<=100){
        result = Array.from(CHAMP_SET)[DATUM];
    }else{
        result = 'AKALI'
    }
}


function wordInput (letter){
    if(board_access){
        if(letter==='ENTER'){   
            if(CHAMP_SET.has(current_word)){
                let color_code = compareWords(current_word, result);
                colorChange(row, color_code, current_word);
                collumn = 0;
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
            if(collumn < WORD_LENGTH && row < ROW_COUNT){
                current_word += letter;
                let all_tiles = document.querySelectorAll('game-tile');
                all_tiles[row*WORD_LENGTH+collumn].innerHTML = letter;
                all_tiles[row*WORD_LENGTH+collumn].style.border = '2px solid #878A8C'
                all_tiles[row*WORD_LENGTH+collumn].style.animation = 'highlight 200ms ease 0s 1 normal forwards';
                collumn += 1;
            }
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

function judge(code){
    for(let i =0;i<result.length;i++){
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

//changes background color in current_row and keyboard based on color_code
async function colorChange(current_row, color_code, current_word){
    board_access = false
    await(colorGameboard(current_row, color_code));

    colorKeyboard(current_word, color_code);
    

    board_access = true;
    if(judge(color_code)){        
        board_access = false; 
        await delay(500)
        document.getElementById('win_layer').style.display = 'block';
        throwConfetti();  
        copyStringToClipboard(createYourTry()); 
    }else if(current_row+1===ROW_COUNT){
        board_access = false; 
        let GRAY = 'rgb(120, 124, 126)';
        await delay(500)
        document.getElementById('win_layer').style.display = 'block'; 
        document.getElementById('win_layer').style.backgroundColor = GRAY;
        document.getElementById('win_layer').innerHTML = RESULT;
        lose=true;    
        copyStringToClipboard(createYourTry());       
    }
}

async function colorGameboard(current_row, color_code){
    let all_tiles = document.querySelectorAll('game-tile');
    const GREEN = 'rgb(106, 170, 100)';
    const YELLOW = 'rgb(201, 180, 88)';
    const GRAY = 'rgb(120, 124, 126)';
    for(let i = 0; i < WORD_LENGTH; i++){
        current_tile = all_tiles[current_row*WORD_LENGTH + i];
        current_tile.style.animation = 'flip-out-hor-top 0.45s cubic-bezier(0.550, 0.085, 0.680, 0.530) both';
        await delay(300);
        if(color_code[i] === '1') current_tile.style.backgroundColor = GREEN;
        if(color_code[i] === '2') current_tile.style.backgroundColor = YELLOW;
        if(color_code[i] === '3') current_tile.style.backgroundColor = GRAY;
        current_tile.style.color = 'white';
        current_tile.style.border = 'none';
        current_tile.style.paddingTop = '22%';
        current_tile.style.animation = 'flip-in-hor-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
    }
}

function colorKeyboard(str, color_code){
    str = str.toUpperCase();
    let index = 0;
    let current_key;
    const GREEN = 'rgb(106, 170, 100)';
    const YELLOW = 'rgb(201, 180, 88)';
    const GRAY = 'rgb(120, 124, 126)';

    for(let char of str){
        current_key = document.getElementById(char);

        if(color_code[index] === '1'){
            current_key.style.backgroundColor = GREEN;
        }
        if(color_code[index] === '2' && current_key.style.backgroundColor !== GREEN){
            current_key.style.backgroundColor = YELLOW;
        }
        if(color_code[index] === '3' && current_key.style.backgroundColor !== GREEN
            && current_key.style.backgroundColor !== YELLOW){
                current_key.style.backgroundColor = GRAY;
        }
        index++;

        current_key.style.color = 'white';
    }
}

//Credit: https://github.com/catdad/canvas-confetti/
function throwConfetti(){
    var count = 200;
    var defaults = {
    origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
    confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
    }));
    }

    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });
    fire(0.2, {
    spread: 60,
    });
    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
    });
    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
    });
    fire(0.1, {
    spread: 120,
    startVelocity: 45,
    });
}

function delay(time){
    return new Promise(resolve => setTimeout(resolve, time));
}

function createYourTry(){
    let my_Try = '';
    /*let all_tiles = document.querySelectorAll('game-tile');
    for(let i =0;i<row;i++){
        for(let j = 0; j<WORD_LENGTH;j++){
            if(j<WORD_LENGTH-2){            
                let tile = all_tiles[i*WORD_LENGTH+j];            
                my_Try[i].push(judgeTile(tile))
            }else if(!lose && i+1===row){
                my_Try[i].push('🟩');
            }else{
                my_Try[i].push('🟥');
            }

        }
        my_Try.push([]);
    }
    for(let i = 0 ; i<my_Try.length;i++){
        my_Try[i]=my_Try[i].join('');
    }

    my_Try = my_Try.join('\n')
    my_Try.slice(0, -1);*/
    let res;
    
    if(lose){
        res='X'
    }else{
        res=row;
    }
    my_Try = "Lordle " +DATUM+ " "+res+ "/" +ROW_COUNT+"\n\n";
    return my_Try;
}

function judgeTile(tile){
    if (tile === undefined){
        return 'oy';
    }
    if (tile.style.backgroundColor === 'rgb(120, 124, 126)'){
        return '⬜';
    }else if (tile.style.backgroundColor === 'rgb(201, 180, 88)'){
        return '🟨';
    }else if (tile.style.backgroundColor === 'rgb(106, 170, 100)'){
        return '🟩';
    }
    return;
}

function copyStringToClipboard (str) {
    // Temporäres Element erzeugen
    var el = document.createElement('textarea');
    // Den zu kopierenden String dem Element zuweisen
    el.value = str;
    // Element nicht editierbar setzen und aus dem Fenster schieben
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Text innerhalb des Elements auswählen
    el.select();
    // Ausgewählten Text in die Zwischenablage kopieren
    document.execCommand('copy');
    // Temporäres Element löschen
    document.body.removeChild(el);
 }

