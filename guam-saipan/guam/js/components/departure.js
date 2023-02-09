import Areas from '../../json/areaList.json' assert { type: "json" };
import Countries from '../../json/countryList.json' assert { type: "json" };
import Cities from '../../json/cityList.json' assert { type: "json" };

$(document).ready(function () {

  function setArea(areaData) {
    if(areaData) {
      areaData.forEach((area) => {
        $('select[name="area"]').append($("<option></option>")
        .attr("value", area.area_en)
        .text(area.area_jp));
      });
    }
  }

  function setCountry(countryData) {
    if(countryData) {
      countryData.forEach((country) => {
        $('select[name="country"]').append($("<option></option>")
        .attr("value", country.country_en)
        .text(country.country_jp));
      })
    }
  }

  function setCity(cityData) {
    if(cityData) {
      cityData.forEach((city) => {
        $('select[name="city"]').append($("<option></option>")
        .attr("value", city.city_en)
        .text(city.city_jp));
      })
    }
  }

  function getCountry(area) {
    return Countries.filter(function(data) {
     return data.area === area;
   })
 }

 function getCity(country) {
  return Cities.filter(function(data) {
   return data.country === country;
 })
}

  //check if searchBox exist
  let checkSearchBox = setInterval(() => {
    let search = $('.md_search');
    if(search.length) {
        setArea(Areas);
        setCountry(Countries);
        setCity(Cities);

        $('select[name="area"]').change(function() {
          let selectedVal = $(this).find(':selected').val();

          $('select[name="country"] option').remove();
          $('select[name="city"] option').remove();
          setTimeout(function() {
            setCountry(getCountry(selectedVal));
            setCity(getCity(getCountry(selectedVal)[0].country_en));

          }, 100);
        });

        $('select[name="country"]').change(function() {
          let selectedVal = $(this).find(':selected').val();
          let area = Countries.find(function(data){ return data.country_en === selectedVal});
          $(`select[name="area"] option[value="${area.area}"]`).prop('selected', true);
          $('select[name="city"] option').remove();

          setCity(getCity(selectedVal));
        })

        $('select[name="city"]').change(function() {
          let selectedVal = $(this).find(':selected').val();

          let dataCity = Cities.find(function(data) {
            return data.city_en === selectedVal
          })

          $(`select[name="area"] option[value="${dataCity.area}"]`).prop('selected', true);
          $('select[name="country"] option').remove();
          setCountry(getCountry(dataCity.area));
          $(`select[name="country"] option[value="${dataCity.country}"]`).prop('selected', true);
          console.log(dataCity);
        })

        clearInterval(checkSearchBox);

    }
  }, 500);
})