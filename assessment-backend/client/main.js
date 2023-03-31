const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const getInspirationBtn = document.getElementById("inspiration-getter")
const addInspirationBtn = document.getElementById("inspiration-adder")

const inspirationCallBack= ({data: inspiration}) => displayInspiration(inspiration)
const errCallback = err => console.log(err)

const inspirationSection = document.querySelector(`#inspiration-section`)
const form = document.querySelector('form')

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

complimentBtn.addEventListener('click', getCompliment)


const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

fortuneBtn.addEventListener('click', getFortune)

const getInspiration = () => {
    axios.get("http://localhost:4000/api/inspiration/").then(inspirationCallBack).catch(errCallback)
}

getInspirationBtn.addEventListener('click', getInspiration)

const addInspiration = body => axios.post("http://localhost:4000/api/inspiration/", body).then(inspirationCallBack, alert("Inspiration added!")).catch(errCallback)
const deleteInspiration = id => axios.delete(`${"http://localhost:4000/api/inspiration/"}/${id}`).then(inspirationCallBack , alert("Inspiration delted!")).catch(errCallback)

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


function createInspirationDisplay(inspiration) {
    const inspirationCreation = document.createElement('div')
    inspirationDiv.classList.add('inspiration-div')

    inspirationDiv.innerHTML = `<img alt = 'inspiration cover' src=${inspiration.imageURL}/>
    <p>${inspiration.quote}</p>
    <button onclick="deleteInspiration(${inspiration.id})">delete</button>
    `
    inspirationSection.appendChild(inspirationCreation)
}

function createInspiration(arr) {
    inspirationSection.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createInspirationDisplay(arr[i])
    }
}

form.addEventListener(`submit`, submitHandler)