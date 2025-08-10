//dynamic product recomendations
document.addEventListener("DOMContentLoaded", function() {
  dynamicRecommendationsFunction(null);
});
document.addEventListener("shopify:section:load", function(e) {
  var target = e.target;
  dynamicRecommendationsFunction(target);
});

function dynamicRecommendationsFunction(target) {
  //var recommendedSections = document.querySelectorAll('#product_related_body,#product_complementary_body');
  var recommendedSections = document.querySelectorAll('.dynamic-recommendation-section');
  recommendedSections.forEach(function(recommendedSection) {
    if (recommendedSection.classList.contains('slider-loaded') == false) {
      if (target != null) {
        var targetSection = target.querySelector('.dynamic-recommendation-section');
        if (targetSection == recommendedSection) {
          sliderRecommendedLoop(recommendedSection);
        }
      } else {
        sliderRecommendedLoop(recommendedSection);
      }
    }
  });
};

function sliderRecommendedLoop(recommendedSection) {
  var productRecomendationBody = recommendedSection.querySelector('.slider-container');
  //if container
  if (productRecomendationBody != null) {
    var sectionId = productRecomendationBody.dataset.sectionid;
    //var wrapper = document.querySelector('.slider-parent');
    var url = recommendedSection.dataset.url;
    productRecomendationBody.innerHTML = '<div class="pt-0 row slider-container-inner"></div>';
    var sliderSelector = recommendedSection.querySelector('.slider-container-inner');
    //ASYNC FUNCTION
    //This function returns a promise
    var getProducts = async () => {
      try {
        recommendURL = url.trim(); // remove the unwanted whitespace
        var response = await fetch(recommendURL); //this operation takes some time, so we wait
        //This will return a new promise so we can call .then on the response
        var products = await response.json();
        //we pass the retruned data from products into the function
        console.log('Products loaded', products);
        return products;
      } catch (err) {
        console.log(new Error(`Unable to load products ${err.message}`));
      }
    }
    //END ASYNC FUNCTION
    //this is the data from the response
    getProducts().then(({
      products
    }) => {
      //if image is equal to or greater than 1
      if (products.length > 0) {
        //for each product
        products.forEach((product, index) => {
          var product_handle = product.handle;
          var xhttp = new XMLHttpRequest();
          xhttp.onload = function() {
            var productRow = this.response;
            sliderSelector.insertAdjacentHTML('afterbegin', productRow);
            if (products.length == index + 1) {
              var myInterval = setInterval(function() {
                var productsList = sliderSelector.querySelectorAll('.rec-products');
                if (productsList.length == products.length) {
                  recommendedSection.classList.remove('d-none');
                  clearInterval(myInterval);
                  sliderRecommendedProducts(sectionId, sliderSelector);
                  var eventRecommendation = new CustomEvent('shopify-recommendation:init-product-grid', {
                    detail: {
                      recommendations: products
                    }
                  });
                  document.dispatchEvent(eventRecommendation);
                }
              }, 1);
            }
          }
          xhttp.open("GET", '/products/' + product_handle + '?view=recommended-product');
          xhttp.send();
        });
      }
      if (products.length < 3) {
        sliderSelector.classList.add('w-100');
      }
      if (products.length == 0) {
        recommendedSection.classList.add('d-none');
      }
    }).catch((err) => {
      console.log('Rejected', err);
    });
  }
}
// recommended products slider
function sliderRecommendedProducts(sectionId, productRecomendationBody) {
  //row formatting
  var element = productRecomendationBody;
  element.classList.remove('row');
  var slider2 = tns({
    container: productRecomendationBody,
    items: 1,
    slideBy: 1,
    nav: false,
    speed: 400,
    mode: 'carousel',
    prevButton: '#' + sectionId + ' .glider-prev',
    nextButton: '#' + sectionId + ' .glider-next',
    autoplayButtonOutput: false,
    mouseDrag: true,
    autoplay: false,
    controls: true,
    freezable: true,
    touch: false,
    mouseDrag: false,
    preventScrollOnTouch: 'true',
    navPosition: 'bottom',
    rewind: true,
    lazyload: true,
    center: false,
    loop: false,
    controlsContainer: '#' + sectionId + ' .recommendations-slider-controls',
    responsive: {
      350: {
        items: 1,
      },
      480: {
        items: 2,
      },
      640: {
        items: 4,
      },
      768: {
        items: 4,
      }
    }
  });
  slider2.refresh();
  if (element.closest('.dynamic-recommendation-section') != null) {
    element.closest('.dynamic-recommendation-section').classList.add('slider-loaded');
  }
}
//end dynamic product recomendations
