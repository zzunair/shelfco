const selectors = {
  addAddress: document.querySelector('#add-address'),
  showAddAddress: document.querySelector('.show-add-address'),
  hideAddress: document.querySelector('.hide-address'),
  showEditAddress: document.querySelectorAll(".show-edit-address"),
  editAddress: document.querySelector('#edit-address'),
  hideEditAddress: document.querySelectorAll('.hide-edit-address'),
  registerForm: document.querySelector('.register__form'),
  signInBtn: document.querySelector('.sign-in__button'),
  registerBtn: document.querySelector('.register__button'),
  loginForm: document.querySelector('.login__form'),
  editEmail: document.querySelector('#edit-email')
};
//Add address
if(selectors.showAddAddress != null) {
  selectors.showAddAddress.onclick = function() {
    selectors.addAddress.style.display = "block";
    selectors.showAddAddress.style.display = "none";
    selectors.hideAddress.style.display = "block";
  };
}
//Hide Address
if(selectors.hideAddress != null) {
  selectors.hideAddress.onclick = function() {
    selectors.addAddress.style.display = "none";
    selectors.showAddAddress.style.display = "block";
    selectors.hideAddress.style.display = "none";
  };
}
//Edit Address
let showEditContainer = function(event) {
  console.log('event', this);//this is each item of showEditAddress which matches each btn
  var editAddress2 = this.closest('.address-main-summary').querySelector('#edit-address');
  var hideEditAddress2 = this.closest('.address-main-summary').querySelector('.hide-edit-address');
  var showEditAddress2 = this.closest('.address-main-summary').querySelector(".show-edit-address");
  editAddress2.style.display = "block";
  hideEditAddress2.style.display = "block";
}
//Edit Address function
if(selectors.showEditAddress != null){
  selectors.showEditAddress.forEach(function(item, index){
    item.addEventListener("click", showEditContainer);
  });
}
//Hide Address function
if(selectors.hideEditAddress != null) {
  selectors.hideEditAddress.forEach(function(self){
    self.onclick = function() {
      var editAddress2 = this.closest('.address-main-summary').querySelector('#edit-address');
      var hideEditAddress2 = this.closest('.address-main-summary').querySelector('.hide-edit-address');
      var showEditAddress2 = this.closest('.address-main-summary').querySelector(".show-edit-address");
      editAddress2.style.display = "none";
      showEditAddress2.style.display = "block";
      hideEditAddress2.style.display = "none";
    };
  });
}
//Login button
if(selectors.registerForm != null) {
  selectors.registerForm.style.display = "none";
}
//Sign button
if(selectors.signInBtn != null) {
  selectors.signInBtn.onclick = function(e) {
    e.preventDefault();
    var $this = this;
    $this.classList.add('active');
    selectors.registerBtn.classList.remove('active');
    selectors.registerForm.style.display = "none";
    selectors.loginForm.style.display = "block";
  };
}
//register button
if(selectors.registerBtn != null) {
  selectors.registerBtn.onclick = function(e) {
    e.preventDefault();
    var $this = this;
    $this.classList.add('active');
    selectors.registerForm.style.display = "block";
    selectors.loginForm.style.display = "none";
  };
}
//Disable reset btn unless value on login page
if(document.getElementById('resetBtn') != null) {
  document.getElementById('resetBtn').disabled = true; //Disable at first
  document.getElementById('recover-email').addEventListener('keyup', e => {
    //Check for the input's value
    if (e.target.value == "") {
      document.getElementById('resetBtn').disabled = true;
    }
    else {
      document.getElementById('resetBtn').disabled = false;
    }
  });
}
//Disable reset btn unless value on reset password page
if(document.getElementById('resetPasswordBtn') != null) {
  document.getElementById('resetPasswordBtn').disabled = true; //Disable at first

  document.querySelectorAll('.password-validate').forEach(function(item) {
    item.addEventListener('keyup', e => {
      //Check for the input's value
      if (e.target.value == "") {
        document.getElementById('resetPasswordBtn').disabled = true;
      }
      else {
        document.getElementById('resetPasswordBtn').disabled = false;
      }
    });
  })
}
//ADD NEW ADDRESS LOGIC
const attributes = {
  addressCountryNew: document.querySelector('#AddressCountryNew'),
  addressProvinceNew: document.querySelector('#AddressProvinceNew'),
  addressProvinceNewEdit: document.querySelector('#AddressCountryNewEdit')
}
//The selectedIndex property returns the index of the selected option in our drop-down list.
//JSON parse turns a string to an array
if(attributes.addressCountryNew != null) {
  attributes.addressCountryNew.addEventListener('change', function(e) {
    var provinces = this.options[this.selectedIndex].getAttribute('data-provinces');
    console.log(this.options[this.selectedIndex]);
    var provinceSelector = attributes.addressProvinceNew;
    var provinceArray = JSON.parse(provinces);
    console.log(provinceArray);

    if(provinceArray.length < 1) {
      provinceSelector.setAttribute('disabled', 'disabled');
    } else {
      provinceSelector.removeAttribute('disabled');
    }

    provinceSelector.innerHTML = '';
    var options = '';

    //loop through the province array we have converted
    for(var i = 0; i < provinceArray.length; i++) {
      options += '<option value="' + provinceArray[i][0] + '">' + provinceArray[i][0] + '</option>'
    }
    provinceSelector.innerHTML = options;
  });
}
