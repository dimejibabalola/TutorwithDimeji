/**
 * Dimeji LSAT Tutoring Website JavaScript
 * Handles responsive navigation and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    initMobileNavigation();
    
    // Form Validation
    initFormValidation();
    
    // Testimonial Slider
    initTestimonialSlider();
    
    // FAQ Accordion
    initFaqAccordion();
    
    // Service Package Selection
    initServicePackageSelection();
    
    // Booking Form with Date/Time Selection
    initBookingForm();
    
    // Smooth Scrolling for Anchor Links (already implemented)
    initSmoothScrolling();
});

/**
 * Initialize mobile navigation toggle functionality
 */
function initMobileNavigation() {
    const header = document.querySelector('header .container');
    const nav = document.querySelector('nav');
    
    // Only proceed if header and nav exist
    if (!header || !nav) return;
    
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'nav-toggle';
    mobileToggle.innerHTML = '☰';
    mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Insert the toggle button after the logo
    const logo = document.querySelector('.logo');
    if (logo) {
        header.insertBefore(mobileToggle, logo.nextSibling);
    }
    
    // Toggle navigation on mobile
    mobileToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        const isExpanded = nav.classList.contains('active');
        mobileToggle.setAttribute('aria-expanded', isExpanded);
        mobileToggle.innerHTML = isExpanded ? '✕' : '☰';
    });
}

/**
 * Initialize form validation for contact form
 */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Simple validation
        let valid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                valid = false;
                field.classList.add('error');
                
                // Add error message if it doesn't exist
                let errorMsg = field.parentNode.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'This field is required';
                    field.parentNode.appendChild(errorMsg);
                }
            } else {
                field.classList.remove('error');
                const errorMsg = field.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
        });
        
        // Email validation
        const emailField = contactForm.querySelector('#email');
        if (emailField && emailField.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value)) {
                valid = false;
                emailField.classList.add('error');
                
                // Add error message if it doesn't exist
                let errorMsg = emailField.parentNode.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Please enter a valid email address';
                    emailField.parentNode.appendChild(errorMsg);
                } else {
                    errorMsg.textContent = 'Please enter a valid email address';
                }
            }
        }
        
        if (valid) {
            // In a real implementation, this would submit the form
            // For now, just show a success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Form submitted successfully! In a real implementation, this would send your message.';
            contactForm.appendChild(successMsg);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
            
            contactForm.reset();
        }
    });
    
    // Real-time validation feedback
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error styling as user types
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
        });
    });
}

/**
 * Validate a single form field
 * @param {HTMLElement} field - The field to validate
 * @returns {boolean} - Whether the field is valid
 */
function validateField(field) {
    let valid = true;
    
    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        valid = false;
        field.classList.add('error');
        
        // Add error message if it doesn't exist
        let errorMsg = field.parentNode.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'This field is required';
            field.parentNode.appendChild(errorMsg);
        }
    } else {
        field.classList.remove('error');
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }
    
    // Email validation
    if (field.id === 'email' && field.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value)) {
            valid = false;
            field.classList.add('error');
            
            // Add error message if it doesn't exist
            let errorMsg = field.parentNode.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Please enter a valid email address';
                field.parentNode.appendChild(errorMsg);
            } else {
                errorMsg.textContent = 'Please enter a valid email address';
            }
        }
    }
    
    // Phone validation (optional field)
    if (field.id === 'phone' && field.value) {
        const phonePattern = /^[\d\s\-\(\)]+$/;
        if (!phonePattern.test(field.value)) {
            valid = false;
            field.classList.add('error');
            
            // Add error message if it doesn't exist
            let errorMsg = field.parentNode.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Please enter a valid phone number';
                field.parentNode.appendChild(errorMsg);
            } else {
                errorMsg.textContent = 'Please enter a valid phone number';
            }
        }
    }
    
    return valid;
}

/**
 * Initialize testimonial slider/carousel on the homepage
 */
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (!testimonialSlider) return;
    
    // Sample testimonials data - in a real implementation, this would come from a database
    const testimonials = [
        {
            text: "Dimeji's tutoring helped me improve my LSAT score by 10 points in just one month. His teaching style and personalized approach made all the difference.",
            author: "Former Student"
        },
        {
            text: "The Socratic method combined with timed drills really helped me understand the logic behind LSAT questions. I went from a 155 to a 167 after working with Dimeji.",
            author: "Law School Applicant"
        },
        {
            text: "I struggled with Logic Games until I started working with Dimeji. His strategies for diagramming and making inferences transformed my approach to this section.",
            author: "LSAT Student"
        }
    ];
    
    // Clear existing testimonials
    testimonialSlider.innerHTML = '';
    
    // Create testimonial elements
    testimonials.forEach((testimonial, index) => {
        const testimonialElement = document.createElement('div');
        testimonialElement.className = 'testimonial';
        testimonialElement.style.display = index === 0 ? 'block' : 'none';
        testimonialElement.innerHTML = `
            <p>"${testimonial.text}"</p>
            <p class="testimonial-author">- ${testimonial.author}</p>
        `;
        testimonialSlider.appendChild(testimonialElement);
    });
    
    // Add navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonial-dots';
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'testimonial-dot';
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', () => showTestimonial(index));
        dotsContainer.appendChild(dot);
    });
    testimonialSlider.parentNode.appendChild(dotsContainer);
    
    // Add navigation arrows
    const prevButton = document.createElement('button');
    prevButton.className = 'testimonial-nav prev';
    prevButton.innerHTML = '&lt;';
    prevButton.setAttribute('aria-label', 'Previous testimonial');
    
    const nextButton = document.createElement('button');
    nextButton.className = 'testimonial-nav next';
    nextButton.innerHTML = '&gt;';
    nextButton.setAttribute('aria-label', 'Next testimonial');
    
    testimonialSlider.parentNode.appendChild(prevButton);
    testimonialSlider.parentNode.appendChild(nextButton);
    
    // Set up navigation
    let currentTestimonial = 0;
    
    prevButton.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    nextButton.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
        const testimonialElements = testimonialSlider.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.testimonial-dot');
        
        testimonialElements.forEach((el, i) => {
            el.style.display = i === index ? 'block' : 'none';
        });
        
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        currentTestimonial = index;
    }
    
    // Auto-rotate testimonials every 5 seconds
    let testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Pause rotation on hover
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    });
    
    // Keyboard accessibility
    prevButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            prevButton.click();
        }
    });
    
    nextButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            nextButton.click();
        }
    });
}

/**
 * Initialize FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        // Hide answers initially
        if (answer) {
            answer.style.display = 'none';
        }
        
        // Add click event to questions
        if (question) {
            question.classList.add('accordion-trigger');
            
            // Add accessibility attributes
            question.setAttribute('aria-expanded', 'false');
            question.setAttribute('role', 'button');
            question.setAttribute('tabindex', '0');
            
            if (answer) {
                const answerId = `faq-answer-${Math.random().toString(36).substring(2, 9)}`;
                answer.id = answerId;
                question.setAttribute('aria-controls', answerId);
            }
            
            // Toggle answer visibility on click
            question.addEventListener('click', () => {
                toggleAccordion(item);
            });
            
            // Keyboard accessibility
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleAccordion(item);
                }
            });
        }
    });
    
    // Function to toggle accordion item
    function toggleAccordion(item) {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        if (!question || !answer) return;
        
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                const otherQuestion = otherItem.querySelector('h3');
                const otherAnswer = otherItem.querySelector('p');
                
                if (otherQuestion && otherAnswer) {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.style.display = 'none';
                    otherItem.classList.remove('active');
                }
            }
        });
        
        // Toggle current item
        if (isExpanded) {
            question.setAttribute('aria-expanded', 'false');
            answer.style.display = 'none';
            item.classList.remove('active');
        } else {
            question.setAttribute('aria-expanded', 'true');
            answer.style.display = 'block';
            item.classList.add('active');
        }
    }
}

/**
 * Initialize service package selection with dynamic pricing display
 */
function initServicePackageSelection() {
    // Check if we're on the services page
    const pricingCards = document.querySelectorAll('.pricing-card');
    if (!pricingCards.length) return;
    
    // Add selection functionality to pricing cards
    pricingCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected class from all cards
            pricingCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            card.classList.add('selected');
            
            // Update the booking button to reflect selection
            const packageName = card.querySelector('h3').textContent;
            const price = card.querySelector('.price').textContent;
            
            // Find all "Book Now" buttons and update them
            const bookButtons = document.querySelectorAll('.pricing-card .btn.primary');
            bookButtons.forEach(button => {
                button.textContent = 'Book Now';
            });
            
            // Update the clicked card's button
            const bookButton = card.querySelector('.btn.primary');
            bookButton.textContent = 'Selected';
            
            // Store selection in session storage for use on contact page
            sessionStorage.setItem('selectedPackage', packageName);
            sessionStorage.setItem('selectedPrice', price);
        });
        
        // Keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
    
    // Check if there's a stored selection and apply it
    const storedPackage = sessionStorage.getItem('selectedPackage');
    if (storedPackage) {
        pricingCards.forEach(card => {
            const packageName = card.querySelector('h3').textContent;
            if (packageName === storedPackage) {
                card.classList.add('selected');
                const bookButton = card.querySelector('.btn.primary');
                bookButton.textContent = 'Selected';
            }
        });
    }
}

/**
 * Initialize booking form with date/time selection
 */
function initBookingForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Check if subject dropdown exists
    const subjectDropdown = contactForm.querySelector('#subject');
    if (!subjectDropdown) return;
    
    // Add booking-specific fields when "Tutoring Package" is selected
    subjectDropdown.addEventListener('change', function() {
        const bookingFieldsContainer = document.getElementById('bookingFields');
        
        // Remove existing booking fields if they exist
        if (bookingFieldsContainer) {
            bookingFieldsContainer.remove();
        }
        
        if (this.value === 'package') {
            // Create booking fields container
            const container = document.createElement('div');
            container.id = 'bookingFields';
            
            // Get selected package from session storage
            const selectedPackage = sessionStorage.getItem('selectedPackage') || 'Single Session';
            const selectedPrice = sessionStorage.getItem('selectedPrice') || '$45/hour';
            
            // Create package selection field
            const packageField = document.createElement('div');
            packageField.className = 'form-group';
            packageField.innerHTML = `
                <label for="package">Package</label>
                <select id="package" name="package" required>
                    <option value="single" ${selectedPackage === 'Single Session' ? 'selected' : ''}>Single Session ($45/hour)</option>
                    <option value="5-hour" ${selectedPackage === '5-Hour Package' ? 'selected' : ''}>5-Hour Package ($200)</option>
                    <option value="10-hour" ${selectedPackage === '10-Hour Package' ? 'selected' : ''}>10-Hour Package ($350)</option>
                </select>
            `;
            
            // Create date selection field
            const dateField = document.createElement('div');
            dateField.className = 'form-group';
            
            // Set min date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const minDate = tomorrow.toISOString().split('T')[0];
            
            // Set max date to 3 months from now
            const maxDate = new Date();
            maxDate.setMonth(maxDate.getMonth() + 3);
            const maxDateStr = maxDate.toISOString().split('T')[0];
            
            dateField.innerHTML = `
                <label for="date">Preferred Date</label>
                <input type="date" id="date" name="date" min="${minDate}" max="${maxDateStr}" required>
            `;
            
            // Create time selection field
            const timeField = document.createElement('div');
            timeField.className = 'form-group';
            timeField.innerHTML = `
                <label for="time">Preferred Time</label>
                <select id="time" name="time" required>
                    <option value="">Select a time</option>
                    <option value="9:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                </select>
            `;
            
            // Create session type field
            const sessionTypeField = document.createElement('div');
            sessionTypeField.className = 'form-group';
            sessionTypeField.innerHTML = `
                <label for="sessionType">Session Type</label>
                <select id="sessionType" name="sessionType" required>
                    <option value="">Select session type</option>
                    <option value="online">Online (Zoom)</option>
                    <option value="in-person">In-Person (Oakdale, PA)</option>
                </select>
            `;
            
            // Add fields to container
            container.appendChild(packageField);
            container.appendChild(dateField);
            container.appendChild(timeField);
            container.appendChild(sessionTypeField);
            
            // Insert container before message field
            const messageField = contactForm.querySelector('#message').parentNode;
            contactForm.insertBefore(container, messageField);
            
            // Update message label
            const messageLabel = contactForm.querySelector('label[for="message"]');
            if (messageLabel) {
                messageLabel.textContent = 'Additional Notes';
            }
        } else {
            // Reset message label if not booking
            const messageLabel = contactForm.querySelector('label[for="message"]');
            if (messageLabel) {
                messageLabel.textContent = 'Message';
            }
        }
    });
    
    // Check if there's a stored package and auto-select "Tutoring Package"
    const storedPackage = sessionStorage.getItem('selectedPackage');
    if (storedPackage && subjectDropdown) {
        subjectDropdown.value = 'package';
        // Trigger change event to show booking fields
        const event = new Event('change');
        subjectDropdown.dispatchEvent(event);
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Set focus to the target element for accessibility
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                    
                    // Update URL without page reload
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}