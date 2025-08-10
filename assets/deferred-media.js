class DeferredMedia extends HTMLElement {
  constructor() {
    super();
    this.querySelector('[id^="Deferred-Poster-"]')?.addEventListener('click', this.loadContent.bind(this));
  }

  loadContent() {
    if (!this.getAttribute('loaded')) {
      const content = document.createElement('div');
      content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));
      this.querySelector('.deferred-media__poster-button').style.display = 'none';
      this.setAttribute('loaded', true);
      return this.appendChild(content.querySelector('video, model-viewer, iframe'));
    }
  }
}

customElements.define('deferred-media', DeferredMedia);
