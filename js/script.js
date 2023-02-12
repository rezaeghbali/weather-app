let btn=document.querySelector('button');
let inputElem=document.querySelector('.search-bar')
let weather=document.querySelector('.weather')
let loading=document.querySelector('.loading')
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

let apiData={
    url:'https://api.openweathermap.org/data/2.5/weather?q=',
    key:'31b68bdf24f252ebab80032e5648bea9'
}

async function fetchData(){
    let inputValue=inputElem.value
    try{
        let fetched= await fetch(`${apiData.url}${inputValue}&&appid=${apiData.key}`)
        let resJson= await fetched.json()
        console.log(resJson); 
        show(resJson)
    }catch(err){
        alert('لطفا اسم شهر یا کشور را درست وارد کنید')
    }
}
function show(data){
    let city=document.querySelector('.city')
    city.innerHTML=`${data.name},${data.sys.country}`
    let temp=document.querySelector('.temp') 
    temp.innerHTML=`${Math.floor(data.main.temp-273)} °C`
    let description=document.querySelector('.description')
    description.innerHTML=`${data.weather[0].main}`
    let humidity=document.querySelector('.humidity')
    humidity.innerHTML=`Humidity: ${data.main.humidity}%`
    let wind=document.querySelector('.wind')
    wind.innerHTML=`wind speed: ${data.wind.speed} km/h`
    let date=document.querySelector('.date')
    date.innerHTML=showDate()

}
function showDate() {
    let now=new Date()
    let day=days[now.getDay()]
    let year=now.getFullYear()
    let date=now.getDate()
    let month=months[now.getMonth()]
    return `${day} ${date} ${month} ${year}`
}
btn.addEventListener('click',()=>{
    weather.classList.remove('loading')
    fetchData()
    inputElem.value=''
})
inputElem.addEventListener('keypress',event=>{
    if(event.keyCode===13){
        weather.classList.remove('loading')
        fetchData()
        inputElem.value='' 
    }
})