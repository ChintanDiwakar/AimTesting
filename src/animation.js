
let globalClickCOunt = 0
let ballCOunter = 0
let delCounter = 0
let timer = 1

let timerLength = 10
let timerSpeed = 1

let timerDiplayInterval
let gameInterval
// variables
let allBoxClicks = 0

let resetGameButton  = document.querySelector("#reset-game")
let startButtonGame = document.querySelector(".start-btn")
let loaderElement = document.querySelector('.loader-box')
let mainBody = document.querySelector(".ballWindow")


let inaccurateClicks = []
let accurateClick = []
let missedElements = []

// startGame()
resetDisplayScreen()
function resetDisplayScreen() {
    mainBody.innerHTML = ''
    allBoxClicks = 0
     globalClickCOunt = 0
 ballCOunter = 0
 delCounter = 0
    timer = 1
    inaccurateClicks = []
    accurateClick = []
    missedElements = []
    document.querySelector('#targethit').innerText = 'TARGET HIT :'
    document.querySelector('#targetmissed').innerText = 'TARGET MISS :'
    document.querySelector('#timer').innerText = "TIMER : 0s"
    clearInterval(timerDiplayInterval)
    clearInterval(gameInterval)
    
}

function resetGame() {

    resetDisplayScreen()
    startGame()

    // startGame()
}


resetGameButton.addEventListener('click',resetGame)
startButtonGame.addEventListener("click",startGame)



function startGame() {
    // resetGame()
    resetDisplayScreen()

     timerDiplayInterval = setInterval(() => {

      
         document.querySelector('#timer').innerText = "TIMER : " + timer +'s'
         if (timer == timerLength) {
             let acc = globalClickCOunt / allBoxClicks * 100
             console.log(inaccurateClicks)
             console.log(accurateClick)
             console.log(missedElements)
            
            clearInterval(gameInterval)
            clearInterval(timerDiplayInterval)
            document.querySelector('#targethit').innerText = "TARGET HIT : " + globalClickCOunt
            document.querySelector('#targetmissed').innerText = "TARGET MISS : "+( ballCOunter - globalClickCOunt)
             document.querySelector('.ballWindow').innerHTML = `  <div class="stats">
            <h2 class="result-head">RESULT</h2>
            <div class="result-main-box">
            <div class="result-box">
           
            </div>
            </div>
            <i class="fa fa-circle" style="color:red" aria-hidden="true"> - Target Missed</i>  &nbsp;
            <i class="fa fa-circle" style="color:green" aria-hidden="true"> - Target Hit</i>  &nbsp;
            <i class="fa fa-circle" style="color:black" aria-hidden="true"> - Inaccurate Hit</i> 

            <div class="result-btn">
              <button onclick="resetGame()">
                RETRY
                <i class="fa fa-refresh" aria-hidden="true"></i>
              </button>
              <button>
                SHARE <i class="fa fa-share-alt" aria-hidden="true"></i>
              </button>
            </div>
            <h4 class="para">
              Your
              accuracy is ${acc.toFixed(2)}%. 
            </h4>
          </div>`
            
             
             let resultBody = document.querySelector('.result-box')
             Object.keys(missedElements).forEach(function (keys) {
                 console.log(missedElements[keys])
                 let tempelement = document.createElement("div")
                 tempelement.setAttribute("class", "balling")
                 tempelement.setAttribute("style", `top:${missedElements[keys][0]}; left:${missedElements[keys][1]}`)
                 tempelement.innerHTML = ` <i class="fa fa-circle" style="color:red" aria-hidden="true"></i>`
                //  tempelement.appendChild(resultBody)
                 
                resultBody.appendChild(tempelement)
             })

             Object.keys(accurateClick).forEach(function (keys) {
           
                let tempelement = document.createElement("div")
                tempelement.setAttribute("class", "balling")
                tempelement.setAttribute("style", `top:${accurateClick[keys][0]}; left:${accurateClick[keys][1]}`)
                tempelement.innerHTML = ` <i class="fa fa-circle" aria-hidden="true" style="color:green"></i>`
               //  tempelement.appendChild(resultBody)
                
               resultBody.appendChild(tempelement)
             })
             
             Object.keys(inaccurateClicks).forEach(function (keys) {
           
                let tempelement = document.createElement("div")
                tempelement.setAttribute("class", "balling")
                tempelement.setAttribute("style", `top:${inaccurateClicks[keys][0]}%; left:${inaccurateClicks[keys][1]}%`)
                tempelement.innerHTML = ` <i class="fa fa-circle" aria-hidden="true" style="color:purple"></i>`
               //  tempelement.appendChild(resultBody)
                
               resultBody.appendChild(tempelement)
            })
         }
         timer += 1 
        
    }, 1000);
 
    CreateElementAndAppend()
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

        accurateClick.push([element.style.top,element.style.left])

       element.removeChild(element.childNodes[2])
     
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

    function allBoxCLickHandler(e) {
        allBoxClicks += 1
        var offset = this.getClientRects()[0];
        actualX = (e.clientX - offset.left);
        actualY = (e.clientY - offset.top)
        // console.log(e.target.parentNode)
        
        // console.log(offset.left)
        eleWidth =  parseInt(window.getComputedStyle(mainBody, null).getPropertyValue("width"))
        eleHeight =  parseInt(window.getComputedStyle(mainBody, null).getPropertyValue("height"))
        
        // console.log(eleWidth,eleHeight,actualX,actualY)
     
        if (e.target.classList.contains('pointer-shoot')) {
               
            
        } else {
            percentageCalulationLeft = ((eleWidth-actualX)/eleWidth)*100 
        percentageCalulationTop = ((eleHeight - actualY)/eleHeight) * 100
            console.log(percentageCalulationLeft, percentageCalulationTop)
            inaccurateClicks.push([100-percentageCalulationTop,100-percentageCalulationLeft])
            

            }
        
     
        
    }
      
    
    document.querySelector('.ballWindow').addEventListener('click',allBoxCLickHandler)
    
    function deletePointerinSecond(ele) {
        delCounter += 1

        setTimeout(() => {
            console.log(ele.childNodes[2].classList)
            if (ele.childNodes[2].classList.contains('pointer-shoot')) {
                missedElements.push([ele.style.top,ele.style.left])
            }
            ele.removeChild(ele.childNodes[2])
            
            // console.log('why here?')


        }, 1000);

        let clearPouinter = setTimeout(() => {

            if (document.querySelector(".ballWindow").contains(ele)) {
                console.log("ther ee",ele.style.top)
    
           
                document.querySelector(".ballWindow").removeChild(ele)
            }

        }, 2000);
   
    }

}

document.querySelector("section").classList.add('hide')
        loaderElement.classList.add('show')





setTimeout(() => {
    document.querySelector("section").classList.remove('hide')
    loaderElement.classList.add('hide')
  


}, 2000);



// Gaming Puns

// document.onreadystatechange = function() {
//     if (document.readyState !== "complete") {
//         loaderElement.classList.add('show')
//         loaderElement.classList.remove('hide')
//        document.querySelector("body").classList.add('hide')
     
        
//     } else {
//         loaderElement.classList.add('hide')
//         loaderElement.classList.remove('show')
//         document.querySelector("body").classList.remove('hide')

      
       
//     }
// };






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
