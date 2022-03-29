document.addEventListener('keydown', function(event){
    if(event.keyCode > 64 && event.keyCode < 91){
        wordInput(event.key.toUpperCase());
    }else if(event.keyCode===46 || event.keyCode===8){
        wordDes();
    }else if(event.keyCode===13){
        wordInput('ENTER');
    }
});