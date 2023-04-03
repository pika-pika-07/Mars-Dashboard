let store = {
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    latest_images: [],
    selectedRover: {}
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    // console.log(state)
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    let { rovers, apod, latest_images } = state
    return `
    <header> Mars Rovers</header>
    <main>
        ${SelectorSection()}
        <section>
            ${latest_images.length > 0 ? LatestRoverPhotos(latest_images) : ""  }
        </section>
    </main>
    <footer></footer>
`

}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS


const SelectorSection = () => {
    return (
        `<button id="opportunity" onClick= "fetchRoverDetails(store,'opportunity')"> Opportunity </button>
        <button id="curiosity" onClick= "fetchRoverDetails(store,'curiosity')"> curiosity </button>
        <button id="spirit" onClick= "fetchRoverDetails(store,'spirit')"> spirit </button>
        `
    )
}

const LatestRoverPhotos = (latest_images) => {
        const image = latest_images[0]
        
        const roverDetail = image.rover
        return (
            `
            <div> 
                <p> Fetched latest images </p>
                <img src= "${image.img_src}"/>
                <p> ${roverDetail.name}</p>
                <p> ${roverDetail.status}</p>
                <p> ${roverDetail.landing_date}</p>
            </div>
            `
        )
    
}


// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
    // latestMarsRoversPhotos(state)
}

const fetchRoverDetails = (state,rover) => {
    const result = fetch(`http://localhost:3000/${rover}`)
    .then((res) => res.json())
    .then((roverData) => {
        // let newState = {...state}
        updateStore(state,{latest_images:roverData.latest_photos})
    })
    .catch(function() {
      
  })
}

