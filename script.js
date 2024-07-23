const buttons = document.querySelectorAll('.button');
const input = document.querySelector('.input')
let string = "";


//prevent to add multiple operaters at same time 
const operators = ['*','/','-','+','.','%'];

//animation on keydown
const addActiveClass = (key) => {
    key.classList.add('active');
    setTimeout(() => key.classList.remove('active'), 200); //remove animation after 200ms
};

//animation on click
buttons.forEach((e) => {
    e.addEventListener('mousedown', function(){
        e.classList.add('active')
        e.classList.remove('hover')
    })
    e.addEventListener('mouseup', function(){
        e.classList.remove('active')
    })
});

//mouse click logic
Array.from(buttons).forEach((button) =>{
    button.addEventListener('click',(e) => {

        //last value of string
        const lastChar = string[string.length - 1];

        if(e.target.innerHTML == '='){ //equal
            if(input.value == ""){
                string = 'Error'
                input.value = string
            } else{
                string = eval(string)
                input.value = string;
            }
        }else if(e.target.innerHTML == 'AC'){ //Clear All
            string = ''
            input.value = string;
        }else if(e.target.innerHTML === '←'){ //backspace
            string = string.slice(0, -1)
            input.value = string;
        }else if(e.target.innerHTML == '+/-'){ //change sign
          if(string.charAt(0) == '-'){
            string = string.substring(1) 
            input.value = string
          }else{
            string = '-' + string
            input.value = string
          }
        }else if(e.target.innerHTML == '%'){ //percentage
            string = string / 100;
            input.value = string
        } else{
            // Prevent to add multiple or same operators at the same time
            if (operators.includes(lastChar) && operators.includes(e.target.innerHTML)) {
                return;
            }
            string = string + e.target.innerHTML
            input.value = string;
        }
    })
});

//keydown logic
window.addEventListener('keydown', (e) => {

    //last value of string
    const lastChar = string[string.length - 1];

    const key = document.querySelector(`.button[data-key="${e.keyCode}"]`);
    const keyValue = e.keyCode

    if(keyValue == "13"){ //Enter key
        addActiveClass(key)
        string = eval(string)
        input.value = string
    }else if(keyValue == "8"){ //Backspace key
        addActiveClass(key)
        string = string.slice(0, -1);
        input.value = string
    }else if(e.key == '53'){ //percentage key
        addActiveClass(key)
        string = string / 100;
        input.value = string
    } else if(e.key == key.innerHTML){

        // Prevent to add multiple or same operators at the same time
        if (operators.includes(lastChar) && operators.includes(e.key)) {
            return;
        }
        
        addActiveClass(key)
        string = string + key.innerHTML
        input.value = string
    }
});