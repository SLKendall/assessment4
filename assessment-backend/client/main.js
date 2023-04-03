const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const getInspirationBtn = document.getElementById("inspiration-getter")
const addInspirationBtn = document.getElementById("inspiration-adder")

const inspirationCallBack= ({data: inspiration}) => createInspiration(inspiration)
const errCallback = err => console.log(err)

const inspirationSection = document.querySelector(`#inspiration-section`)
const form = document.querySelector('form')


//Compliment generator
const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

complimentBtn.addEventListener('click', getCompliment)

//Fortune generator
const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

fortuneBtn.addEventListener('click', getFortune)


//Inspiration displayer
const getInspiration = () => axios.get("http://localhost:4000/api/inspiration/").then(inspirationCallBack).catch(errCallback)

getInspirationBtn.addEventListener('click', getInspiration)

//Add to the Inspiration database
const addInspiration = body => axios.post("http://localhost:4000/api/inspiration/", body).then(inspirationCallBack).catch(errCallback)


//Delete specific Inspiration
const deleteInspiration = id => axios.delete(`${"http://localhost:4000/api/inspiration"}/${id}`).then(inspirationCallBack).catch(errCallback)


//submit handler function to create Inspiration
function submitHandler(e) {
    e.preventDefault()

    let quote = document.querySelector('#quote')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        quote: quote.value,
        imageURL: imageURL.value
    }

    addInspiration(bodyObj)

    quote.value = ''
    imageURL.value = ''
}


//Create display div for Inspiration
function createInspirationCard(inspiration) {
    const inspirationCard= document.createElement('div')
    inspirationCard.classList.add('inspiration-div')

    inspirationCard.innerHTML = `<img alt = 'inspiration cover' src=${inspiration.imageURL} class="inspiration-cover"/>
    <p>${inspiration.quote}</p>
    <button onclick="deleteInspiration(${inspiration.id})">delete</button>
    `
    inspirationSection.appendChild(inspirationCard)
}

function createInspiration(arr) {
    inspirationSection.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createInspirationCard(arr[i])
    }
}

form.addEventListener(`submit`, submitHandler)

getInspiration()

