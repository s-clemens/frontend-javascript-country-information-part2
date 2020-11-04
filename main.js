
countryListContainer = document.getElementById('country-container');


async function getCountriesArray(){
    try {
        const result = await axios.get('https://restcountries.eu/rest/v2/all');
        const { data } = result

        // Sorts the countries in the object by population.
        data.sort(function (a,b) {
            return a.population -  b.population;
        })

        // Create Html structure and content from API array
        data.map(({ region, flag, name, population }) =>{
            // Create List Item with unique id
            const li = document.createElement('li');
            // li.setAttribute('id', `${name}`);

            // Add Flag image item
            const flagImg = document.createElement('img');
            flagImg.setAttribute('src', flag);
            flagImg.setAttribute('class', 'flag');

            // Add Country name text item
            const span = document.createElement('span');
            span.setAttribute('class', 'country');
            span.setAttribute('class', `${giveColorByRegion(region)}`);
            span.textContent = name;

            // Adding items to List item
            li.appendChild(flagImg);
            li.appendChild(span);

            // Adding List item to html div
            countryListContainer.appendChild(li);


            // Add or remove population info on click
            const populationP = document.createElement('p');
            populationP.setAttribute('class', 'population-class');

            let populationActive = false

            li.addEventListener('click', function(e){
                if(populationActive){
                    li.removeChild(populationP);
                    populationActive = false;
                }else{
                    populationP.textContent = `Population: ${population}`;
                    li.appendChild(populationP);
                    populationActive = true;
                }
            })
        })
    }
    catch (err){
        console.log("Something went wrong.")
    }
}

// Application of switch to apply color styling to List item via class
function giveColorByRegion(region){
    switch(region) {
        case 'Americas':
            return "blue";
        case 'Europe':
            return "yellow";
        case 'Asia' :
            return "red";
        case 'Africa':
            return "yellow";
        case 'Oceania':
            return "purple";
        default:
            return "black";
    }
}

getCountriesArray();

