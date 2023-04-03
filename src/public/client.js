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
        <section>
            ${latest_images.length > 0 ? displayRoverInfo(latest_images[0].rover) : ""  }
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
        `
        <div class="button-section">
        <button id="opportunity" onClick= "fetchRoverDetails(store,'opportunity')"> Opportunity </button>
        <button id="curiosity" onClick= "fetchRoverDetails(store,'curiosity')"> curiosity </button>
        <button id="spirit" onClick= "fetchRoverDetails(store,'spirit')"> spirit </button>
        </div>
        `
    )
}

const LatestRoverPhotos = (latest_images) => {

        return (
            `
            <div> 
                <h3> Latest Images of rover are </h3>
                <section class="image-section">
                <div>
                    ${latest_images.map(image => `<img src= "${image.img_src}"/>`)}
                </div>
                </section>
            </div>
            `
        )
    
}

const displayRoverInfo = (roverDetail) => {
    return (
        `
        <div> 
            <h3>Rover Name:  ${roverDetail.name}</h3>
            <h3>Rover Status ${roverDetail.status}</h3>
            <h3> Rover Landing Date ${roverDetail.landing_date}</h3>
            <h3> Rover Launch Date ${roverDetail.launch_date}</h3>
        </div>
        `
    )
}


// ------------------------------------------------------  API CALLS


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

