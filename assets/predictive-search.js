class PredictiveSearch extends HTMLElement {
  constructor() {
    super();

    this.input = this.querySelector('input[type="search"]');
    this.predictiveSearchResults = this.querySelector("#predictive-search");

    this.input.addEventListener(
      "input",
      this.debounce((event) => {
        this.onChange(event);
      }, 300).bind(this)
    );

    this.input.addEventListener(
      "focus",
      this.debounce((event) => {
        this.onFocus(event);
      }, 0).bind(this)
    );
  }

  onChange() {
    const searchTerm = this.input.value.trim();

    if (!searchTerm.length) {
      this.close();
      return;
    }

    this.getSearchResults(searchTerm);
  }

  onFocus() {
    const searchTerm = this.input.value.trim();

    if (!searchTerm.length) {
      this.close();
      return;
    }

    this.getSearchResults(searchTerm);
  }

  getSearchResults(searchTerm) {
    // fetch(`/search/suggest?q=${searchTerm}&section_id=predictive-search`)
    fetch(
      window.Shopify.routes.root +
        `search/suggest?q=${searchTerm}&section_id=predictive-search`
    )
      .then((response) => {
        if (!response.ok) {
          var error = new Error(response.status);
          this.close();
          throw error;
        }

        return response.text();
      })
      .then((text) => {
        const resultsMarkup = new DOMParser()
          .parseFromString(text, "text/html")
          .querySelector("#shopify-section-predictive-search").innerHTML;
        this.predictiveSearchResults.innerHTML = resultsMarkup;
        this.open();
      })
      .catch((error) => {
        this.close();
        throw error;
      });
  }

  open() {
    this.predictiveSearchResults.style.display = "block";
  }

  close() {
    this.predictiveSearchResults.style.display = "none";
    this.predictiveSearchResults.innerHTML = "";
  }

  debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }
}
customElements.define("predictive-search", PredictiveSearch);

var forms = document.querySelectorAll("predictive-search");

document.body.addEventListener("click", function (e) {
  var target = e.target;
  if (forms != null) {
    forms.forEach(function (form, index) {
      if (target.closest("predictive-search") == null) {
        forms.forEach(function (form, index) {
          var list = form.querySelector(".search-results");
          if(list != null) {
            list.style.display = "none";
          }
        });
      }
      var input = form.querySelector('input[type="search"]');
      if (target == input) {
        forms.forEach(function (form, index) {
          var list = form.querySelector(".search-results");
          if(list != null) {
            list.style.display = "none";
          }
        });
        var list = form.querySelector(".search-results");
        if (list.innerHTML != "") {
          list.style.display = "block";
        }
      }
    });
  }
});
