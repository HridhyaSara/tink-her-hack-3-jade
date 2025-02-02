window.onload = function() {
    var text = "Leftover Links";  
    var i = 0;
    var speed = 100; 
    var leftoverTextElement = document.getElementById("leftoverText");

    
    function typeText() {
        if (i < text.length) {
            leftoverTextElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeText, speed); 
        }
    }

    
    document.getElementById('leftoverLinks').classList.remove('hidden');
    typeText();  

   
    setTimeout(function() {
        document.getElementById('leftoverLinks').classList.add('hidden');
       
        document.getElementById('message').innerHTML = "Feed a soul, not the landfill!";
        document.getElementById('message').classList.remove('hidden');
    }, (speed * text.length) + 2000); 
};
