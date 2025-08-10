//gift card QR code
document.addEventListener('DOMContentLoaded', function() {
 new QRCode(document.querySelector('#gift-card__qr-code'), {
  text: document.querySelector('#gift-card__qr-code').dataset.identifier,
  width: 120,
  height: 120
  });
});
// end gift card QR code

//gift card cody code and success message
var template = document.getElementsByTagName("template")[0];
var clonedTemplate = template.content.cloneNode(true);
var isMessageDisplayed = false;
document.querySelector('.gift-card__copy-link').addEventListener('click', () => {
  navigator.clipboard.writeText(document.querySelector('.gift-card__number').value).then(function () {
    if (!isMessageDisplayed) {
      document.querySelector('.gift-card__copy-success').appendChild(clonedTemplate);
      isMessageDisplayed = true
    }
  });
});
// end gift card cody code and success message
