
let globalClickCOunt = 0
let ballCOunter = 0
let delCounter = 0
let timer = 0

let timerLength = 40
let timerSpeed = 1

let timerDiplayInterval
let gameInterval
// variables


let resetGameButton  = document.querySelector("#reset-game")
let startButtonGame = document.querySelector(".start-btn")




// startGame()
resetDisplayScreen()
function resetDisplayScreen() {
     globalClickCOunt = 0
 ballCOunter = 0
 delCounter = 0
    timer = 0
    document.querySelector('#targethit').innerText = 'TARGET HIT :'
    document.querySelector('#targetmissed').innerText = 'TARGET MISS :'
    document.querySelector('#timer').innerText = "TIMER : 0"

    
}

function resetGame() {

    resetDisplayScreen()
    clearInterval(timerDiplayInterval)
    clearInterval(gameInterval)
}


resetGameButton.addEventListener('click',resetGame)
startButtonGame.addEventListener("click",startGame)



function startGame() {
    resetGame()
    // resetDisplayScreen()

     timerDiplayInterval = setInterval(() => {

        timer += 1
        document.querySelector('#timer').innerText ="TIMER : "+ timer
    }, 1000);
    setTimeout(() => {
        console.log('stopped')
        clearInterval(gameInterval)
        clearInterval(timerDiplayInterval)
        document.querySelector('#targethit').innerText = "TARGET HIT : " + globalClickCOunt
        document.querySelector('#targetmissed').innerText = "TARGET MISS : "+( ballCOunter - globalClickCOunt)
        
        
    }, (timerLength*1000));
    
     gameInterval = setInterval(CreateElementAndAppend, 2000)

    function CreateElementAndAppend() {
        ballCOunter += 1
        let element = createPointerElement(ballCOunter)
        element.style.position = 'absolute'
        getRandomLeft = Math.floor((Math.random() * 90) + 1);
        getRandomTop = Math.floor((Math.random() * 90) + 1);
        element.style.top = getRandomTop + '%'
        element.style.left = getRandomLeft + '%'

        document.querySelector(".ballWindow").appendChild(element)
  
        deletePointerinSecond(element)

    }


    function globalCountHandler(element, event) {
        console.log(element, event)
        globalClickCOunt += 1

       element.removeChild(element.childNodes[2])
        console.log(element.childNodes)
        element.childNodes[0].classList = 'killshot'
        setTimeout(() => {
            console.log('remove')
            element.childNodes[0].classList = 'hide'
            document.querySelector(".ballWindow").removeChild(element)
        }, 1000) ;
        
        console.log("Target-Hit", globalClickCOunt)
    }
    function createPointerElement(ball) {
        let pointer = document.createElement('div')
        pointer.classList = ''
        pointer.innerHTML = `<div class="hide">Kill</div>
        <i class="fa fa fa-bullseye pointer-shoot" aria-hidden="true"></i> `
        pointer.setAttribute('id', 'shoot-' + ball)
        pointer.addEventListener('click', globalCountHandler.bind(null, pointer))
        return pointer

    }


    function deletePointerinSecond(ele) {
        delCounter += 1

        setTimeout(() => {
            ele.removeChild(ele.childNodes[2])

        }, 1000);

        let clearPouinter = setTimeout(() => {

            if (document.querySelector(".ballWindow").contains(ele)) {
           
                document.querySelector(".ballWindow").removeChild(ele)
            }

        }, 2000);
   
    }

}


// Logic for Adding Kill Effect above
// let tempBall = document.querySelector(".temp")
// tempBall.addEventListener('click', killEffectAnimation.bind(null,tempBall))
// function killEffectAnimation(element, event) {
  
//     element.childNodes[1].classList = 'killshot'
//     setTimeout(() => {
//         element.childNodes[1].classList = 'hide'
//     }, 500) ;
    

//     // tempBall.appendChild(animateElement)
// }