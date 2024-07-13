let add = document.querySelector(".add")
let del = document.querySelector(".del")
let format = document.querySelector(".format")
let save=document.querySelector(".save")
let close=document.querySelector(".close")
let cards = document.querySelector(".cards")

document.addEventListener("DOMContentLoaded", () => {
    loadCards();
});

let cardsData=[]

format.style.display="none"

add.addEventListener("click", () => {
    format.style.display = "block"
})


close.addEventListener("click", () => {
         format.style.display = "none" 
})

del.addEventListener("click", () => {
    let fmat2=document.querySelectorAll(".card")
    for (let i = 0; i < fmat2.length; i++) {
        fmat2[i].style.display = "none"
    }
    localStorage.clear()
})

save.addEventListener("click", ()=>{
    createcard()
})


function createcard() {
    let card = document.createElement("div")
    card.setAttribute("class", "card")
    let Q = document.createElement("div")
    let A = document.createElement("div")
    let question = document.querySelector("#question")
    let answer = document.querySelector("#answer")
    // let value1 = question.value
    // let value2 = answer.value
    Q.innerHTML=question.value
    A.innerHTML=answer.value

   let info={
    "ques":question.value,
    "ans":answer.value
}
    cardsData.push(info) 
    localStorage.setItem("cards", JSON.stringify(cardsData))
   
    question.value=""
    answer.value=""
    Q.classList.add("q")
    A.classList.add("a")
    
    let top = document.createElement("div")
    top.classList.add("top")
    let cut = document.createElement("div")
    cut.classList.add("cut")
    cut.innerHTML = "&ndash;"
    
    top.appendChild(cut)
    let format2=document.createElement("div")
    format2.classList.add("format2")
    format2.appendChild(top)

    format2.appendChild(Q)
    A.style.display="none"
    format2.appendChild(A)
   
    card.appendChild(format2)
    cut.addEventListener("click", ()=>{
        card.style.display="none"

        const index = cardsData.findIndex(item => item.ques === Q.innerHTML && item.ans === A.innerHTML);
    
    // Remove the card's data from the cardsData array
    if (index !== -1) {
        cardsData.splice(index, 1);
    }
    
    // Update local storage with the modified cardsData array
    localStorage.setItem("cards", JSON.stringify(cardsData));
    window.location.reload();
    format.style.display="block"
    })

    card.addEventListener("click", ()=>{
        let c=card.querySelector(".a")
        c.style.display="flex"
    })

   cards.appendChild(card)
   for (let i = 0; i < cards.length; i++) {
    cards[i].style.display = "block"
}   
}


// function saveCards(){
//   let cards=document.querySelectorAll(".card")
//   cardsData=[]
//   cards.forEach(card=>{
//         let Q=card.querySelector(".q")
//         let A=card.querySelector(".a")
//         cardsData.push({question:Q, answer:A})
//       localStorage.setItem("cards", JSON.stringify(cardsData))
//   })
// }

function loadCards(){
    let savedCards=localStorage.getItem("cards")
    if(savedCards){ 
        cardsInfo=JSON.parse(savedCards)
        cardsInfo.forEach(data=>{
            let card = document.createElement("div")
            card.setAttribute("class", "card")
            let Q = document.createElement("div")
            let A = document.createElement("div")
            // let question = document.querySelector("#question")
            // let answer = document.querySelector("#answer")
            // let value1 = question.value
            // let value2 = answer.value
            Q.innerHTML=data.ques
            A.innerHTML=data.ans
            // question.value=""
            // answer.value=""
            Q.classList.add("q")
            A.classList.add("a")
            
            let top = document.createElement("div")
            top.classList.add("top")
            let cut = document.createElement("div")
            cut.classList.add("cut")
            cut.innerHTML = "&ndash;"
            
            top.appendChild(cut)
            let format2=document.createElement("div")
            format2.classList.add("format2")
            format2.appendChild(top)
        
            format2.appendChild(Q)
            A.style.display="none"
            format2.appendChild(A)
           
            card.appendChild(format2)
            cut.addEventListener("click", ()=>{
                card.style.display="none"
            })
        
            card.addEventListener("click", ()=>{
                let c=card.querySelector(".a")
                c.style.display="flex"
            })
        
           cards.appendChild(card)
        //    for (let i = 0; i < cards.length; i++) {
        //     cards[i].style.display = "block"
        // }            
        })
    }
}

