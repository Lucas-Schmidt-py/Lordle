document.addEventListener('keydown', function(event){
    if(event.keyCode > 64 && event.keyCode < 91){
        let letter = event.key.toLocaleUpperCase();
        wordInput(letter);
        highlightKey(letter);
    }else if(event.keyCode===46 || event.keyCode===8){
        wordDes();
        highlightKey('BACKSPACE')
    }else if(event.keyCode===13){
        wordInput('ENTER');
        highlightKey('ENTER')
    }
});
 
async function highlightKey(letter){
    let current_key = document.getElementById(letter);
    current_key.style.filter = 'brightness(80%)';
    await delay(200);
    current_key.style.filter = '';
}