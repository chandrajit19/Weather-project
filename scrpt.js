
const cityElement=document.querySelector('.city');
      
const timeElement=document.querySelector('.time');
      
const natureElement=document.querySelector('.nature');
    
const imageElement=document.querySelector('.img');
const tempElement=document.querySelector('.temp');
const minMaxElement=document.querySelector('.min-max');

const feelElement=document.querySelector(".feels");
const humidityElement=document.querySelector(".humidity");
const windElement=document.querySelector(".wind");
const pressureElement=document.querySelector(".pressure")

const submitElement=document.querySelector(".formSubmit");
      

// const displayElement= document.querySelector('.display-box')
const invalidElement=document.querySelector('.invalid')

   // getting country name
   const getCountryName=(code)=>{
      return  new Intl.DisplayNames([code], { type: 'region' }).of(code);
   }

 // getting date
 const getDate=(dt)=>{
            const date =new Date(dt*1000) // second to milisecond
           
         const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
           
            const formattedDate = date.toLocaleDateString('en-US', options);
            return formattedDate;
        }
  // end point 

  let city="Varanasi"
  
   submitElement.addEventListener("submit", (e)=>{
     e.preventDefault();
   const cityName=document.querySelector(".city-name");
   console.log(cityName.value);
   city=cityName.value;
    weatherData()
    cityName.value=""

   })  

        const weatherData=async ()=>{
            const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1cf36d4ccf33e0b036f49b35b9ca3edb`;

        try {
            const response= await fetch(URL);
            const data= await response.json();
            console.log(data);
            if (data.cod === "404") {
                   
                invalidElement.textContent = "City is not found...";
                invalidElement.style.display = "block";
                document.querySelector('.display-box').style.display = "none";
            }
            else{ 
                invalidElement.style.display = "none";
                document.querySelector('.display-box').style.display = "block";

                const {main, name, weather, wind, sys, dt}=data;
               
                    cityElement.textContent=`${name}, ${ getCountryName(sys.country)}`
                    
                    timeElement.textContent=`${getDate(dt)}` 

                        natureElement.textContent=weather[0].main;
                        imageElement.innerHTML=`<img width="100px" src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;

                    tempElement.innerHTML=`${main.temp}&#176`;

                    minMaxElement.innerHTML=`min: ${main.temp_min.toFixed()}&#176  &nbsp;  &nbsp;  max:  ${main.temp_max.toFixed()}&#176`

                    feelElement.innerHTML=`${main.feels_like}&#176`;
                    humidityElement.innerHTML=`${main.humidity}%`;
                    windElement.innerHTML=`${wind.speed}m/s`;
                    pressureElement.innerHTML=`${main.pressure} hpa`;

            }
           
            } catch (error) {
                console.log(error)
                invalidElement.textContent = `${error}`;
                invalidElement.style.display = "block";
                document.querySelector('.display-box').style.display = "none";
         
        }
      }




      document.body.addEventListener("load", weatherData());

