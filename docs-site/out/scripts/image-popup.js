// Image Popup Functionality
class ImagePopup {
  constructor() {
    this.currentScale = 1;
    this.minScale = 0.5;
    this.maxScale = 3;
    this.scaleStep = 0.25;
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.dragOffset = { x: 0, y: 0 };
    this.currentImage = null;
    this.overlay = null;
    
    this.init();
  }

  init() {
    // Add click listeners to all images
    this.addImageClickListeners();
    
    // Listen for keyboard events
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
  }

  addImageClickListeners() {
    // Find all images in the content and make them clickable
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Skip small images (icons, etc.)
      if (img.width > 100 && img.height > 100) {
        img.classList.add('clickable-image');
        img.addEventListener('click', (e) => this.openPopup(e.target));
      }
    });
  }

  openPopup(img) {
    this.currentImage = img;
    this.currentScale = 1;
    this.dragOffset = { x: 0, y: 0 };
    
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'image-popup-overlay';
    
    // Create container
    const container = document.createElement('div');
    container.className = 'image-popup-container';
    
    // Create popup image
    const popupImg = document.createElement('img');
    popupImg.src = img.src;
    popupImg.alt = img.alt || 'Popup image';
    popupImg.className = 'image-popup-image';
    popupImg.draggable = false;
    
    // Create controls
    const controls = this.createControls();
    
    // Create zoom info
    const zoomInfo = document.createElement('div');
    zoomInfo.className = 'image-popup-zoom-info';
    zoomInfo.textContent = `Zoom: 100%`;
    
    // Add event listeners
    this.addPopupEventListeners(popupImg, zoomInfo);
    
    // Assemble popup
    container.appendChild(popupImg);
    container.appendChild(controls);
    container.appendChild(zoomInfo);
    this.overlay.appendChild(container);
    
    // Add to document
    document.body.appendChild(this.overlay);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Close on overlay click
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.closePopup();
      }
    });
  }

  createControls() {
    const controls = document.createElement('div');
    controls.className = 'image-popup-controls';
    
    // Zoom in button
    const zoomInBtn = document.createElement('button');
    zoomInBtn.className = 'image-popup-btn';
    zoomInBtn.innerHTML = '+';
    zoomInBtn.title = 'Zoom In';
    zoomInBtn.addEventListener('click', () => this.zoomIn());
    
    // Zoom out button
    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.className = 'image-popup-btn';
    zoomOutBtn.innerHTML = '−';
    zoomOutBtn.title = 'Zoom Out';
    zoomOutBtn.addEventListener('click', () => this.zoomOut());
    
    // Reset zoom button
    const resetBtn = document.createElement('button');
    resetBtn.className = 'image-popup-btn';
    resetBtn.innerHTML = '⟲';
    resetBtn.title = 'Reset Zoom';
    resetBtn.addEventListener('click', () => this.resetZoom());
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'image-popup-btn image-popup-close';
    closeBtn.innerHTML = '×';
    closeBtn.title = 'Close';
    closeBtn.addEventListener('click', () => this.closePopup());
    
    controls.appendChild(zoomInBtn);
    controls.appendChild(zoomOutBtn);
    controls.appendChild(resetBtn);
    controls.appendChild(closeBtn);
    
    return controls;
  }

  addPopupEventListeners(img, zoomInfo) {
    // Mouse wheel zoom
    img.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        this.zoomIn();
      } else {
        this.zoomOut();
      }
      this.updateZoomInfo(zoomInfo);
    });
    
    // Drag functionality
    img.addEventListener('mousedown', (e) => this.startDrag(e, img));
    document.addEventListener('mousemove', (e) => this.handleDrag(e, img));
    document.addEventListener('mouseup', () => this.endDrag(img));
    
    // Touch events for mobile
    img.addEventListener('touchstart', (e) => this.startDrag(e, img), { passive: false });
    document.addEventListener('touchmove', (e) => this.handleDrag(e, img), { passive: false });
    document.addEventListener('touchend', () => this.endDrag(img));
  }

  startDrag(e, img) {
    this.isDragging = true;
    img.classList.add('dragging');
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    this.dragStart = {
      x: clientX - this.dragOffset.x,
      y: clientY - this.dragOffset.y
    };
    
    e.preventDefault();
  }

  handleDrag(e, img) {
    if (!this.isDragging) return;
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    this.dragOffset = {
      x: clientX - this.dragStart.x,
      y: clientY - this.dragStart.y
    };
    
    this.updateImageTransform(img);
    e.preventDefault();
  }

  endDrag(img) {
    this.isDragging = false;
    img.classList.remove('dragging');
  }

  zoomIn() {
    if (this.currentScale < this.maxScale) {
      this.currentScale += this.scaleStep;
      const img = this.overlay.querySelector('.image-popup-image');
      const zoomInfo = this.overlay.querySelector('.image-popup-zoom-info');
      this.updateImageTransform(img);
      this.updateZoomInfo(zoomInfo);
    }
  }

  zoomOut() {
    if (this.currentScale > this.minScale) {
      this.currentScale -= this.scaleStep;
      const img = this.overlay.querySelector('.image-popup-image');
      const zoomInfo = this.overlay.querySelector('.image-popup-zoom-info');
      this.updateImageTransform(img);
      this.updateZoomInfo(zoomInfo);
    }
  }

  resetZoom() {
    this.currentScale = 1;
    this.dragOffset = { x: 0, y: 0 };
    const img = this.overlay.querySelector('.image-popup-image');
    const zoomInfo = this.overlay.querySelector('.image-popup-zoom-info');
    this.updateImageTransform(img);
    this.updateZoomInfo(zoomInfo);
  }

  updateImageTransform(img) {
    img.style.transform = `scale(${this.currentScale}) translate(${this.dragOffset.x / this.currentScale}px, ${this.dragOffset.y / this.currentScale}px)`;
  }

  updateZoomInfo(zoomInfo) {
    zoomInfo.textContent = `Zoom: ${Math.round(this.currentScale * 100)}%`;
  }

  handleKeydown(e) {
    if (!this.overlay) return;
    
    switch (e.key) {
      case 'Escape':
        this.closePopup();
        break;
      case '+':
      case '=':
        e.preventDefault();
        this.zoomIn();
        this.updateZoomInfo(this.overlay.querySelector('.image-popup-zoom-info'));
        break;
      case '-':
        e.preventDefault();
        this.zoomOut();
        this.updateZoomInfo(this.overlay.querySelector('.image-popup-zoom-info'));
        break;
      case '0':
        e.preventDefault();
        this.resetZoom();
        this.updateZoomInfo(this.overlay.querySelector('.image-popup-zoom-info'));
        break;
    }
  }

  closePopup() {
    if (this.overlay) {
      document.body.style.overflow = '';
      this.overlay.remove();
      this.overlay = null;
      this.currentImage = null;
    }
  }

  // Method to refresh listeners for dynamically loaded content
  refresh() {
    this.addImageClickListeners();
  }
}

// Initialize when DOM is loaded
if (typeof window !== 'undefined') {
  let imagePopup;
  
  function initializeImagePopup() {
    imagePopup = new ImagePopup();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeImagePopup);
  } else {
    initializeImagePopup();
  }
  
  // Re-initialize for client-side navigation
  window.addEventListener('load', () => {
    if (imagePopup) {
      imagePopup.refresh();
    }
  });
  
  // For Next.js route changes
  if (typeof window !== 'undefined' && window.next) {
    window.next.router?.events?.on('routeChangeComplete', () => {
      setTimeout(() => {
        if (imagePopup) {
          imagePopup.refresh();
        }
      }, 100);
    });
  }
}