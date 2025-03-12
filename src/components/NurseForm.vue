<template>
  <form @submit.prevent="handleSubmit" class="space-y-6" novalidate>
    <!-- Success message -->
    <div v-if="formSuccess" class="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded" role="alert">
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <p class="font-medium">Application submitted successfully! We'll be in touch soon.</p>
      </div>
    </div>

    <div v-if="!formSuccess" class="space-y-6">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            :class="[
              'mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500',
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
              'mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500',
              errors.email ? 'border-red-300' : 'border-gray-300'
            ]"
            @blur="validateField('email')"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
        </div>
        
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            v-model="formData.phone"
            :class="[
              'mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500',
              errors.phone ? 'border-red-300' : 'border-gray-300'
            ]"
            @blur="validateField('phone')"
          />
          <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
        </div>
        
        <div>
          <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            v-model="formData.location"
            :class="[
              'mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500',
              errors.location ? 'border-red-300' : 'border-gray-300'
            ]"
            @blur="validateField('location')"
          />
          <p v-if="errors.location" class="mt-1 text-sm text-red-600">{{ errors.location }}</p>
        </div>
      </div>
      
      <div>
        <label for="specialties" class="block text-sm font-medium text-gray-700">Specialties</label>
        <p class="text-xs text-gray-500 mb-1">Select one or more specialties</p>
        <select
          id="specialties"
          v-model="formData.specialties"
          multiple
          :class="[
            'mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500',
            errors.specialties ? 'border-red-300' : 'border-gray-300'
          ]"
          @blur="validateField('specialties')"
        >
          <option value="icu">ICU</option>
          <option value="er">Emergency Room</option>
          <option value="pediatrics">Pediatrics</option>
          <option value="surgery">Surgery</option>
          <option value="oncology">Oncology</option>
          <option value="geriatrics">Geriatrics</option>
          <option value="psychiatric">Psychiatric</option>
          <option value="labor">Labor & Delivery</option>
        </select>
        <p v-if="errors.specialties" class="mt-1 text-sm text-red-600">{{ errors.specialties }}</p>
      </div>
      
      <div>
        <label for="experience" class="block text-sm font-medium text-gray-700">Years of Experience</label>
        <input
          type="number"
          id="experience"
          v-model="formData.experience"
          min="0"
          :class="[
            'mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500',
            errors.experience ? 'border-red-300' : 'border-gray-300'
          ]"
          @blur="validateField('experience')"
        />
        <p v-if="errors.experience" class="mt-1 text-sm text-red-600">{{ errors.experience }}</p>
      </div>
      
      <div>
        <label for="license" class="block text-sm font-medium text-gray-700">License Number</label>
        <input
          type="text"
          id="license"
          v-model="formData.license"
          :class="[
            'mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500',
            errors.license ? 'border-red-300' : 'border-gray-300'
          ]"
          @blur="validateField('license')"
        />
        <p v-if="errors.license" class="mt-1 text-sm text-red-600">{{ errors.license }}</p>
      </div>
      
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            v-model="formData.terms"
            :class="[
              'h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500',
              errors.terms ? 'border-red-300' : ''
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

      <div v-if="formError" class="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
        <p>{{ formError }}</p>
      </div>
      
      <button
        type="submit"
        :disabled="loading"
        class="w-full btn relative overflow-hidden transition-all duration-300 transform hover:scale-105"
        aria-live="polite"
      >
        <span v-if="!loading">Submit Application</span>
        <span v-else class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Submitting...
        </span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// Define interfaces for type safety
interface NurseFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  specialties: string[];
  experience: string;
  license: string;
  terms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  specialties?: string;
  experience?: string;
  license?: string;
  terms?: string;
}

const formData = reactive<NurseFormData>({
  name: '',
  email: '',
  phone: '',
  location: '',
  specialties: [],
  experience: '',
  license: '',
  terms: false
});

const loading = ref(false);
const formError = ref('');
const formSuccess = ref(false);
const errors = reactive<FormErrors>({});

// Validate individual fields
const validateField = (field: keyof NurseFormData) => {
  errors[field] = '';
  
  switch(field) {
    case 'name':
      if (!formData.name.trim()) errors.name = 'Name is required';
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
    case 'location':
      if (!formData.location.trim()) errors.location = 'Location is required';
      break;
    case 'specialties':
      if (formData.specialties.length === 0) errors.specialties = 'Please select at least one specialty';
      break;
    case 'experience':
      if (!formData.experience) {
        errors.experience = 'Years of experience is required';
      } else if (Number(formData.experience) < 0) {
        errors.experience = 'Years of experience must be a positive number';
      }
      break;
    case 'license':
      if (!formData.license.trim()) errors.license = 'License number is required';
      break;
    case 'terms':
      if (!formData.terms) errors.terms = 'You must agree to the terms and conditions';
      break;
  }
};

// Validate all form fields
const validateForm = () => {
  const fields: (keyof NurseFormData)[] = ['name', 'email', 'phone', 'location', 'specialties', 'experience', 'license', 'terms'];
  fields.forEach(validateField);
  
  // Check if we have any errors
  return !Object.values(errors).some(error => error);
};

const handleSubmit = async () => {
  formError.value = '';
  
  // Validate the form before submission
  if (!validateForm()) {
    formError.value = 'Please correct the errors in the form.';
    return;
  }
  
  try {
    loading.value = true;
    
    const response = await fetch('/api/nurses/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit application');
    }
    
    // Reset form
    formSuccess.value = true;
    
    // Scroll to top of form for better visibility of success message
    window.scrollTo({ top: window.pageYOffset - 100, behavior: 'smooth' });
    
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'An error occurred. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Transition effects for form elements */
input, select, textarea, button {
  transition: all 0.3s ease;
}

/* Custom focus styles */
input:focus, select:focus, textarea:focus {
  box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.3);
}

/* Checkbox custom styling */
input[type="checkbox"] {
  cursor: pointer;
}

/* Button hover effect */
.btn:hover {
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

/* Spinner animation */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}

/* Multiple select styling improvements */
select[multiple] {
  height: auto;
  min-height: 120px;
  padding: 8px;
}
</style>