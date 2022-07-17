let url
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '78befd15ffmsh179b8f62c79308bp1771f3jsn271f23654e6d',
    'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com'
  }
};

let categories = []
let jokesPerCat = []

let flags = []
let jokesPerFlag = []

let types = []
let jokesPerType = []

let jokesId = []
let repeated = 0

let vowels = [0,0,0,0,0]

let t_categories = document.getElementById('total-categories')
let t_flags = document.getElementById('total-flags')
let t_types = document.getElementById('total-types')
let t_jokes = document.getElementById('total-jokes')

let cargarCategories = ()=>{
  url = 'https://jokeapi-v2.p.rapidapi.com/categories?format=json'
  fetch(url, options)
	  .then(res => res.json())
	  .then((data) => {
      for (let category of data.categories) {
        categories.push(category)
        jokesPerCat.push(0)
      }
      t_categories.innerHTML = categories.length
    })
	  .catch(err => console.error('error:' + err));
}

let cargarFlags = ()=>{
  url = 'https://jokeapi-v2.p.rapidapi.com/flags?format=json'
  fetch(url, options)
	  .then(res => res.json())
	  .then((data) => {
      for (let flag of data.flags) {
        flags.push(flag)
        jokesPerFlag.push(0)
      }
      t_flags.innerHTML = flags.length
    })
	  .catch(err => console.error('error:' + err));
}

let cargarDatos = ()=>{
  cargarCategories()
  cargarFlags()
  url = 'https://jokeapi-v2.p.rapidapi.com/joke/Any?format=json&idRange=0-150';
  let jokes = 1368
  let index
  for (let i = 0; i < 50; i++) {
    fetch(url, options)
	    .then(res => res.json())
	    .then((data) => {
        let cadena
        if (data.type == "single") {
          cadena = data.joke
        } else {
          cadena = `${data.setup} ${data.delivery}`
        }
        for(let i = 0; i < cadena.length; i++) {
	        if (cadena[i].toLowerCase() === "a") vowels[0]++;
          if (cadena[i].toLowerCase() === "e") vowels[1]++;
          if (cadena[i].toLowerCase() === "i") vowels[2]++;
          if (cadena[i].toLowerCase() === "o") vowels[3]++;
          if (cadena[i].toLowerCase() === "u") vowels[4]++;
        }

        if (jokesId.includes(data.id)) {
          repeated++
        } else {
          jokesId.push(data.id)
        }

        index = categories.indexOf(data.category)
        jokesPerCat[index]++

        for (let flag of flags) {
          if(data[flag]){
            index = flags.indexOf(flag)
            jokesPerFlag[index]++
          }
        }

        if(!types.includes(data.type)){
          types.push(data.type)
          jokesPerType.push(1)
        } else {
          index = types.indexOf(data.type)
          jokesPerType[index]++
        }     
        t_jokes.innerHTML = jokes
        t_types.innerHTML = types.length
      })
	    .catch(err => console.error('error:' + err));
    cargarLineChart()
  }
}

let cargarLineChart = () => {
  var ctx = document.getElementById("chartjs-dashboard-line").getContext("2d");
  var gradient = ctx.createLinearGradient(0, 0, 0, 225);
  gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
  gradient.addColorStop(1, "rgba(215, 227, 244, 0)");
  // Line chart
  new Chart(document.getElementById("chartjs-dashboard-line"), {
    type: "line",
    data: {
        labels: ["a", "e", "i" ,"o", "u"],
        datasets: [{
      label: "Vowels",
      fill: true,
      backgroundColor: gradient,
      borderColor: window.theme.primary,
      data: vowels
    }]
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      intersect: false
    },
    hover: {
      intersect: true
    },
    plugins: {
        filler: {
        propagate: false
      }
    },
    scales: {
      xAxes: [{
        reverse: true,
        gridLines: {
        color: "rgba(0,0,0,0.0)"
        }
      }],
      yAxes: [{
        ticks: {
          stepSize: 1000
        },
        display: true,
        borderDash: [3, 3],
        gridLines: {
          color: "rgba(0,0,0,0.0)"
        }
      }]
    }
  }
});
}

let cargarBarChar = (index, text) => {
  let labelsArr
  let dataArr
  if (Number(index) == 2) {
    labelsArr = flags
    dataArr = jokesPerFlag
  } else if (Number(index) == 3){
    labelsArr = types
    dataArr = jokesPerType
  } else if (Number(index) == 1){
    labelsArr = categories
    dataArr = jokesPerCat
  }
  new Chart(document.getElementById("chartjs-dashboard-bar"), {
      type: "bar",
      data: {
          labels: labelsArr,
          datasets: [{
              label: text,
              backgroundColor: window.theme.primary,
              borderColor: window.theme.primary,
              hoverBackgroundColor: window.theme.primary,
              hoverBorderColor: window.theme.primary,
              data: dataArr,
              barPercentage: .75,
              categoryPercentage: .5
          }]
      },
      options: {
          maintainAspectRatio: false,
          legend: {
              display: false
          },
          scales: {
              yAxes: [{
                  gridLines: {
                      display: false
                  },
                  stacked: false,
                  ticks: {
                      stepSize: 20
                  }
              }],
              xAxes: [{
                  stacked: false,
                  gridLines: {
                      color: "transparent"
                  }
              }]
          }
      }
  })
}

let cargarDoughnut = () => {
  let label = ["Repeated", "No Repeated"]
  document.getElementById('repeated').innerHTML = repeated
  document.getElementById('no-repeated').innerHTML = 50-repeated
  new Chart(document.getElementById("chartjs-doughnut"), {
    type: "doughnut",
    data: {
        labels: label,
        datasets: [{
            data: [repeated, 50-repeated],
            backgroundColor: [
                window.theme.primary,
                window.theme.success,
                window.theme.warning,
                "#dee2e6"
            ],
            borderColor: "transparent"
        }]
    },
    options: {
        maintainAspectRatio: false,
        legend: {
            display: false
        }
    }
  });
}

window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos()
    cargarBarChar(1,"Category")
    cargarDoughnut()
})

document.querySelector('select').addEventListener('change', (event)=>{
    let select = document.querySelector('div.input-group > select')
    let index = select.options[select.selectedIndex].value
    let text = select.options[select.selectedIndex].text
    cargarBarChar(index, text)
})