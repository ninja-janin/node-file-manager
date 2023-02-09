const fs = require('fs');
const path = require('path');
const { readFileSync } = require('fs');
let area_path = [ "hawaii/", "guam-saipan/saipan/", "guam-saipan/guam/", "europe/", "europe/italy/", "europe/italy/rome/", "europe/italy/milano/", "europe/italy/venice/", "europe/italy/florence/", "europe/germany/", "europe/france/", "europe/united-kingdom/", "europe/spain/", "europe/austria/", "europe/belgium/", "europe/croacia/", "europe/czech/", "europe/netherlands/", "europe/greece/", "europe/hungary/", "europe/malta/", "europe/poland/", "europe/portugal/", "europe/switzerland/", "europe/russia/", "oceania/", "oceania/australia/", "oceania/australia/sydney/", "oceania/australia/cairns/", "oceania/australia/goldcoast/", "oceania/australia/brisbane/", "oceania/newzealand/", "oceania/palau/", "oceania/tahiti/", "oceania/newcaledonia/", "oceania/fiji/", "oceania/maldives/", "oceania/mauritius/", "oceania/seychelles/", "asia/", "asia/korea/", "asia/china/", "asia/china/shanghai/", "asia/china/beijing/", "asia/china/hainan/", "asia/taiwan/", "asia/hongkong/", "asia/thailand/", "asia/thailand/phuket/", "asia/macau/", "asia/vietnam/", "asia/philippines/", "asia/philippines/ceb/", "asia/singapore/", "asia/india/", "asia/malaysia/", "asia/myanmar/", "asia/cambodia/", "asia/mongol/", "asia/nepal/", "asia/srilanka/", "asia/laos/", "asia/bangladesh/", "asia/indonesia/", "asia/indonesia/bali/", "north-america/", "north-america/america/", "north-america/america/newyork/", "north-america/america/lasvegas/", "north-america/america/losangeles/", "north-america/america/boston/", "north-america/america/sandiego/", "north-america/america/orlando/", "north-america/america/sanfrancisco/", "north-america/america/seattle/", "north-america/canada/", "north-america/canada/vancouver/", "north-america/canada/toronto/", "latin-america/", "latin-america/brazil/", "latin-america/mexico/", "latin-america/peru/", "latin-america/cuba/", "middle-east/", "middle-east/turkey/", "middle-east/jordan/", "middle-east/uae/", "middle-east/uae/dubai/", "africa/", "africa/egypt/", "africa/kenya/", "africa/morocco/", "africa/southafrica/" ]
let area = ["america", "australia", "austria", "bali", "bangladesh", "beijing", "belgium", "boston", "brazil", "brisbane", "cairns", "cambodia", "canada", "cebu", "china", "croatia", "cuba", "czech", "dubai", "egypt", "fiji", "florence", "france", "germany", "goldcoast", "greece", "guam", "hainan", "hawaii", "hongkong", "hungary", "india", "indonesia", "italy", "jordan", "kenya", "korea", "laos", "lasvegas", "losangeles", "macau", "malaysia", "maldives", "malta", "mauritius", "mexico", "milano", "mongolia", "morocco", "myanmar", "nepal", "netherlands", "newcaledonia", "newyork", "newzealand", "orlando", "palau", "peru", "philippines", "phuket", "poland", "portugal", "rome", "russia", "saipan", "sandiego", "sanfrancisco", "seattle", "seychelles", "shanghai", "singapore", "southafrica", "spain", "srilanka", "switzerland", "sydney", "tahiti", "taiwan", "thailand", "toronto", "turkey", "uae", "united-kingdom", "vancouver", "venice", "vietnam"]
let prefecture = {
 5 : "chubu",
 7 : "chugoku",
 2 : "hokkaido",
 6 : "kansai",
 1 : "kanto",
 8 : "kyushu",
 9 : "okinawa",
 3 : "tohoku",
}

function getFilePath(area) {
  return filePath = area_path.find(element => element.split("/").filter(element => element).pop() == area);
}

function displayDownloadableFiles(object, area, prefecture_name) {
  let ssi_template = `<section id="airticket-and-hotel" class="js-check">
  <div class="section__container airhotel">
    <h2 class="heading--title"><span class="heading--text js-area">${object.area.split('/')[0]}</span>おすすめ航空券＋ホテル</h2>
    <div class="slideCardList__container">
      <ul class="slideCardList--col4 kokunai-goto__card js-slideCardList-counter">
        <li class="${object.area.split("/")[1]}--${prefecture_name}-ah01 slideCardList__item--col4" data-display="false"></li>
        <li class="${object.area.split("/")[1]}--${prefecture_name}-ah02 slideCardList__item--col4" data-display="false"></li>
        <li class="${object.area.split("/")[1]}--${prefecture_name}-ah03 slideCardList__item--col4" data-display="false"></li>
        <li class="${object.area.split("/")[1]}--${prefecture_name}-ah04 slideCardList__item--col4" data-display="false"></li>
      </ul>
    </div>
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
  </div>
</section>
  `
fs.writeFile(`${getFilePath(area)}ssi/ah/${prefecture_name}.shtml`, ssi_template, function (err) {}); 

}

area.forEach((area) => {
  let dataObj = JSON.parse(readFileSync(`./data-overseas/${area}.json`));
  dataObj.forEach((dataObj) => {
    if (dataObj.param && dataObj.param.split("=")[1]) {
      let param = dataObj.param.split("=")[1];
      if (prefecture.hasOwnProperty(param)) {
        displayDownloadableFiles(dataObj, area, prefecture[param])
      }
    }
  });
});
