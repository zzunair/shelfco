//LANGUAGE AND CURRENCY FUNCTIONS
document.addEventListener("DOMContentLoaded", function() {
  //GLOBAL REFS
  const currencyForm = document.querySelector('.shopify-currency-form');
  const currencySelect = document.querySelector('.js-currency-change');
  const languageForm = document.querySelector('.shopify-language-form');
  const languageSelect = document.querySelector('.js-language-change');

  //GLOBAL EMPTY ARRAYS FOR PARENT EL
  var parentLanguage = [];
  var parentCurrency = [];

  //RUN LANGUAGE FUNCTION
  const runLanguage = () => {
    //START get parent element for language
    function getParentElLang(el, parentSelector) {
      if (parentSelector === null) {
        parentSelector = document.documentElement;
      }

      //FIND PARENT EL
      var parent = el.parentNode;
      while (parent !== parentSelector) {
        var option = parent;
        parentLanguage.push(option);
        parent = option.parentNode;
      }
      parentLanguage.push(parentSelector);
      return parentLanguage;
    };
    //END get parent element for language

    //call parent element
    getParentElLang(languageSelect, languageForm);

    //The parent node should be the last element
    let selectLang = parentLanguage[parentLanguage.length-1];

    //START when select is changed invoke function
    selectLang.onchange = function(e){
      var $currencyPrice = document.querySelector("span.money");
        new Noty({
          theme: 'nest',
          type: 'success',
          timeout: 1000,
          layout: 'topRight',
          text: `${window.theme.languageChanged}`,
      }).show();
      e.stopPropagation();
      console.log('internationalization.js lang changed');
      languageForm.querySelector("input#language_code").value = selectLang.querySelector("select").value;
      languageForm.submit();
    }
    //END when select is changed invoke function
  }
  //CALL FUNCTION
  if(languageForm != null) {
    runLanguage();
  }
  //RUN CURRENCY FUNCTION
  const runCurrency = () => {
    //START get parent element for language
    function getParentElCurrency(el, parentSelector) {
      if (parentSelector === null) {
        parentSelector = document.documentElement;
      }

      //FIND PARENT EL
      var parent = el.parentNode;
      while (parent !== parentSelector) {
        var option = parent;
        parentCurrency.push(option);
        parent = option.parentNode;
      }
      parentCurrency.push(parentSelector);
      return parentCurrency;
    };
    //END get parent element for language

    //call parent element
    getParentElCurrency(currencySelect, currencyForm);

    //The parent node should be the last element
    let selectCurrency = parentCurrency[parentCurrency.length-1];

    //START when select is changed invoke function
    selectCurrency.onchange = function(e){
      var $currencyPrice = document.querySelector("span.money");
        new Noty({
          theme: 'nest',
          type: 'success',
          timeout: 1000,
          layout: 'topRight',
          text: `${window.theme.currencyChanged}`,
      }).show();
      e.stopPropagation();
      console.log('internationalization.js currency changed');
      currencyForm.querySelector("input#countryCode").value = selectCurrency.querySelector("select").value;
      currencyForm.submit();
    }
    //END when select is changed invoke function
  }
  //CALL FUNCTION
  if(currencyForm != null) {
    runCurrency();
  }
});
