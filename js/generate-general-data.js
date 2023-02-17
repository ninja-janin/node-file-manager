const fs = require('fs');
const path = require('path');
const { readFileSync } = require('fs');
let area = ["america", "australia", "austria", "bali", "bangladesh", "beijing", "belgium", "boston", "brazil", "brisbane", "cairns", "cambodia", "canada", "cebu", "china", "croatia", "cuba", "czech", "dubai", "egypt", "fiji", "florence", "france", "germany", "goldcoast", "greece", "guam", "hainan", "hawaii", "hongkong", "hungary", "india", "indonesia", "italy", "jordan", "kenya", "korea", "laos", "lasvegas", "losangeles", "macau", "malaysia", "maldives", "malta", "mauritius", "mexico", "milano", "mongolia", "morocco", "myanmar", "nepal", "netherlands", "newcaledonia", "newyork", "newzealand", "orlando", "palau", "peru", "philippines", "phuket", "poland", "portugal", "rome", "russia", "saipan", "sandiego", "sanfrancisco", "seattle", "seychelles", "shanghai", "singapore", "southafrica", "spain", "srilanka", "switzerland", "sydney", "tahiti", "taiwan", "thailand", "toronto", "turkey", "uae", "united-kingdom", "vancouver", "venice", "vietnam"]
// let area = ["america"]

function createAreaData(data, areaName) {
    console.log(`js/general/data/${areaName}.json`)
    fs.writeFile(`js/general/data/${areaName}.json`, JSON.stringify(data, null, 4), function (err) {}); 
}

area.forEach((areaName) => {
    let resData = JSON.parse(readFileSync('./json/paramsData.json', 'utf8'));
    let finalJsonFile = resData.filter(function (resData) {
        let area = resData.area.split('/')[1];
        return area === areaName;
    })
    createAreaData(finalJsonFile, areaName)
});
