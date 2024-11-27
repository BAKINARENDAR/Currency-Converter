const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns=document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const  fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");
document.querySelector("load",()=>{
    UpdateExchangeRate();
    });


for(select of dropdowns)
{
    for(curCode in countryList)
    {
let newOption=document.createElement("option");
newOption.innerText=curCode;
newOption.value=curCode;
if(select.name==="from" && curCode==="USD")
{
    newOption.selected="selected";
}else if(select.name==="to" && curCode==="INR")
{
    newOption.selected="selected";
}
select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
     });
}




const updateFlag = (element)=>{
    let curCode=element.value;
    let countryCode =countryList[curCode];
    let newSrc=  `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",  (evt)=>{
    evt.preventDefault();
    UpdateExchangeRate();
    
});
const UpdateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1)
    {
        amtVal = 1;
        amount.value = "1";
    }
    console.log(amtVal);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;// updated url structure
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    let FinalAmount = amtVal * rate;
msg.innerText=`${amtVal} ${fromCurr.value}=${FinalAmount} ${toCurr.value}`;
}

document.addEventListener("load",()=>{
    UpdateExchangeRate();
})

