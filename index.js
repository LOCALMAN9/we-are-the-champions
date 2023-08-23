// javascript

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings =  {
    databaseURL: "https://endorsements-database-e3e7d-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsement")

const endorsInputEl = document.getElementById("endors-el")
const fromInputEL = document.getElementById("from-el")
const toInputEl = document.getElementById("to-el")
const publishBtn = document.getElementById("publish-btn")
const endorsementListEl = document.getElementById("endorsements-list");

publishBtn.addEventListener("click", () => {
    let endorsValue = endorsInputEl.value
    let fromValue = fromInputEL.value
    let toValue = toInputEl.value
    
    push(endorsementsInDB, {
        message: endorsValue,
        sender: fromValue,
        recipient: toValue 
    })

    clearAllInputs()
})

onValue(endorsementsInDB, function(snapshot) {

    if (snapshot.exists()) {
        clearEndorsementListEl()

        let returnedArray = Object.entries(snapshot.val())

        returnedArray.forEach(function (item) {
            appendItemToEndorsementListEl(item[1])
        })

    } else {
        endorsementListEl.innerHTML = "No endorsements here... yet"
    }
    
})

function clearAllInputs() {
    endorsInputEl.value = ""
    fromInputEL.value = ""
    toInputEl.value = ""
}

function clearEndorsementListEl() {
    endorsementListEl.innerHTML = ""
}

 function appendItemToEndorsementListEl(itemValues) {
    let endorsementText = itemValues.message
    let endorsementFrom = itemValues.sender
    let endorsementTo = itemValues.recipient
     
    const outDiv = document.createElement("div")

    const toHeading = document.createElement("h3")
    toHeading.textContent = `To: ${endorsementTo}`

    const textMessage = document.createElement("p")
    textMessage.className = "message-el"
    textMessage.textContent = endorsementText

    const fromHeading = document.createElement("h3")
    fromHeading.textContent = `From: ${endorsementFrom}`

    outDiv.append(toHeading)
    outDiv.append(textMessage)
    outDiv.append(fromHeading)

    endorsementListEl.appendChild(outDiv)
 }