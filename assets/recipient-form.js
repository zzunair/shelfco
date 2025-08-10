if (!customElements.get('recipient-form')) {
  customElements.define('recipient-form', class RecipientForm extends HTMLElement {
    constructor() {
      super();
      this.checkboxInput = this.querySelector(`#Recipient-Checkbox-${ this.dataset.sectionId }`);
      this.checkboxInput.disabled = false;
      this.hiddenControlField = this.querySelector(`#Recipient-Control-${ this.dataset.sectionId }`);
      this.hiddenControlField.disabled = true;
      this.emailInput = this.querySelector(`#Recipient-email-${ this.dataset.sectionId }`);
      this.nameInput = this.querySelector(`#Recipient-name-${ this.dataset.sectionId }`);
      this.messageInput = this.querySelector(`#Recipient-message-${ this.dataset.sectionId }`);
      this.errorMessageWrapper = this.querySelector('.product-form__recipient-error-message-wrapper');
      this.errorMessageList = this.errorMessageWrapper?.querySelector('ul');
      this.errorMessage = this.errorMessageWrapper?.querySelector('.error-message');
      this.defaultErrorHeader = this.errorMessage?.innerText;
      this.wrapper = document.querySelector(".js-recipient-fields");
      this.errorMessageElement = document.querySelector('.invalid-feedback');
      this.emailMessage = `${window.theme.giftcardLabel}`
      this.addEventListener('change', this.onChange.bind(this));
      this.addEventListener('click', this.onClick.bind(this));
    }

    onChange() {
      if (!this.checkboxInput.checked) {
        this.clearInputFields();
        this.clearErrorMessage();
      }
    }

    onClick() {
      if (!this.checkboxInput.checked) {
        this.wrapper.style.display = 'none';
        this.errorMessageElement.innerText = '';
      } else {
        this.wrapper.style.display = 'block';
        this.errorMessageElement.innerText = this.emailMessage;
      }
      this.errorMessageElement.style.display = 'block';
      this.errorMessageElement.style.color = '#6c757d';
    }

    clearInputFields() {
      this.emailInput.value = '';
      this.nameInput.value = '';
      this.messageInput.value = '';
    }

    clearErrorMessage() {
      this.errorMessageWrapper.hidden = true;

      if (this.errorMessageList) this.errorMessageList.innerHTML = '';

      this.querySelectorAll('.js-recipient-fields .form__message').forEach(field => {
        field.classList.add('hidden');
        const textField = field.querySelector('.error-message');
        if (textField) textField.innerText = '';
      });

      [this.emailInput, this.messageInput, this.nameInput].forEach(inputElement => {
        inputElement.setAttribute('aria-invalid', false);
        inputElement.removeAttribute('aria-describedby');
      });
    }

    resetRecipientForm() {
      if (this.checkboxInput.checked) {
        this.checkboxInput.checked = false;
        this.clearInputFields();
        this.clearErrorMessage();
      }
    }
  });
}
