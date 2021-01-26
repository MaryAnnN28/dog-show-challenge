const URL = "http://localhost:3000/dogs/"


document.addEventListener('DOMContentLoaded', () => {
   fetchDogs()
})

const fetchDogs = () => {
   document.querySelector("#table-body").innerHTML = ""
   fetch(URL)
      .then(res => res.json())
      .then(dogs => {
         dogs.forEach((dog) => renderDog(dog))
      })
}

const renderDog = (dog) => {
   const table = document.querySelector("#table-body")
   const tableRow = document.createElement("tr")
         table.appendChild(tableRow)

   const dogName = document.createElement("td")
         dogName.innerText = dog.name 
         tableRow.appendChild(dogName)
   
   const dogBreed = document.createElement("td")
         dogBreed.innerText = dog.breed
         tableRow.appendChild(dogBreed)
   
   const dogSex = document.createElement("td")
         dogSex.innerHTML = dog.sex
         tableRow.appendChild(dogSex)
   
   const editBox = document.createElement("td")
   const editBtn = document.createElement('button')
         editBtn.innerText = "Edit Dog"
         editBox.appendChild(editBtn)
         tableRow.appendChild(editBox)
         
   editBtn.addEventListener('click', () => {
      handleUpdate(dog)
   })
   
}

const handleUpdate = (dog) => {
   const dogForm = document.querySelector("#dog-form")
   dogForm.name.value = dog.name
   dogForm.breed.value = dog.breed
   dogForm.sex.value = dog.sex 
   
   dogForm.addEventListener('submit', (event) => {
      event.preventDefault()
      updateDog(dog, event)
   })
}
    

const updateDog = (dog, event) => {
   let newDog = {
      name: event.target.name.value,
      breed: event.target.breed.value,
      sex: event.target.sex.value
   }

   let reqPack=  {
         headers: {"Content-Type": "application/json"},
         method: 'PATCH',
         body: JSON.stringify(newDog)
   }
   fetch(URL + dog.id, reqPack)
      .then(res => res.json())
      .then(fetchDogs)
   
}

