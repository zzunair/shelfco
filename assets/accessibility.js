
function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, fieldset, [tabindex]:not([tabindex^='-']), [draggable], area, select, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object"
    )
  );
}

const trapFocusHandlers = {};

function trapFocus(container, elementToFocus = container) {
  var elements = getFocusableElements(container);
  console.log('elements', elements);
  var first = elements[0];
  var last = elements[elements.length - 1];

  removeTrapFocus();

  trapFocusHandlers.focusin = (event) => {
    if (
      event.target !== container &&
      event.target !== last &&
      event.target !== first
    )
    return;

    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.focusout = function() {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.keydown = function(event) {
    if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    //  On the first focusable element and tab backward, focus the last element.
    if ((event.target === container || event.target === first) && event.shiftKey) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);

  elementToFocus.focus();
}

function removeTrapFocus(elementToFocus = null) {
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);

  if (elementToFocus) elementToFocus.focus();
}

//Accessibility helpers
document.addEventListener("DOMContentLoaded", function() {
  //parent menu clickable
  const navBar = document.querySelector('.navbar .dropdown > a');
  if(navBar != null){
    navBar.addEventListener('click', function(e) {
      window.location.href = this.href;
    });
  }

  //unpack all node elements at once using rest and secure target href links
  [...document.querySelectorAll("a[target=_blank]")].forEach(function(item) {
    item.setAttribute("rel", "noopener noreferrer")
  });
  document.querySelectorAll('.ss-list').forEach(function(select){
    select.setAttribute('aria-label', 'choose-option');
  });

  //Selectors
  const sidebar = document.querySelectorAll(".js-menu-toggle"),
        panel = document.querySelector(".js-mini-cart-contents"),
        megamenu = document.getElementById("dropdownMenuButton"),
        menu = document.getElementById("navbarSupportedContent"),
        addToCartBtn = document.querySelector('.add-to-cart-button'),
        singleChildMenu = document.querySelector('.header__menu-item'),
        megaMenuContainer = document.querySelector('.megamenu'),
        megaMenuItem = document.querySelectorAll(".dropdown-menu-item"),
        dropDownMenu = document.querySelectorAll('.dropdown-menu');

  var cartSummary = document.querySelector(".mini-cart-recommendations");
  if(cartSummary != null){
    var cartBtn = cartSummary.querySelector(".mini-container");
    var n = cartBtn.querySelector(".view-cart-btn").length;
    var span = cartSummary.querySelector(".tax-note");

  	span.addEventListener("focusout", function(e){
       document.querySelector('body').classList.remove('show-sidebar');
       document.querySelector('.list-menu__item').setAttribute('tabindex', 0)
       document.querySelector('.main-menu .list-menu__item:first-child').focus();
    });
  }

  //if cart icon is focused
  if(sidebar != null){
    sidebar.forEach(function(item, index){
      item.addEventListener('click', function(e) {
        document.querySelector('aside.sidebar').setAttribute('tabindex', 0)
        document.querySelector('aside.sidebar').focus();
      });
    });
  }

  //focus on header when tabbed after skip to content
  const focusOnHeader = () => {
    document.querySelector(".skip-to-content-link").addEventListener('keydown', function(e) {
      var keyCode = e.keyCode || e.which;

      if (keyCode == 9) {
        e.preventDefault();
        // call custom function here
        document.querySelector('.shop-link').setAttribute('tabindex', 0);
        document.querySelector('.shop-link').focus();
      }
    });
  }
  //invoke
  focusOnHeader();

  //Show mega menu on focus
  if(megamenu != null) {
    //if megamenu dropdown is focused
    megamenu.addEventListener('focus', function(e) {
      if(e.className !== this) {
        megaMenuItem.forEach(function(item, index){
          item.focus
        });
        megaMenuContainer.style.display = "block";
        megaMenuContainer.style.opacity = "1";
        megaMenuContainer.style.visibility = "visible";
        megaMenuContainer.classList.add("open");
      }
    });
    //focus out from main menu link
    megamenu.addEventListener('focusout', function(e) {
      var t = document.querySelector("a#regularNavItem");
      if(t != null){
        if(e.relatedTarget.id == t){
          megaMenuItem.forEach(function(item, index){
            item.focus
          });
          megaMenuContainer.style.display = "none";
          megaMenuContainer.style.opacity = "0";
          megaMenuContainer.style.visibility = "visible";
          megaMenuContainer.classList.remove("open");
        }
      }
    });
    //End focus out from main menu link
  }
  //END mega menu on focus

  //focus out from last link to close the megamenu
  //get the last link in js
  var m = document.querySelector(".has-megamenu");
  if(m != null){
    var n = m.querySelectorAll(".child-menu").length;
    var c = m.querySelectorAll(".child-menu")[n-1];
    var lastLink = c.lastElementChild;

    lastLink.addEventListener("focusout", function(){
      megaMenuItem.forEach(function(item, index){
        item.focus
      });
      megaMenuContainer.style.display = "none";
      megaMenuContainer.style.opacity = "0";
      megaMenuContainer.style.visibility = "visible";
      megaMenuContainer.classList.remove("open");

    });
  }
  //end focus out from last link to close the megamenu

  //Show menu on focus
  if(menu != null) {
    //if megamenu dropdown is focused
    menu.addEventListener('focus', function(e) {
      if(e.className !== this) {
        megaMenuItem.forEach(function(item, index){
          item.focus
        });
        singleChildMenu.style.display = "block";
        singleChildMenu.style.opacity = "1";
        singleChildMenu.style.visibility = "visible";
      }
    });
    //focus out from main menu link
    menu.addEventListener('focusout', function(e) {
      var t = document.querySelector("a#regularNavItem");
      if(t != null){
        if(e.relatedTarget.id != null){
          console.log("e.relatedTarget.id", e.relatedTarget.id);
          if(e.relatedTarget.id.includes("navbarSupportedContent")) {
            megaMenuItem.forEach(function(item, index){
              item.focus
            });
          }
        }
      }
    });
  }
  //END mega menu on focus

  //focus out from last link to close the menu
  var msd = document.querySelector(".menu-single-dropdown");
  if(msd != null){
    var n = msd.querySelectorAll(".single-child-menu").length;
    var c = msd.querySelectorAll(".single-child-menu")[n-1];
    var lastLink = c.lastElementChild;

    lastLink.addEventListener("focusout", function(){
      megaMenuItem.forEach(function(item, index){
        item.focus
      });
      singleChildMenu.style.display = "none";
      singleChildMenu.style.opacity = "0";
      singleChildMenu.style.visibility = "visible";
    });
  }

  //close the megamenu when clicked anywhere
  window.addEventListener("click", function(event) {
    megaMenuItem.forEach(function(item, index){
      item.focus
    });

    dropDownMenu.forEach(function(item, index){
      if(item.classList.contains("open")){
        item.style.display = "none";
        item.style.opacity = "0";
        item.style.visibility = "visible";
      }
    });
  });

  //move focus to cart drawer
  if(addToCartBtn != null){
    addToCartBtn.addEventListener('click', function(e) {
      document.querySelector("aside.sidebar").focus;
    });
  }
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.querySelectorAll('.single-dropdown-item').forEach(function(self){
      var isFocused = (document.activeElement === self);
      if (isFocused){
        if(self.closest('.menu-item').querySelector('.sub-menu') != null){
          if(self.closest('.menu-item').querySelector('.sub-menu').getAttribute('style')){
            self.closest('.menu-item').querySelector('.sub-menu').removeAttribute('style');
          }
          else {
            self.closest('.menu-item').querySelector('.sub-menu').setAttribute('style', 'display: block !important;');
          }
        }
      }
    });
  }
  // Multilevel mega menu
  var activeElement = document.activeElement;
  if (event.key === "Enter") {
    var megamenuParentItems = document.querySelectorAll('.megamenu-parent-items li a');
    if(megamenuParentItems != null){
      megamenuParentItems.forEach(function(item,index){
        if(item == activeElement){
         var currentItemClass = item.dataset.megamenu;
         var currentItem = document.querySelector('.'+currentItemClass);
         var megamenuParentItems = item.closest('.megamenu').querySelectorAll('.megamenu-items-inner');
         megamenuParentItems.forEach(function(itemInner,index){
          var anchors = itemInner.querySelectorAll('a')
            if(itemInner == currentItem){
              itemInner.style.display = "flex";
              anchors.forEach(function(a,index){
               a.setAttribute('tabindex', 0);
              });
            } else {
              itemInner.style.display = "none";
              anchors.forEach(function(a,index){
               a.setAttribute('tabindex', -1);
              });
            }
           console.log(anchors);
          });
        }
      });
    }
  }
  //click on the warranty product
  if (event.key === "Enter") {
    if(document.querySelector('#warrantyProduct') != null){
      var warrantyProduct = document.querySelector('#warrantyProduct');
      var productWarrantyBtn = document.querySelector('.product-warranty-btn');
      var isFocused = (document.activeElement === productWarrantyBtn);
      if (isFocused){
        warrantyProduct.click();
      }
    }
  }
  //click on the upsell product
  if (event.key === "Enter") {
    if(document.querySelectorAll('input[name="upsellProduct[]"]') != null){
      var upsells = document.querySelectorAll('input[name="upsellProduct[]"]');
      upsells.forEach(function(item,index){
        var upsellProduct = item;
        var productUpsellBtn = item.closest('.product-upsell-btn-wrp').querySelector('.product-upsell-btn');
        var isFocused = (document.activeElement === productUpsellBtn);
        if (isFocused){
          upsellProduct.click();
        }
      });
    }
  }
  //show product details on button enter
  if (event.key === "Enter") {
    document.querySelectorAll('.product-overview__feature-btn').forEach(function(self){
      var isFocused = (document.activeElement === self);
      // console.log(isFocused);
      if (isFocused){
        document.querySelector('.product-features').classList.toggle("product-features--show");
        document.querySelector('.product-features').classList.toggle('active');
      }
    });
  }
  if (event.shiftKey && event.key === "Tab") {
    if (document.querySelectorAll('#product').length > 0){

      var clicked1 = document.activeElement;
      var clicked2 = document.querySelector('.main-featured-products .glider-next');
      if (clicked1 == clicked2){
        event.preventDefault();
        document.querySelector('.main-featured-products .glider-prev').focus();
        return;
      }
      var clicked3 = document.querySelector('ul#myTab .nav-item:first-child .nav-link')
      if (clicked1 == clicked3){
        event.preventDefault();
        document.querySelector('.main-featured-products .glider-next').focus();
        return;
      }
      var clicked4 = document.querySelector('.footer-top #accordion .links-list .footer-menu:first-child a');
      if (clicked1 == clicked4) {
        if (document.querySelector('.recently_viewed_products2>div:last-child .product-thumb')) {
          event.preventDefault();
          document.querySelector('.recently_viewed_products2>div:last-child .product-thumb').focus();
        }
      }
      var clicked5 = document.querySelector('.recently_viewed_products2>div:first-child .product-details-card a');
      if (clicked1 == clicked5) {
        if (document.querySelector('.recently-viewed-section .controls .glider-next')) {
          event.preventDefault();
          document.querySelector('.recently-viewed-section .controls .glider-next').focus();
        }
      }
      var clicked6 = document.querySelector('.recently-viewed-section .controls .glider-next');
      if (clicked1 == clicked6) {
        if (document.querySelector('.recently-viewed-section .controls .glider-prev')) {
          event.preventDefault();
          document.querySelector('.recently-viewed-section .controls .glider-prev').focus();
        }
      }
      var clicked7 = document.querySelector('.recently-viewed-section .controls .glider-prev');
      if (clicked1 == clicked7) {
        if (document.querySelector('#product_recomendation_body .rec-products:last-child .product-thumb')) {
          event.preventDefault();
          document.querySelector('#product_recomendation_body .rec-products:last-child .product-thumb').focus();
        }
      }
      var clicked8 = document.querySelector('#product_recomendation_body .rec-products:first-child .product-details-card a');
      if (clicked1 == clicked8) {
        if (document.querySelector('.product-recomendations-section .controls-rec .glider-next')) {
          event.preventDefault();
          document.querySelector('.product-recomendations-section .controls-rec .glider-next').focus();
        }
      }
      var clicked9 = document.querySelector('.product-recomendations-section .controls-rec .glider-next');
      if (clicked1 == clicked9) {
        if (document.querySelector('.product-recomendations-section .controls-rec .glider-prev')) {
          event.preventDefault();
          document.querySelector('.product-recomendations-section .controls-rec .glider-prev').focus();
        }
      }
      var clicked10 = document.querySelector('.product-recomendations-section .controls-rec .glider-prev');
      if (clicked1 == clicked10) {
        if (document.querySelector('.section-product-tabs .nav-tabs .nav-item:last-child .nav-link')) {
          event.preventDefault();
          document.querySelector('.section-product-tabs .nav-tabs .nav-item:last-child .nav-link').focus();
        }
      }
      var clicked11 = document.querySelector('.product-medaia-slider-controls .glider-prev');
      if (clicked1 == clicked11) {
        if (document.querySelector('.breadcrumb-item a')) {
          event.preventDefault();
          document.querySelector('.breadcrumb-item a.active').focus();
        }
      }
       var clicked12 = document.querySelector('.js-slides .tns-slide-active a');
      if (clicked1 == clicked12) {
        if (document.querySelector('.product-medaia-slider-controls .glider-prev')) {
          event.preventDefault();
          document.querySelector('.product-medaia-slider-controls .glider-prev').focus();
        }
      }
      var clicked13 = document.querySelector('.product-medaia-slider-controls .glider-next');
      if (clicked1 == clicked13) {
        if (document.querySelector('.js-slides .tns-slide-active a')) {
          event.preventDefault();
          document.querySelector('.js-slides .tns-slide-active a').focus();
        }
      }
      var clicked14 = document.querySelector('#controls-thumbnails .glider-prev');
      if (clicked1 == clicked14) {
        if (document.querySelector('.product-medaia-slider-controls .glider-next')) {
          event.preventDefault();
          document.querySelector('.product-medaia-slider-controls .glider-next').focus();
        }
      }
      var clicked15 = document.querySelector('.product-thumbnails > a.tns-slide-active');
      if (clicked1 == clicked15) {
        if (document.querySelector('#controls-thumbnails .glider-prev') && document.querySelector('#controls-thumbnails').style.display != 'none') {
          event.preventDefault();
          document.querySelector('#controls-thumbnails .glider-prev').focus();
        } else if (document.querySelector('.product-medaia-slider-controls .glider-next')) {
          event.preventDefault();
          document.querySelector('.product-medaia-slider-controls .glider-next').focus();
        }
      }
      var clicked15 = document.querySelector('#controls-thumbnails .glider-next');
      if (clicked1 == clicked15) {
        if (document.querySelector('.product-thumbnails > a.tns-slide-active')) {
          event.preventDefault();
          var docAll = document.querySelectorAll('.product-thumbnails > a.tns-slide-active');
          document.querySelectorAll('.product-thumbnails > a.tns-slide-active')[docAll.length - 1].focus();
        }
      }
      var clicked16 = document.querySelector('.single-product-details a');
      if (clicked1 == clicked16) {
         if (document.querySelector('#controls-thumbnails .glider-next') && document.querySelector('#controls-thumbnails').style.display != 'none') {
          event.preventDefault();
          document.querySelector('#controls-thumbnails .glider-next').focus();
        } else if (document.querySelector('.product-thumbnails a.tns-slide-active')) {
          event.preventDefault();
          var docAll = document.querySelectorAll('.product-thumbnails a.tns-slide-active');
          document.querySelectorAll('.product-thumbnails a.tns-slide-active')[docAll.length - 1].focus();
        }
      }
      var clicked17 = document.querySelector('.product-vendor a');
      if (clicked1 == clicked17) {
         if (document.querySelector('.single-product-details a')) {
          event.preventDefault();
          document.querySelector('.single-product-details a').focus();
        }
      }

    }
    if (document.querySelectorAll('#product').length > 0){
      var clicked1 = document.activeElement;
      var clicked2 = document.querySelector('.main-featured-products .glider-prev');
      if (clicked1 == clicked2){
        event.preventDefault();
        document.querySelector('.featured-products>.collection-toggle:last-child .add-to-cart-button').focus();
        return;
      }
    }
    if (document.querySelectorAll('#cart').length > 0){
      document.querySelectorAll('#page-cart-inner #cart-fieldset .cart-items>.line-item').forEach(function(selfClass){
      	var doc1 = selfClass.querySelector('.remove-lines');
        var doc2 = document.activeElement;
        if (doc1 == doc2){
          event.preventDefault();
          selfClass.querySelector('.line-image a').focus();
        }
      });
    }
    else {
      document.querySelectorAll('#cart-fieldset .cart-items>.line-item').forEach(function(selfClass){
        var doc1 = selfClass.querySelector('.remove-lines');
        var doc2 = document.activeElement;
        if (doc1 == doc2){
          event.preventDefault();
          selfClass.querySelector('.line-image a').focus();
        }
      });
    }
  }
  if (event.key === "Tab" && !(event.shiftKey)) {
    if (document.querySelectorAll('#product').length > 0){
      var doc1 = document.activeElement;
      var doc2 = document.querySelector('.featured-products>.collection-toggle:last-child .add-to-cart-button');
      if (doc1 == doc2){
        event.preventDefault();
        document.querySelector('.main-featured-products .glider-prev').focus();
      }
      var doc3 = document.querySelector('.main-featured-products .glider-prev');
      if (doc1 == doc3){
        event.preventDefault();
        document.querySelector('.main-featured-products .glider-next').focus();
      }
      var doc4 = document.querySelector('.section-product-tabs .nav-tabs .nav-item:last-child .nav-link');
      if (doc1 == doc4) {
        if (document.querySelector('.product-recomendations-section .controls-rec .glider-prev')) {
          event.preventDefault();
          document.querySelector('.product-recomendations-section .controls-rec .glider-prev').focus();
        }
      }
      var doc5 = document.querySelector('.product-recomendations-section .controls-rec .glider-prev');
      if (doc1 == doc5) {
        if (document.querySelector('.product-recomendations-section .controls-rec .glider-next')) {
          event.preventDefault();
          document.querySelector('.product-recomendations-section .controls-rec .glider-next').focus();
        }
      }
      var doc6 = document.querySelector('.product-recomendations-section .controls-rec .glider-next');
      if (doc1 == doc6) {
        if (document.querySelector('#product_recomendation_body .rec-products:first-child .product-details-card a')) {
          event.preventDefault();
          document.querySelector('#product_recomendation_body .rec-products:first-child .product-details-card a').focus();
        }
      }
      var doc6 = document.querySelector('#product_recomendation_body .rec-products:last-child .product-thumb');
      if (doc1 == doc6) {
        if (document.querySelector('.recently-viewed-section .controls .glider-prev')) {
          event.preventDefault();
          document.querySelector('.recently-viewed-section .controls .glider-prev').focus();
        }
      }
      var doc7 = document.querySelector('.recently-viewed-section .controls .glider-prev');
      if (doc1 == doc7) {
        if (document.querySelector('.recently-viewed-section .controls .glider-next')) {
          event.preventDefault();
          document.querySelector('.recently-viewed-section .controls .glider-next').focus();
        }
      }
      var doc8 = document.querySelector('.recently-viewed-section .controls .glider-prev');
      if (doc1 == doc8) {
        if (document.querySelector('.recently-viewed-section .controls .glider-next')) {
          event.preventDefault();
          document.querySelector('.recently-viewed-section .controls .glider-next').focus();
        }
      }
      var doc9 = document.querySelector('.recently-viewed-section .controls .glider-next');
      if (doc1 == doc9) {
        if (document.querySelector('.recently_viewed_products2>div:first-child .product-details-card a')) {
          event.preventDefault();
          document.querySelector('.recently_viewed_products2>div:first-child .product-details-card a').focus();
        }
      }
      var doc10 = document.querySelector('.recently_viewed_products2>div:last-child .product-thumb');
      if (doc1 == doc10) {
        if (document.querySelector('.footer-top #accordion .links-list .footer-menu:first-child a')) {
          event.preventDefault();
          document.querySelector('.footer-top #accordion .links-list .footer-menu:first-child a').focus();
        }
      }
      var doc11 = document.querySelector('.breadcrumb-item a.active') ;//document.querySelector('#MainContent');
      if (doc1 == doc11) {
        if (document.querySelector('.product-medaia-slider-controls .glider-prev')) {
          event.preventDefault();
          document.querySelector('.product-medaia-slider-controls .glider-prev').focus();
        } else if (document.querySelector('.product-images .slides div a')) {
           event.preventDefault();
          document.querySelector('.product-images .slides div a').focus();
        }
      }
      var doc11 = document.querySelector('#MainContent');
      if (doc1 == doc11) {
        if (document.querySelector('.product-medaia-slider-controls .glider-prev')) {
          event.preventDefault();
          document.querySelector('.product-medaia-slider-controls .glider-prev').focus();
        } else if (document.querySelector('.product-images .slides div a')) {
           event.preventDefault();
          document.querySelector('.product-images .slides div a').focus();
        }
      }
      var doc12 = document.querySelector('.product-medaia-slider-controls .glider-prev');
      if (doc1 == doc12) {
        if (document.querySelector('.js-slides .tns-slide-active a')) {
          event.preventDefault();
          document.querySelector('.js-slides .tns-slide-active a').focus();
        }
      }
      var doc13 = document.querySelector('.js-slides .tns-slide-active a');
      if (doc1 == doc13) {
        if (document.querySelector('.product-medaia-slider-controls .glider-next')) {
          event.preventDefault();
          document.querySelector('.product-medaia-slider-controls .glider-next').focus();
        }
      }
      var doc14 = document.querySelector('.product-medaia-slider-controls .glider-next');
      if (doc1 == doc14) {
        if (document.querySelector('#controls-thumbnails .glider-prev') && document.querySelector('#controls-thumbnails').style.display != 'none' ) {
          event.preventDefault();
          document.querySelector('#controls-thumbnails .glider-prev').focus();
        } else if(document.querySelector('.product-thumbnails > a.tns-slide-active')) {
          event.preventDefault();
          document.querySelectorAll('.product-thumbnails > a.tns-slide-active')[0].focus();
        } else if (document.querySelector('.single-product-details > a')) {
          event.preventDefault();
          document.querySelector('.single-product-details > a').focus();
        } else if (document.querySelector('.product-vendor a')) {
          event.preventDefault();
          document.querySelector('.product-vendor a').focus();
        }
      }
      var doc15 = document.querySelector('#controls-thumbnails .glider-prev');
      if (doc1 == doc15) {
        if (document.querySelector('.product-thumbnails > a.tns-slide-active')) {
          event.preventDefault();
          document.querySelector('.product-thumbnails > a.tns-slide-active').focus();
        }
      }

      var docAll = document.querySelectorAll('.product-thumbnails > a.tns-slide-active');
      var doc16 = document.querySelectorAll('.product-thumbnails > a.tns-slide-active')[docAll.length - 1];
      if (doc1 == doc16) {
        if (document.querySelector('#controls-thumbnails .glider-next') && document.querySelector('#controls-thumbnails').style.display != 'none') {
          event.preventDefault();
          document.querySelector('#controls-thumbnails .glider-next').focus();
        } else if (document.querySelector('.single-product-details a')) {
          event.preventDefault();
          document.querySelector('.single-product-details a').focus();
        }
      }

      var doc17 = document.querySelector('#controls-thumbnails .glider-next');
      if (doc1 == doc17) {
         if (document.querySelector('.single-product-details > a')) {
          event.preventDefault();
          document.querySelector('.single-product-details > a').focus();
        }
      }
    }
    if (document.querySelectorAll('#cart').length > 0) {
      var doc1 = document.querySelector('.navbar-nav.main-menu>.menu-item:last-child>.nav-link');
      var doc2 = document.activeElement;
      if (doc1 == doc2){
        event.preventDefault();
        document.querySelector('#page-cart-inner #cart-fieldset .cart-items>.line-item:first-child .line-image a').focus();
      }
      document.querySelectorAll('#page-cart-inner #cart-fieldset .cart-items>.line-item').forEach(function(selfClass, index){

        var doc1 = selfClass.querySelector('.js-quantity-button.plus');
        if (doc1 == doc2){
          if (document.querySelector('#page-cart-inner #cart-fieldset .cart-items>.line-item:nth-child('+ (index+2) +') .line-image a'))
          {
            event.preventDefault();
            document.querySelector('#page-cart-inner #cart-fieldset .cart-items>.line-item:nth-child('+ (index+2) +') .line-image a').focus();
          }
        }
      })
    }
    else {
      var doc1 = document.activeElement;
      var doc2 = document.querySelector('.sidebar');
      if (doc1 == doc2){
        document.querySelector('#cart-fieldset .cart-items>.line-item:first-child .line-image a').focus();
      }
      document.querySelectorAll('#cart-fieldset .cart-items>.line-item').forEach(function(selfClass, index){
        var doc2 = selfClass.querySelector('.js-quantity-button.plus');
        if (doc1 == doc2){
          if (document.querySelector('#cart-fieldset .cart-items>.line-item:nth-child('+ (index+2) +') .line-image a')){
            event.preventDefault();
            document.querySelector('#cart-fieldset .cart-items>.line-item:nth-child('+ (index+2) +') .line-image a').focus();
          }
        }
      })
    }
  }
});
document.querySelectorAll('.nav-item>.single-dropdown-item').forEach(function(self){
  self.addEventListener('focus', function(self2){
    if (self.closest('.menu-item').querySelector('.sub-menu') == null){
      document.querySelectorAll('.sub-menu').forEach(function(self3){
        self3.removeAttribute('style');
      });
    }
  });
});

// Accordion functionality js
if (document.querySelectorAll('.faq-item-wrapper .faq-item') != null) {
  var titles = document.querySelectorAll('.faq-item-wrapper .faq-item');
  titles.forEach(function(item, index) {
    item.onclick = function() {
      var content = item.closest('.faq-item-wrapper').querySelector('.faq-item-content');
      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
      } else {
        content.classList.add('hidden');
      }
    }
  });
}

// Accordion accesibility js
if (document.querySelectorAll('.faq-item-wrapper') != null) {
  document.addEventListener("keydown", function(event) {
    var activeElement = document.activeElement;
    if (event.key === "Enter") {
      document.querySelectorAll('.faq-item-wrapper').forEach(function(self, index) {
        var item = self.querySelector('.faq-item');
        var itemContent = self.querySelector('.faq-item-content');
        if (activeElement === self) {
          if (itemContent.classList.contains('hidden')) {
            itemContent.classList.remove('hidden');
          } else {
            itemContent.classList.add('hidden');
          }
        }
      });
    }
  });
}
