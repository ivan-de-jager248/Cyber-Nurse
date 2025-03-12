<template>
  <form @submit.prevent="handleSubmit" class="space-y-6" novalidate>
    <!-- Success message -->
    <div v-if="formSuccess" class="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded" role="alert">
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <p class="font-medium">Thank you for your message! We'll get back to you shortly.</p>
      </div>
    </div>
    
    <!-- Form fields -->
    <div v-if="!formSuccess" class="space-y-6">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            :class="[
              'mt-1 block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500',
              errors.name ? 'border-red-300' : 'border-gray-300'
            ]"
            @blur="validateField('name')"
          />
          <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            :class="[
              'mt-1 block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500',
              errors.email ? 'border-red-300' : 'border-gray-300'
            ]"
            @blur="validateField('email')"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            v-model="formData.phone"
            placeholder="(123) 456-7890"
            :class="[
              'mt-1 block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500',
              errors.phone ? 'border-red-300' : 'border-gray-300'
            ]"
            @blur="validateField('phone')"
          />
          <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
        </div>
        
        <div>
          <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
          <select
            id="role"
            v-model="formData.role"
            :class="[
              'mt-1 block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500',
              errors.role ? 'border-red-300' : 'border-gray-300'
            ]"
            @blur="validateField('role')"
          >
            <option value="">Select a role</option>
            <option value="nurse">Nurse</option>
            <option value="hospital">Hospital Representative</option>
            <option value="other">Other</option>
          </select>
          <p v-if="errors.role" class="mt-1 text-sm text-red-600">{{ errors.role }}</p>
        </div>
      </div>
      
      <div>
        <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          id="message"
          v-model="formData.message"
          rows="4"
          placeholder="How can we help you?"
          :class="[
            'mt-1 block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500',
            errors.message ? 'border-red-300' : 'border-gray-300'
          ]"
          @blur="validateField('message')"
        ></textarea>
        <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
      </div>
      
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            v-model="formData.terms"
            :class="[
              'h-4 w-4 rounded text-primary-600 focus:ring-primary-500',
              errors.terms ? 'border-red-300' : 'border-gray-300'
            ]"
            @blur="validateField('terms')"
          />
        </div>
        <div class="ml-3 text-sm">
          <label for="terms" class="font-medium text-gray-700">
            I agree to the <a href="/terms" class="text-primary-600 hover:underline">terms and conditions</a>
          </label>
          <p v-if="errors.terms" class="mt-1 text-sm text-red-600">{{ errors.terms }}</p>
        </div>
      </div>
      
      <div v-if="error" class="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
        <p>{{ error }}</p>
      </div>
      
      <button
        type="submit"
        :disabled="loading"
        class="w-full btn bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-md shadow-sm transition-all duration-300 flex items-center justify-center"
      >
        <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ loading ? 'Sending...' : 'Send Message' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// Define interfaces for type safety
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  role: string;
  terms: boolean;
}

interface FormErrors {
  name: string;
  email: string;
  phone: string;
  message: string;
  role: string;
  terms: string;
}

const formData = reactive<ContactFormData>({
  name: '',
  email: '',
  phone: '',
  message: '',
  role: '',
  terms: false
});

const loading = ref(false);
const error = ref('');
const formSuccess = ref(false);
const errors = reactive<FormErrors>({
  name: '',
  email: '',
  phone: '',
  message: '',
  role: '',
  terms: ''
});

const validateField = (field: keyof ContactFormData) => {
  errors[field] = '';
  
  switch(field) {
    case 'name':
      if (!formData.name.trim()) {
        errors.name = 'Name is required';
      }
      break;
    
    case 'email':
      if (!formData.email) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      break;
    
    case 'phone':
      if (!formData.phone) {
        errors.phone = 'Phone number is required';
      } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
        errors.phone = 'Please enter a valid phone number';
      }
      break;
    
    case 'message':
      if (!formData.message.trim()) {
        errors.message = 'Message is required';
      } else if (formData.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters long';
      }
      break;
    
    case 'role':
      if (!formData.role) {
        errors.role = 'Please select a role';
      }
      break;
    
    case 'terms':
      if (!formData.terms) {
        errors.terms = 'You must agree to the terms and conditions';
      }
      break;
  }
};

const validateForm = () => {
  // Validate all fields
  const fields: (keyof ContactFormData)[] = ['name', 'email', 'phone', 'message', 'role', 'terms'];
  fields.forEach(field => validateField(field));
  
  // Check if there are any errors
  return !Object.values(errors).some(error => error);
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = '';
    
    // Validate the form
    if (!validateForm()) {
      error.value = 'Please correct the errors in the form.';
      loading.value = false;
      return;
    }
    
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit form');
    }
    
    // Reset form
    formData.name = '';
    formData.email = '';
    formData.phone = '';
    formData.message = '';
    formData.role = '';
    formData.terms = false;
    
    formSuccess.value = true;
    
    // Scroll to top of form for better visibility of success message
    window.scrollTo({ top: window.pageYOffset - 100, behavior: 'smooth' });
    
  } catch (err) {
    error.value = err instanceof Error 
      ? err.message 
      : 'An error occurred. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Transitions for form elements */
input, select, textarea, button {
  transition: all 0.3s ease;
}

/* Focus styles */
input:focus, select:focus, textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

/* Loading spinner animation */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}

/* Hover effects */
button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Improve form field appearance */
input::placeholder, textarea::placeholder {
  color: #a0aec0;
  opacity: 0.7;
}

/* Checkbox styles */
input[type="checkbox"] {
  cursor: pointer;
}
</style>