$(document).ready( function() {
  const cookieParam = $.cookie("hixi_dafault_region") ? $.cookie("hixi_dafault_region").toString() : '1';

  $.getJSON(`/kaigai/json/paramsData.json`, function(data){
    let Data = data.filter(function(data) {
      let area = data.area.split('/')[1];
      return area === 'guam';
    })

    let isSP = false;
    const queryparam = ['4','10','11'];
    const queryportal = ['02D_14','03A_21','05B_42'];
    const dropButton = $('.mvNav__dropdown');
    const dropMenu = $('.js-dropMenu');
    const dropLink = $('.mvNav__dropdown-link');
    const dropText = $('.js-dropText');
    const urlParam = new URLSearchParams(window.location.search);


    let branches = $(".js-branches");
    let airwaySpecials = $(".js-airway-special");
    let specialPages = $(".js-special-page");
    let otherCities = $(".js-other-city");
    
    const paramSearchValues = [
      {
        param: '4',
        portal: '02D_14',
        airticket: '新潟空港',
        airhotel: 'KIJ|新潟空港|KIJ'
      },
      {
        param: '10',
        portal: '03A_21',
        airticket: '小松空港',
        airhotel: 'KMQ|小松空港|KMQ'
      },
      {
        param: '11',
        portal: '05B_42',
        airticket: '松山空港',
        airhotel: 'MYJ|松山空港|MYJ'
      }
    ]
    
    if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
      isSP = true
    }

    function setData(data) {
      if(data) {
        if(isSP) {
          $('.js-ovs-tourLink').attr('href', data.oversea_tour_link_sp);
          $('.js-ovs-airticket-hotel').attr('href', data.oversea_airticket_hotel_url_sp);
          $('.js-ovs-airticket').attr('href', data.oversea_airticket_url_sp);
          $('.js-ovs-hotel').attr('href', data.oversea_hotel_url_sp);
        } else {
          $('.js-ovs-tourLink').attr('href', data.oversea_tour_link_pc);
          $('.js-ovs-airticket-hotel').attr('href', data.oversea_airticket_hotel_url_pc);
          $('.js-ovs-airticket').attr('href', data.oversea_airticket_url_pc);
          $('.js-ovs-hotel').attr('href', data.oversea_hotel_url_pc);
        }

        if(urlParam.has("param") || urlParam.has("portal")) {
          document.title = data.title;
          $("meta[name='description']").attr("content", data.description);
          $("meta[property='og:url']").attr("content", data.og_url);
          $("meta[property='og:image']").attr("content", data.og_image);
          $("meta[property='og:title']").attr("content", data.og_title);
          $("link[rel='canonical']").attr("href", data.canonical);
          $("meta[property='og:description']").attr("content", data.og_description);
          $("meta[name='keywords']").attr("content", data.keywords);
          $('.site-copy').text(data.h1);

          let checkSiteCopy = setInterval(() => {
            let siteCopy = $('.site-copy');
            if(siteCopy.length) {
                $('.site-copy').text(data.h1);
  
                clearInterval(checkSiteCopy);
            }
          }, 500);

          if(data.breadcrumbs) {
            let bread = data.breadcrumbs.split('\n');
            $('.breadcrumb__item:last-child .breadcrumb__itemInner span').text(bread[bread.length - 1]);
          }
        }


        $('.js-country-jp').text(data.bi_country_japanese);
        $('.js-country-en').text(data.bi_country_english);
        $('.js-language').text(data.bi_language);
        $('.js-religion').text(data.bi_religion);
        $('.js-weather').text(data.bi_weather);
        $('.js-outfit').text(data.bi_outfit);
        $('.js-money').text(data.bi_money);
        $('.js-tip').text(data.bi_tip);
        $('.js-water').text(data.bi_water);
        $('.js-manner').text(data.bi_manner);
        $('.js-restroom').text(data.bi_restroom);
        $('.js-smoking').text(data.bi_smoking);

        $('.js-optionTourLink').attr('href', data.optional_tour_url_res);
        $('.js-article').attr('href', data.article_url_res);
        $('.js-souvenir').attr('href', data.souvenir_url_res);
        $('.js-area').text(data.area.split('/')[0])

        //reset contents
        branches.children().remove();
        airwaySpecials.children().remove();
        specialPages.children().remove();
        otherCities.children().remove();

        //loop for branch data
        for(let i = 1; i <=8; i++) {
          if(data[`branch_${i}_name`] !== '') {
            branches.append(`<div class="grid-col3">
            <a href="${data[`branch_${i}_url_res`]}" class="girdTextLink girdTextLink--arrowRight girdTextLink--imgLeft js-branchh"><img class="girdTextLink__img" src="https://www.his-j.com/cmn/icon/icon_stores.svg" alt=""><span>${data[`branch_${i}_name`]}</span></a>
          </div>`)
          }
        }

        //loop for branch blog
        for(let i = 1; i <= 9; i++) {
          if(data[`branch_blog_${i}_name`] !== '') {
            branches.append(`<div class="grid-col3">
            <a href="${data[`branch_blog_${i}_url_pc`]}" class="girdTextLink girdTextLink--arrowRight girdTextLink--imgLeft js-branch-blog pc-only"><img class="girdTextLink__img" src="https://www.his-j.com/cmn/icon/icon_stores.svg" alt=""><span>${data[`branch_blog_${i}_name`]}</span></a>
            <a href="${data[`branch_blog_${i}_url_sp`]}" class="girdTextLink girdTextLink--arrowRight girdTextLink--imgLeft js-branch-blog sp-only"><img class="girdTextLink__img" src="https://www.his-j.com/cmn/icon/icon_stores.svg" alt=""><span>${data[`branch_blog_${i}_name`]}</span></a>
          </div>`)
          }
        }

        //loop for airway special and special pages
        for(let i = 1; i <= 12; i++) {
          // airway special
          if(data[`airway_special_${i}`] !== '') {
            airwaySpecials.append(`
            <div class="grid-col3">
              <a href="${data[`airway_special_${i}_url_res`]}" class="girdTextLink girdTextLink--arrowRight girdTextLink--imgLeft js-specialAirline"><img class="girdTextLink__img" src="https://www.his-j.com/cmn/icon/icon_plane.svg" alt=""><span>${data[`airway_special_${i}`]}</span></a>
            </div>`)
          }

          //special pages
          if(data[`special_page_${i}`] !== '') {
            specialPages.append(`
              <div class="grid-col4">
                <a href="${data[`special_page_${i}_url_pc`]}" class="girdTextLink girdTextLink--arrowRight js-special-page1 pc-only">${data[`special_page_${i}`]}</a>
                <a href="${data[`special_page_${i}_url_sp`]}" class="girdTextLink girdTextLink--arrowRight js-special-page1 sp-only">${data[`special_page_${i}`]}</a>
              </div>
            `)
          }
        }

        //loop for other cities
        let emtpyNum = 0;
        for(let i = 1; i <= 30; i++) {
          if(data[`othercity_${i}_area`] !== '') {
            otherCities.append(`
              <div class="grid-col6">
                <a class=" other_city-link" href="${data[`othercity_${i}_url_pc`]}">${data[`othercity_${i}_area`]}</a>
              </div>
            `)
            emtpyNum = emtpyNum + 1;
          }

          if(i === 30 && emtpyNum === 0) {
            otherCities.parent().css('display', 'none');
          }
        }

      }
    }

    function getData(num) {
      return Data.find(function(data) {
        return data['param'] === `?param=${num}`
      })
    }

    function setVal(el, param, paramStr) {
      // $("option:selected").prop("selected", false);
      let queryData = param==="param" ? queryparam : param==="portal" ? queryportal : '';

      if(param && queryData.includes(paramStr)) {
        let searchBoxData = paramSearchValues.find(function(data) {
          return data[param] === paramStr;
        })
        setTimeout(function() {
          $(`select[name="airport"] option[value="${searchBoxData.portal}"]`).prop('selected', true);
          $(`select[name="Org"] option[value="${searchBoxData.airticket}"]`).prop('selected', true);
          $(`select[name="deptAirport"] option[value="${searchBoxData.airhotel}"]`).prop('selected', true);
        }, 100)
      } else {
        setTimeout(function() {
          $(`select[name="airport"] option[value="${el.data('oversea')}"]`).prop('selected', true);
          $(`select[name="Org"] option[value="${el.data('airticket')}"]`).prop('selected', true);
          $(`select[name="deptAirport"] option[value="${el.data('airhotel')}"]`).prop('selected', true);
        }, 100)
      }
    }

    function getParam(param) {
      if(param === '4' || param === '02D_14') {
        return {
          num: '3',
          port: '02C_13'
        }
      } else if(param === '10' || param === '03A_21') {
        return {
          num: '5',
          port: '03A_20'
        }
      } else if(param === '11' || param === '05B_42') {
        return {
          num: '7',
          port: '05B_41'
        }
      } else {
        return param;
      }
    }

    function setDefaultVal(paramNumber) {
      let navItem = $(`.mvNav__dropdown-link[data-param="${paramNumber}"]`);
      if(queryparam.includes(paramNumber)) {
        let num = getParam(paramNumber).num;
        let activeItem = $(`.mvNav__dropdown-link[data-param="${num}"]`);
        activeItem.addClass('is-active');
        setSSI(activeItem.data('depart'));
        handleSPNav(activeItem.data('oversea'));
        dropText.text($(activeItem[0]).text());
      } else {
        navItem.addClass('is-active');
        setSSI(navItem.data('depart'));
        handleSPNav(navItem.data('oversea'));
        dropText.text($(navItem[0]).text());
      }
      setData(getData(cookieParam));
      let checkSearch = setInterval(() => {
        let searchBox = $('.md_search');
        if(searchBox.length) {
            setVal(navItem, 'param', paramNumber);
            clearInterval(checkSearch);
        }
      }, 500);

      //hide related info section if no content
      let branchH = $('.js-checkBranch');
      let numBranch = 0

      branchH.each(function() {
        let childNum = $(this).next().find('.grid-col3').length
        if(childNum === 0) {
          $(this).css('display', 'none');
          numBranch++
        }
      })
      if(numBranch === 2) {
        branchH.parent().css('display', 'none')
      }

      let cityOther = $(".js-other-city .grid-col6");
      if(cityOther.length < 7) {
        $(".other-city .expand-button").css('display', 'none');
      }

      if(isSP) {
        let firstLi = $("#end-airport02 li:first-child");
        let jsDest = $(".js-destination span");
        firstLi.addClass("active");
        jsDest.text(firstLi.find('a').text());
      }
    }

    function handleSPNav(dataOvs){
      let modalLink = $(`#start-airport02 li a[data-val="${dataOvs}"]`);

      modalLink.click();
    }

    function scrollSpNav(num) {
        let deviceHeight = window.outerHeight;
        let modalActiveItem = document.querySelector("#start-airport02 .active").offsetTop;
        let modalTour = $("#start-airport02");
        let modalTourItem = $("#start-airport02 li");
        let slideY = 0 
        modal.list_slide = modalTour;
        for(let i = 0; i < modalTourItem.length; i++) {
          if($(modalTourItem[i]).hasClass('active')) {
            if($(modalTourItem[0]).hasClass('active')) {
              modal.setSlideY(0);
            }
            return false;
          }
          slideY -= $(modalTourItem[i]).outerHeight()
          if(slideY === -210) {
            modal.setSlideY(-387);
          } else if(slideY <= -1155) {
            modal.setSlideY(-2073);
          } else {
            modal.setSlideY(slideY - (modalActiveItem - 129));
          }

          if( deviceHeight < 812 && num === 9) {
            modal.setSlideY(-2073 - (812 - deviceHeight));
          }
        }

    }

    function setSSI(dep) {
      $('.js-ssi').removeClass('is-active');

      $(`.js-ssi.${dep}`).addClass('is-active');
    }

    //Set contetns on load
    setDefaultVal(cookieParam);

    

    dropButton.on('click', function() {
      dropMenu.css('display', 'block');
    })

    $(document).mouseup(function(e) {
      if (!dropMenu.is(e.target) && dropMenu.has(e.target).length === 0 || dropLink.hasClass('is-active')) {
        dropMenu.css('display', 'none');
      }
    });

    dropLink.on('click', function() {
      let paramNum = $(this).data('param');
      let dataOvs = $(this).data('oversea');
      let dataDepart = $(this).data('depart');
      
      dropMenu.css('display', 'none');
      dropLink.removeClass('is-active');
      $(this).addClass('is-active');
      dropText.text($(this).text());

      //reset contents
      branches.children().remove();
      airwaySpecials.children().remove();
      specialPages.children().remove();
      otherCities.children().remove();

      setData(getData(paramNum));
      setVal($(this));

      setSSI(dataDepart);

      //SP
      handleSPNav(dataOvs);
      scrollSpNav(paramNum);

      

      $('.slick-slider').slick('refresh');
    })

    //Set search box value for SP
    let numDays = $("#num-count-tour-search-days.modal-list > li");
    const numBox = $("#num-box01");
    let numDaysVal = localStorage.getItem('numDays')
    numDays.on('touchstart', function() {
      localStorage.setItem("numDays", $(this).find('a').text());
    })

    if(isSP) {
      if(numDaysVal) {
        numBox.attr('data-placeholder', numDaysVal);
        numBox.find('a > span').text(numDaysVal);
        
        numDays.each(function() {
          let numItem = $(this).find('a').text()
          if(numItem === numDaysVal) {
            $(this).addClass("active");
          }
        })
      }
    }

    



  }).fail(function(){
    console.log("An error has occurred.");
  });
})

