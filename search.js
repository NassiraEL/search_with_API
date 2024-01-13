let inp = document.querySelector(".inp input");
let placeStates = document.querySelector(".allState");
let placeCitys = document.querySelector(".allCitys");

let api = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

let allData = [];

fetch(api)
    .then(data => data.json())
    .then(data => allData.push(...data))


function searchKeyword(keyword, data){
    return data.filter(elm =>{
        let kyw = new RegExp(keyword, "gi");
        return elm.state.match(kyw);
    })
}





function getData(){
    // trouver tous les states mais avec ses doubles
    let stateDouble = searchKeyword(this.value, allData);

    //eliminer les doubles
    let stateTrouver = [];
    stateDouble.forEach(elm=>{
        while(!stateTrouver.includes(elm)){
            stateTrouver.push(elm);
        }
    })
    
    let states = "";
    stateTrouver.forEach(elm =>{
        states += `<li >${elm.state}</li>`
    })
    placeStates.innerHTML = states;

    let allState = document.querySelectorAll(".allState li");

    allState.forEach(state =>{
        state.addEventListener("click", function(){
            state.style.opacity = "0.7";
            inp.value = state.textContent;

            
            let citysTrouver = "";
            stateTrouver.forEach(elm =>{
                if(elm.state == state.textContent){
                    citysTrouver += `<li >${elm.city}</li>` ;
                }
            })

            placeCitys.innerHTML = citysTrouver;

        })
    })

}

inp.addEventListener("keyup", getData)