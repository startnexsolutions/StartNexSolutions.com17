// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initMobileMenu();
  initSmoothScrolling();
  initScrollAnimations();
  initContactForm();
  initCounters();
  initScrollProgress();
  initBackToTop();
  initActiveNav();
  initFormAnimations();
  initHoverEffects();
  initPageLoader();
  initBlog();
});

// Mobile Menu Toggle
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  if (!hamburger || !navMenu) return;
  
  hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
  });
  
  // Close menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.style.overflow = 'auto';
      });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
          if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
              hamburger.classList.remove('active');
              navMenu.classList.remove('active');
              document.body.style.overflow = 'auto';
          }
      }
  });
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 100,
                  behavior: 'smooth'
              });
          }
      });
  });
}

// Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-text');
  
  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const element = entry.target;
              const animationType = element.getAttribute('data-animation') || 'slide-up';
              const delay = parseFloat(element.getAttribute('data-delay')) || 0;
              
              // Apply animation with delay
              setTimeout(() => {
                  element.classList.add('animated');
                  
                  // Add specific animation class
                  element.classList.add(`animate-${animationType}`);
                  
                  // Stop observing after animation
                  observer.unobserve(element);
              }, delay * 1000);
          }
      });
  }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe all animated elements
  animatedElements.forEach(element => {
      observer.observe(element);
  });
  
  // Add CSS for animation types
  const style = document.createElement('style');
  style.textContent = `
      .animate-slide-up { animation: slideUp 0.8s ease forwards; }
      .animate-slide-down { animation: slideDown 0.8s ease forwards; }
      .animate-slide-left { animation: slideLeft 0.8s ease forwards; }
      .animate-slide-right { animation: slideRight 0.8s ease forwards; }
      .animate-fade-in { animation: fadeIn 0.8s ease forwards; }
  `;
  document.head.appendChild(style);
}

// Contact Form Submission
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const phone = this.querySelector('input[type="tel"]').value;
      const service = this.querySelector('select').value;
      const message = this.querySelector('textarea').value;
      
      // Validate form
      if (!name || !email || !phone || !service || !message) {
          showNotification('Please fill in all required fields', 'error');
          return;
      }
      
      // Create WhatsApp message
      const whatsappMessage = `*New Contact Form Submission*%0A%0A
*Name:* ${name}%0A
*Email:* ${email}%0A
*Phone:* ${phone}%0A
*Service:* ${service}%0A
*Message:* ${message}`;
      
      // Open WhatsApp
      window.open(`https://wa.me/919168117217?text=${whatsappMessage}`, '_blank');
      
      // Reset form
      this.reset();
      
      // Show success message
      showNotification('Thank you for your message! We will contact you shortly.', 'success');
      
      // Add success animation
      this.style.animation = 'slideUp 0.5s ease';
      setTimeout(() => {
          this.style.animation = '';
      }, 500);
  });
}

// Counter Animation
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  if (counters.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const counter = entry.target;
              const target = parseInt(counter.getAttribute('data-count'));
              const duration = 2000;
              const increment = target / (duration / 16);
              let current = 0;
              
              const updateCounter = () => {
                  if (current < target) {
                      current += increment;
                      counter.textContent = Math.floor(current);
                      requestAnimationFrame(updateCounter);
                  } else {
                      counter.textContent = target;
                  }
              };
              
              updateCounter();
              observer.unobserve(counter);
          }
      });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// Scroll Progress Bar
function initScrollProgress() {
  const progressContainer = document.createElement('div');
  progressContainer.className = 'progress-container';
  progressContainer.innerHTML = '<div class="progress-bar" id="progressBar"></div>';
  document.body.appendChild(progressContainer);
  
  const progressBar = document.getElementById('progressBar');
  
  window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      progressBar.style.width = scrolled + '%';
  });
}

// Back to Top Button
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  
  if (!backToTop) return;
  
  window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
          backToTop.classList.add('active');
      } else {
          backToTop.classList.remove('active');
      }
  });
  
  backToTop.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
}

// Active Navigation on Scroll
function initActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (sections.length === 0 || navLinks.length === 0) return;
  
  window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          
          if (window.pageYOffset >= sectionTop - 150) {
              current = section.getAttribute('id');
          }
      });
      
      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
              link.classList.add('active');
          }
      });
  });
}

// Form Field Animations
function initFormAnimations() {
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
  
  formInputs.forEach(input => {
      // Add focus effect
      input.addEventListener('focus', function() {
          this.parentElement.classList.add('focused');
      });
      
      // Remove focus effect
      input.addEventListener('blur', function() {
          if (!this.value) {
              this.parentElement.classList.remove('focused');
          }
      });
      
      // Add value check on load
      if (input.value) {
          input.parentElement.classList.add('focused');
      }
  });
}

// Hover Effects
function initHoverEffects() {
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(btn => {
      btn.addEventListener('click', function(e) {
          // Create ripple element
          const ripple = document.createElement('span');
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;
          
          // Style ripple
          ripple.style.cssText = `
              position: absolute;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.7);
              transform: scale(0);
              animation: ripple 0.6s linear;
              width: ${size}px;
              height: ${size}px;
              top: ${y}px;
              left: ${x}px;
          `;
          
          // Add ripple to button
          this.style.position = 'relative';
          this.style.overflow = 'hidden';
          this.appendChild(ripple);
          
          // Remove ripple after animation
          setTimeout(() => ripple.remove(), 600);
      });
  });
  
  // Add ripple animation CSS
  if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
          @keyframes ripple {
              to {
                  transform: scale(4);
                  opacity: 0;
              }
          }
      `;
      document.head.appendChild(style);
  }
  
  // Add hover effect to cards
  const cards = document.querySelectorAll('.service-card, .package-card, .testimonial-card, .feature-item, .info-card');
  
  cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-10px)';
          card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
      });
      
      card.addEventListener('mouseleave', () => {
          card.style.transform = '';
          card.style.boxShadow = '';
      });
  });
}

// Page Loader
function initPageLoader() {
  // Create loader
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
      <div class="loader-content">
          <div class="loader-spinner"></div>
          <div class="loader-text">StartNex Solutions</div>
      </div>
  `;
  
  // Add loader styles
  const loaderStyle = document.createElement('style');
  loaderStyle.textContent = `
      .page-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--dark);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          transition: opacity 0.5s ease, visibility 0.5s ease;
      }
      
      .page-loader.loaded {
          opacity: 0;
          visibility: hidden;
      }
      
      .loader-content {
          text-align: center;
      }
      
      .loader-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid var(--yellow);
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
      }
      
      .loader-text {
          color: var(--yellow);
          font-size: 1.5rem;
          font-weight: 700;
          font-family: 'Montserrat', sans-serif;
          animation: fadeIn 1s ease infinite alternate;
      }
      
      @keyframes spin {
          to { transform: rotate(360deg); }
      }
  `;
  document.head.appendChild(loaderStyle);
  document.body.appendChild(loader);
  
  // Remove loader when page is loaded
  window.addEventListener('load', () => {
      setTimeout(() => {
          loader.classList.add('loaded');
          setTimeout(() => {
              loader.remove();
          }, 500);
      }, 1000);
  });
}

// Notification System
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
      <div class="notification-content">
          <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
          <span>${message}</span>
      </div>
  `;
  
  // Style notification
  notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      max-width: 350px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Poppins', sans-serif;
  `;
  
  document.body.appendChild(notification);
  
  // Add notification animation CSS
  if (!document.querySelector('#notification-animations')) {
      const style = document.createElement('style');
      style.id = 'notification-animations';
      style.textContent = `
          @keyframes slideInRight {
              from {
                  transform: translateX(100%);
                  opacity: 0;
              }
              to {
                  transform: translateX(0);
                  opacity: 1;
              }
          }
          
          @keyframes slideOutRight {
              from {
                  transform: translateX(0);
                  opacity: 1;
              }
              to {
                  transform: translateX(100%);
                  opacity: 0;
              }
          }
      `;
      document.head.appendChild(style);
  }
  
  // Remove notification after 3 seconds
  setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
      setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Newsletter Form
function initNewsletter() {
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const email = this.querySelector('input[type="email"]').value;
          
          if (!email) {
              showNotification('Please enter your email address', 'error');
              return;
          }
          
          // Simulate subscription
          this.querySelector('input').value = '';
          showNotification('Thank you for subscribing to our newsletter!', 'success');
      });
  }
}

// Initialize newsletter on load
document.addEventListener('DOMContentLoaded', initNewsletter);

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
      // Close mobile menu on resize to desktop
      if (window.innerWidth > 768) {
          const hamburger = document.getElementById('hamburger');
          const navMenu = document.getElementById('navMenu');
          
          if (hamburger && navMenu) {
              hamburger.classList.remove('active');
              navMenu.classList.remove('active');
              document.body.style.overflow = 'auto';
          }
      }
  }, 250);
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  // Close mobile menu with Escape key
  if (e.key === 'Escape') {
      const hamburger = document.getElementById('hamburger');
      const navMenu = document.getElementById('navMenu');
      
      if (hamburger && navMenu && navMenu.classList.contains('active')) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.style.overflow = 'auto';
      }
  }
  
  // Navigate to top with Home key
  if (e.key === 'Home') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Navigate to bottom with End key
  if (e.key === 'End') {
      e.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
});

// Add touch gestures for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchEndY - touchStartY;
  
  // Swipe up to close mobile menu
  if (swipeDistance < -50 && window.innerWidth <= 768) {
      const hamburger = document.getElementById('hamburger');
      const navMenu = document.getElementById('navMenu');
      
      if (hamburger && navMenu && navMenu.classList.contains('active')) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.style.overflow = 'auto';
      }
  }
}

// Add performance optimizations
window.addEventListener('load', () => {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.getAttribute('data-src');
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
          }
      });
  });
  
  images.forEach(img => imageObserver.observe(img));
});

/* ==================== Blog Functionality ==================== */

// Blog password for management (Change this to your desired password)
const BLOG_PASSWORD = 'admin123';
let blogAuthenticatedSession = false;

// Initialize Blog
function initBlog() {
  const writeBlogBtn = document.getElementById('writeBlogBtn');
  const blogModal = document.getElementById('blogModal');
  const blogForm = document.getElementById('blogForm');
  const closeModal = document.getElementById('closeModal');
  const cancelBlogBtn = document.getElementById('cancelBlogBtn');
  
  if (!writeBlogBtn || !blogModal) return;
  
  // Open modal
  writeBlogBtn.addEventListener('click', () => {
      blogModal.classList.add('show');
      document.body.style.overflow = 'hidden';
  });
  
  // Close modal function
  const closeModalFunc = () => {
      blogModal.classList.remove('show');
      document.body.style.overflow = 'auto';
      blogForm.reset();
  };
  
  // Close modal buttons
  closeModal.addEventListener('click', closeModalFunc);
  cancelBlogBtn.addEventListener('click', closeModalFunc);
  
  // Close modal on background click
  blogModal.addEventListener('click', (e) => {
      if (e.target === blogModal) {
          closeModalFunc();
      }
  });
  
  // Handle form submission
  if (blogForm) {
      blogForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const title = document.getElementById('blogTitle').value.trim();
          const category = document.getElementById('blogCategory').value;
          const author = document.getElementById('blogAuthor').value.trim();
          const content = document.getElementById('blogContent').value.trim();
          
          if (title && category && author && content) {
              // Create blog post object
              const blogPost = {
                  id: Date.now(),
                  title,
                  category,
                  author,
                  content,
                  date: new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                  })
              };
              
              // Save to localStorage
              saveBlogPost(blogPost);
              
              // Show success message
              showNotification('Blog post published successfully!', 'success');
              
              // Close modal and reload posts
              closeModalFunc();
              loadBlogPosts();
          } else {
              showNotification('Please fill in all fields', 'error');
          }
      });
  }
  
  // Load blog posts on page load
  loadBlogPosts();
}

// Save blog post to localStorage
function saveBlogPost(post) {
  let blogs = JSON.parse(localStorage.getItem('blogPosts')) || [];
  blogs.unshift(post);
  localStorage.setItem('blogPosts', JSON.stringify(blogs));
}

// Load and display blog posts
function loadBlogPosts() {
  const container = document.getElementById('blogPostsContainer');
  if (!container) return;
  
  const blogs = JSON.parse(localStorage.getItem('blogPosts')) || [];
  
  if (blogs.length === 0) {
      container.innerHTML = `
          <div class="empty-blog-state" style="grid-column: 1 / -1;">
              <i class="fas fa-pen-fancy"></i>
              <h3>No Blog Posts Yet</h3>
              <p>Be the first to share your digital marketing insights!</p>
          </div>
      `;
      return;
  }
  
  container.innerHTML = blogs.map(blog => `
      <div class="blog-card animate-text" data-animation="slide-up">
          <div class="blog-thumbnail">
              <i class="fas fa-blog"></i>
          </div>
          <div class="blog-category">
              <span class="blog-category-tag">${blog.category}</span>
          </div>
          <div class="blog-content">
              <h3 class="blog-title">${blog.title}</h3>
              <div class="blog-meta">
                  <div class="blog-author">
                      <i class="fas fa-user-circle"></i> ${blog.author}
                  </div>
                  <div class="blog-date">
                      <i class="fas fa-calendar"></i> ${blog.date}
                  </div>
              </div>
              <p class="blog-text">${blog.content}</p>
              <div class="blog-actions">
                  <button class="view-btn" onclick="viewFullBlogPost(${blog.id})">
                      <i class="fas fa-eye"></i> View Full
                  </button>
                  ${blogAuthenticatedSession ? `<button class="delete-btn" onclick="deleteBlogPost(${blog.id})">
                      <i class="fas fa-trash"></i> Delete
                  </button>` : ''}
              </div>
          </div>
      </div>
  `).join('');
  
  
  // Re-apply animations
  const newCards = container.querySelectorAll('.blog-card');
  newCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      setTimeout(() => {
          card.style.transition = 'all 0.6s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
      }, index * 100);
  });
}

// Delete blog post
function deleteBlogPost(id) {
  // Check if user is authenticated
  if (!blogAuthenticatedSession) {
      showNotification('Please use "Manage Blogs" to authenticate before deleting.', 'error');
      return;
  }
  
  if (confirm('Are you sure you want to delete this blog post?')) {
      let blogs = JSON.parse(localStorage.getItem('blogPosts')) || [];
      blogs = blogs.filter(blog => blog.id !== id);
      localStorage.setItem('blogPosts', JSON.stringify(blogs));
      
      showNotification('Blog post deleted successfully!', 'success');
      loadBlogPosts();
  }
}

// View full blog post
function viewFullBlogPost(id) {
  const blogs = JSON.parse(localStorage.getItem('blogPosts')) || [];
  const blog = blogs.find(b => b.id === id);
  
  if (!blog) return;
  
  const fullBlogModal = document.getElementById('fullBlogModal');
  
  // Populate modal content
  document.getElementById('fullBlogTitle').textContent = blog.title;
  document.getElementById('fullBlogAuthor').textContent = blog.author;
  document.getElementById('fullBlogDate').textContent = blog.date;
  document.getElementById('fullBlogCategory').innerHTML = `<span class="blog-category-tag">${blog.category}</span>`;
  document.getElementById('fullBlogText').innerHTML = `<p>${blog.content.replace(/\n/g, '<br>')}</p>`;
  
  // Setup delete button
  const deleteBtn = document.getElementById('deleteFullBlogBtn');
  deleteBtn.onclick = () => {
      if (confirm('Are you sure you want to delete this blog post?')) {
          deleteBlogPost(id);
          fullBlogModal.classList.remove('show');
          document.body.style.overflow = 'auto';
      }
  };
  
  // Show modal
  fullBlogModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// Close full blog modal
function closeFullBlogModal() {
  const fullBlogModal = document.getElementById('fullBlogModal');
  fullBlogModal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// Initialize Blog
function initBlog() {
  const writeBlogBtn = document.getElementById('writeBlogBtn');
  const manageBlogBtn = document.getElementById('manageBlogBtn');
  const blogModal = document.getElementById('blogModal');
  const blogForm = document.getElementById('blogForm');
  const closeModal = document.getElementById('closeModal');
  const cancelBlogBtn = document.getElementById('cancelBlogBtn');
  const closeFullBlogModalBtn = document.getElementById('closeFullBlogModal');
  const fullBlogModal = document.getElementById('fullBlogModal');
  const blogPasswordModal = document.getElementById('blogPasswordModal');
  const closeBlogPasswordModal = document.getElementById('closeBlogPasswordModal');
  const verifyPasswordBtn = document.getElementById('verifyPasswordBtn');
  const cancelPasswordBtn = document.getElementById('cancelPasswordBtn');
  const blogPassword = document.getElementById('blogPassword');
  
  if (!writeBlogBtn || !blogModal) return;
  
  // Open write blog modal
  writeBlogBtn.addEventListener('click', () => {
      blogModal.classList.add('show');
      document.body.style.overflow = 'hidden';
  });
  
  // Open blog management (password protection)
  if (manageBlogBtn) {
      manageBlogBtn.addEventListener('click', () => {
          blogPasswordModal.classList.add('show');
          document.body.style.overflow = 'hidden';
          if (blogPassword) blogPassword.focus();
      });
  }
  
  // Handle password verification
  if (verifyPasswordBtn) {
      verifyPasswordBtn.addEventListener('click', () => {
          const enteredPassword = blogPassword.value.trim();
          
          if (enteredPassword === BLOG_PASSWORD) {
              blogAuthenticatedSession = true;
              showNotification('✓ Password verified! You can now manage and delete blogs.', 'success');
              blogPasswordModal.classList.remove('show');
              document.body.style.overflow = 'auto';
              blogPassword.value = '';
              
              // Reload blogs to show delete buttons
              loadBlogPosts();
          } else {
              showNotification('✗ Incorrect password! Try again.', 'error');
              blogPassword.value = '';
          }
      });
  }
  
  // Close password modal
  if (closeBlogPasswordModal) {
      closeBlogPasswordModal.addEventListener('click', () => {
          blogPasswordModal.classList.remove('show');
          document.body.style.overflow = 'auto';
          blogPassword.value = '';
          blogAuthenticatedSession = false;
      });
  }
  
  if (cancelPasswordBtn) {
      cancelPasswordBtn.addEventListener('click', () => {
          blogPasswordModal.classList.remove('show');
          document.body.style.overflow = 'auto';
          blogPassword.value = '';
          blogAuthenticatedSession = false;
      });
  }
  
  // Allow password entry with Enter key
  if (blogPassword) {
      blogPassword.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
              verifyPasswordBtn.click();
          }
      });
  }
  
  // Close write blog modal function
  const closeWriteModalFunc = () => {
      blogModal.classList.remove('show');
      document.body.style.overflow = 'auto';
      blogForm.reset();
  };
  
  // Close write blog modal buttons
  closeModal.addEventListener('click', closeWriteModalFunc);
  cancelBlogBtn.addEventListener('click', closeWriteModalFunc);
  
  // Close write blog modal on background click
  blogModal.addEventListener('click', (e) => {
      if (e.target === blogModal) {
          closeWriteModalFunc();
      }
  });
  
  // Close full blog modal
  if (closeFullBlogModalBtn) {
      closeFullBlogModalBtn.addEventListener('click', closeFullBlogModal);
  }
  
  if (fullBlogModal) {
      fullBlogModal.addEventListener('click', (e) => {
          if (e.target === fullBlogModal) {
              closeFullBlogModal();
          }
      });
  }
  
  // Handle write blog form submission
  if (blogForm) {
      blogForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const title = document.getElementById('blogTitle').value.trim();
          const category = document.getElementById('blogCategory').value;
          const author = document.getElementById('blogAuthor').value.trim();
          const content = document.getElementById('blogContent').value.trim();
          
          if (title && category && author && content) {
              // Create blog post object
              const blogPost = {
                  id: Date.now(),
                  title,
                  category,
                  author,
                  content,
                  date: new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                  })
              };
              
              // Save to localStorage
              saveBlogPost(blogPost);
              
              // Show success message
              showNotification('Blog post published successfully!', 'success');
              
              // Close modal and reload posts
              closeWriteModalFunc();
              loadBlogPosts();
          } else {
              showNotification('Please fill in all fields', 'error');
          }
      });
  }
  
  // Load blog posts on page load
  loadBlogPosts();
}
