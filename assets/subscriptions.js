if(window.theme.pageType === 'product'){
	const elem = [];
	const radioInp = document.querySelector(".spg-radio-input");
	const oneTime = document.querySelector("#loop-one-time-purchase");
	const subSelect = document.querySelector("select[id^=spg-select]");
	const subBtn = document.querySelector("button[type='submit'][name='add']");
	//functions/logic
	function updateWidgetCurrentVariant(id) {
		var _widget = document.getElementById("loop-widget-fieldset");
		if(_widget) {
			_widget.dataset.currentVariantId = id;
		}
	}
	function updateWidgetCurrentSellingPlan(id, name) {
		var _widget = document.getElementById("loop-widget-fieldset");
		_widget.dataset.currentSellingPlanId = id;
		_widget.dataset.currentSellingPlanName = name;
	}
	function addSubscriptionToCartFunctionality(type, el) {
		var add_to_cart_btn = document.querySelector("button[type='submit'][name='add']");
		if(type === "S") {
			//with selling plan
			add_to_cart_btn.querySelector("[data-adding-cart]").textContent = `${window.theme.addSubscription}`;
			add_to_cart_btn.disabled = false;
			add_to_cart_btn.setAttribute("disabled", "");

			let sp_id = el.target.id.split("-")[3];
			let sp_name = el.target.id.substring(el.target.id.indexOf(sp_id)+sp_id.length+1);
			var _widget = document.getElementById("loop-widget-fieldset");
			_widget.dataset.currentSellingPlanId = sp_id;
			_widget.dataset.currentSellingPlanName = sp_name;
			var _url = new URL(window.location);
			_url.searchParams.set('selling_plan', sp_id);
			history.pushState(null, null, _url);

			add_to_cart_btn.onclick = function(){
				// console.log("CLICKED");
        console.log("The product it added has to be 2");
				let qty_input_qs = ["[id=Quantity]","[id=quantity]","[name=quantity]"];
				let qty_input = document.querySelector(qty_input_qs.toString());
				let qty = parseInt(qty_input?.value);
				let _url = new URL(window.location);
				var _widget = document.getElementById("loop-widget-fieldset");
				let vari_id = _widget.dataset.currentVariantId || _url.searchParams.get('variant');
				let sp_id = _widget.dataset.currentSellingPlanId || _url.searchParams.get('selling_plan');

				if(sp_id?.length && vari_id?.length){
					let formData = {
					'items': [{
							'id': vari_id,
							'quantity': qty ? qty : 1,
							'selling_plan': sp_id,
						}]
					};
				}
			}
		}
		else {
			add_to_cart_btn.querySelector("[data-adding-cart]").textContent = `${window.theme.addToCart}`;
		}
	}
	var firstTimeUrl = document.URL;
	(function checkIfSubs(){
		var url = new URL(firstTimeUrl);
		var isSpUrl = url.searchParams.get("selling_plan");
		var el = document.querySelector("input[id=loop-one-time-purchase]");
	})();
	// console.log('First time url', firstTimeUrl);
	document.addEventListener('change', function() {
		var currentPageUrl = document.URL;
		var url = new URL(currentPageUrl);
		var isVariantUrl = url.searchParams.get("variant");
		currentPageUrl = isVariantUrl ? currentPageUrl : isVariantUrl;
		// console.log('curr page url', currentPageUrl);
		if(currentPageUrl && firstTimeUrl != currentPageUrl) {
			firstTimeUrl = currentPageUrl;
			// console.log('variant_id: '+isVariantUrl+'');
			updateWidgetCurrentVariant(isVariantUrl);
		}
	});
	var spg = Array.from(document.querySelectorAll("input[name=loop_purchase_option]"));
		spg.forEach(el => el.addEventListener('change', (el) => {
		if(el.target.id!="loop-one-time-purchase"){
			addSubscriptionToCartFunctionality("S", el); //S for subscription
		}
		else {
			addSubscriptionToCartFunctionality("N", el); //N for normal
		}
	}));
	//handle <select> change in selling plan
	var sp_selects = Array.from(document.querySelectorAll("[id*=spg-select]"));
	sp_selects.forEach(el => el.addEventListener('change', (e) => {
			sp_id = e.target.value;
			var _url = new URL(window.location);
			_url.searchParams.set('selling_plan', sp_id);
      if(document.querySelector(".js-sticky-product-selling-plan")){
        document.querySelector(".js-sticky-product-selling-plan").value = sp_id;
      }
			var _widget = document.getElementById("loop-widget-fieldset");
			var vari_id = _widget.dataset.currentVariantId || _url.searchParams.get('variant');
			window.history.pushState({}, '', _url);
			var sp_name = e.target.options[e.target.selectedIndex].dataset.sellingPlanName;
			updateWidgetCurrentSellingPlan(sp_id, sp_name);
			//change product template price value
			var theme_price_element_qs = [".price-item.price-item--regular", ".product-single__price"]
			var theme_price_element = document.querySelectorAll(theme_price_element_qs.toString());
			theme_price_element.forEach(el => el.textContent = new_price.textContent);
		}
	));
	if(oneTime){
		oneTime.addEventListener("click", function() {
			var params = new URLSearchParams(window.location.search);
			params.delete("selling_plan");
			document.querySelector("select[id^=spg-select]").setAttribute('selected', '-1');
      if(document.querySelector(".js-sticky-product-selling-plan")){
        document.querySelector(".js-sticky-product-selling-plan").value = '';
      }
			var _widget = document.getElementById("loop-widget-fieldset");
			_widget.dataset.currentSellingPlanId = "";
			_widget.dataset.currentSellingPlanName = "";
			window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
		});
	}
	// if one time purchase exists, set the select name on load
	document.addEventListener("DOMContentLoaded", function() {
		if(oneTime != null && oneTime.length < 1){
			radioInp.setAttribute("checked", true);
			subSelect.setAttribute("name", "selling_plan");
		}
	});
	function updateSubName() {
	  if(radioInp.getAttribute("checked") == true){
			subSelect.setAttribute("name", "selling_plan")
		}
	}
	// invoke the function
	if(radioInp){
		radioInp.addEventListener("click", updateSubName);
		//set button text if sp is checked
		(function() {
			var inputChecked = radioInp.checked;
			if(inputChecked == true){
				subBtn.querySelector("[data-adding-cart]").innerText = `${window.theme.addToCart}`;
			}
		})();
	}
}
