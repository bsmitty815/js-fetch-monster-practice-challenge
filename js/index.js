let pageCounter = 1;




    window.addEventListener('DOMContentLoaded', (event) => {
        console.log('DOM fully loaded and parsed');

            fetch('http://localhost:3000/monsters?_limit=50')
            .then(response => response.json())
            .then(monsterInfo => {
                monsterInfo.filter(monster => renderMonsters(monster))
            })
            .catch(function(error){
                console.log(error)
                //fetch list of monsters and run through method to new function that shows list of monsters
            })

        const forwardButton = document.getElementById('forward')
        const backButton = document.getElementById('back')
        forwardButton.addEventListener('click', forwardButtonPressed)
        backButton.addEventListener('click', backButtonPressed)
        const newMonsterButton = document.getElementById('create-monster')
        newMonsterButton.addEventListener('submit', submitNewMonster)


    });

    function submitNewMonster(event) {
        event.preventDefault()
        console.log('form button clicked')
        let newMonsterNameInput = document.querySelector("#monster-name-input");
        let newDescription = document.getElementById('monster-description-input');
        let newAgeNumber = document.getElementById('monster-age-input').value;
        let newMonster = newMonsterNameInput.value
        let newAge = parseInt(newAgeNumber, 10)
        let description = newDescription.value

        const configurationObject = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "name": newMonster,
            "age": newAge,
            "description": description
          })
        };
        debugger
        fetch('http://localhost:3000/monsters', configurationObject)
        .then(response => {
          return response.json()
        })
        .then(monsterInfo => renderMonsters(monsterInfo))
        .catch(function(error) {
          console.log(error);
        })

    }




    function renderMonsters(monster) { //This function adds the list of monsters to the dive with the id monster-container
        //console.log(monster)
        
        const div = document.getElementById('monster-container')
        //div.innerHTML = '';
        const p = document.createElement('p')
        const pTwo = document.createElement('p')
        const pThree = document.createElement('p')
        const monsterName = monster.name
        const monsterAge = monster.age
        const monsterDescription = monster.description
        
        // p.innerText = '';
        // pTwo.innerText = '';
        // pThree.innerText = '';
        div.appendChild(p)
        div.appendChild(pTwo)
        div.appendChild(pThree)
        p.innerText = `Name: ${monsterName}`
        pTwo.innerText = `Age: ${monsterAge}`
        pThree.innerText = `Description: ${monsterDescription}`
        


    }

    //when you press button forward it goes to new monsters

    //when you select button backwards it goes to previous monsters
    //another fetch request to get the new list of monsters
    function forwardButtonPressed() {
        console.log('i was clicked')
        const div = document.getElementById('monster-container')
        div.innerHTML = '';
        pageCounter++; // this will delete the old results before adding the new results with the new fetch
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageCounter}`) //this fetches the monsters again but goes to the next page of monsters
            .then(response => response.json())
            .then(monsterInfo => {
                monsterInfo.filter(monster => renderMonsters(monster))
            })
            .catch(function(error){
                console.log(error)
                //fetch list of monsters and run through method to new function that shows list of monsters
            })
        //return counter;

    }

    function backButtonPressed() {
        const div = document.getElementById('monster-container')
        div.innerHTML = ''; // this will delete the old results before adding the new results with the new fetch
        if (pageCounter > 1) {
            pageCounter--;
            fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageCounter}`) //this fetches the monsters again but goes to the next page of monsters
        .then(response => response.json())
        .then(monsterInfo => {
            monsterInfo.filter(monster => renderMonsters(monster))
        })
        .catch(function(error){
            console.log(error)
            //fetch list of monsters and run through method to new function that shows list of monsters
        })
        }
        
    }

