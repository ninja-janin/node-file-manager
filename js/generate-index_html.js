const fs = require('fs');
const path = require('path');
const { readFileSync } = require('fs');
let area_path = [ "europe/croatia/", "asia/mongolia/", "asia/philippines/cebu/", "hawaii/", "guam-saipan/saipan/", "guam-saipan/guam/", "europe/", "europe/italy/", "europe/italy/rome/", "europe/italy/milano/", "europe/italy/venice/", "europe/italy/florence/", "europe/germany/", "europe/france/", "europe/united-kingdom/", "europe/spain/", "europe/austria/", "europe/belgium/", "europe/croacia/", "europe/czech/", "europe/netherlands/", "europe/greece/", "europe/hungary/", "europe/malta/", "europe/poland/", "europe/portugal/", "europe/switzerland/", "europe/russia/", "oceania/", "oceania/australia/", "oceania/australia/sydney/", "oceania/australia/cairns/", "oceania/australia/goldcoast/", "oceania/australia/brisbane/", "oceania/newzealand/", "oceania/palau/", "oceania/tahiti/", "oceania/newcaledonia/", "oceania/fiji/", "oceania/maldives/", "oceania/mauritius/", "oceania/seychelles/", "asia/", "asia/korea/", "asia/china/", "asia/china/shanghai/", "asia/china/beijing/", "asia/china/hainan/", "asia/taiwan/", "asia/hongkong/", "asia/thailand/", "asia/thailand/phuket/", "asia/macau/", "asia/vietnam/", "asia/philippines/", "asia/philippines/ceb/", "asia/singapore/", "asia/india/", "asia/malaysia/", "asia/myanmar/", "asia/cambodia/", "asia/mongol/", "asia/nepal/", "asia/srilanka/", "asia/laos/", "asia/bangladesh/", "asia/indonesia/", "asia/indonesia/bali/", "north-america/", "north-america/america/", "north-america/america/newyork/", "north-america/america/lasvegas/", "north-america/america/losangeles/", "north-america/america/boston/", "north-america/america/sandiego/", "north-america/america/orlando/", "north-america/america/sanfrancisco/", "north-america/america/seattle/", "north-america/canada/", "north-america/canada/vancouver/", "north-america/canada/toronto/", "latin-america/", "latin-america/brazil/", "latin-america/mexico/", "latin-america/peru/", "latin-america/cuba/", "middle-east/", "middle-east/turkey/", "middle-east/jordan/", "middle-east/uae/", "middle-east/uae/dubai/", "africa/", "africa/egypt/", "africa/kenya/", "africa/morocco/", "africa/southafrica/" ]
let area = ["america", "australia", "austria", "bali", "bangladesh", "beijing", "belgium", "boston", "brazil", "brisbane", "cairns", "cambodia", "canada", "cebu", "china", "croatia", "cuba", "czech", "dubai", "egypt", "fiji", "florence", "france", "germany", "goldcoast", "greece", "guam", "hainan", "hawaii", "hongkong", "hungary", "india", "indonesia", "italy", "jordan", "kenya", "korea", "laos", "lasvegas", "losangeles", "macau", "malaysia", "maldives", "malta", "mauritius", "mexico", "milano", "mongolia", "morocco", "myanmar", "nepal", "netherlands", "newcaledonia", "newyork", "newzealand", "orlando", "palau", "peru", "philippines", "phuket", "poland", "portugal", "rome", "russia", "saipan", "sandiego", "sanfrancisco", "seattle", "seychelles", "shanghai", "singapore", "southafrica", "spain", "srilanka", "switzerland", "sydney", "tahiti", "taiwan", "thailand", "toronto", "turkey", "uae", "united-kingdom", "vancouver", "venice", "vietnam"]
let updatedArea = [];
let missingArea = []; 
let undefined_area = []

function getFilePath(area) {
  let filePath = area_path.find(element => element.split("/").filter(element => element).pop() == area);
  if(filePath === undefined) {
    undefined_area.push(area)
  }   
  return filePath;
}


function updateIndexHtml(object, area, counter) {
  let index_template = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${area} - ${object.area}</title>
  </head>
  <body>
    <div class="align-center section-button pc-only">
      <!-- var oversea_airticket_hotel_url_pc -->
      <a href="${object.oversea_tour_link_pc}" class="button button--twoLine button--type-outline button--icon-arrowRight js-ovs-airticket-hotel">
        <span><span class="js-area"></span>の<br>航空券＋ホテルをもっと見る</span>
      </a>
    </div>
    <div class="align-center sp-only">
      <!-- var oversea_airticket_hotel_url_sp -->
      <a href="${object.oversea_tour_link_sp}" class="button button--twoLine button--type-outline button--icon-arrowRight js-ovs-airticket-hotel">
        <span><span class="js-area"></span>の<br>航空券＋ホテルをもっと見る</span>
      </a>
    </div>
  </body>
  </html>
  `
  // console.log(`${getFilePath(area)}/index.shtml`)
  if (fs.existsSync(`${getFilePath(area)}`)) {
    fs.writeFile(`${getFilePath(area)}index.shtml`, index_template, function (err) {}); 
    updatedArea.push(area);
  } else {
    missingArea.push(getFilePath(area));
    // console.log(`Directory does not exist. : ${getFilePath(area)}`)
  }
}
let counter = 0;
area.forEach((areaInner, array) => {
  let dataObj = JSON.parse(readFileSync(`./data-overseas/${areaInner}.json`));
  updateIndexHtml(dataObj[0], areaInner, counter);
  counter++;
  if (counter === area.length) {
    console.log("Updated Area:" , updatedArea, updatedArea.length);
    console.log("UNSUCCESSFUL :" , missingArea.length);
    console.log(undefined_area);
  } 
});
