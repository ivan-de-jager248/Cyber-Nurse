<template>
  <form @submit.prevent="handleSubmit" class="space-y-6" novalidate>
    <!-- Success message -->
    <div v-if="formSuccess" class="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded" role="alert">
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <p class="font-medium">Partnership request submitted successfully! Our team will contact you shortly.</p>
      </div>
    </div>

    <div v-if="!formSuccess" class="space-y-6">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="hospitalName" class="block text-sm font-medium text-gray-700">Hospital Name</label>
          <input
            type="text"
            id="hospitalName"
            v-model="formData.hospitalName"
            :class="[
              'mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500',
              errors.hospitalName ? 'border-red-300' : 'border-gray-300'
            ]"
            @blur="validateField('hospitalName')"
          />
          <p v-if="errors.hospitalName" class="mt-1 text-sm text-red-600">{{ errors.hospitalName }}</p>
        </div>
        
        <div>
          <label for="contactPerson" class="block text-sm font-medium text-gray-700">Contact Person</label>
          <input
            type="text"
            id="contactPerson"
            v-model="formData.contactPerson"
            :class="[
              'mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500',
              errors.contactPerson ? 'border-red-300' : 'border-gray-300'
            ]"
            @blur="validateField('contactPerson')"
          />
          <p v-if="errors.contactPerson" class="mt-1 text-sm text-red-600">{{ errors.contactPerson }}</p>
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
      </div>
      
      <div>
        <label for="beds" class="block text-sm font-medium text-gray-700">Number of Beds</label>
        <input
          type="number"
          id="beds"
          v-model="formData.beds"
          min="0"
          :class="[
            'mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500',
            errors.beds ? 'border-red-300' : 'border-gray-300'
          ]"
          @blur="validateField('beds')"
        />
        <p v-if="errors.beds" class="mt-1 text-sm text-red-600">{{ errors.beds }}</p>
      </div>
      
      <div>
        <label for="specialties" class="block text-sm font-medium text-gray-700">Specialties Needed</label>
        <p class="text-xs text-gray-500 mb-1">Select all that apply</p>
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
          <option value="other">Other</option>
        </select>
        <p v-if="errors.specialties" class="mt-1 text-sm text-red-600">{{ errors.specialties }}</p>
      </div>
      
      <div>
        <label for="challenges" class="block text-sm font-medium text-gray-700">Current Staffing Challenges</label>
        <textarea
          id="challenges"
          v-model="formData.challenges"
          rows="4"
          :class="[
            'mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500',
            errors.challenges ? 'border-red-300' : 'border-gray-300'
          ]"
          @blur="validateField('challenges')"
        ></textarea>
        <p v-if="errors.challenges" class="mt-1 text-sm text-red-600">{{ errors.challenges }}</p>
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
        class="w-full btn bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-md shadow-sm transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
      >
        <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ loading ? 'Submitting...' : 'Submit Partnership Request' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

interface HospitalFormData {
  hospitalName: string;
  contactPerson: string;
  email: string;
  phone: string;
  beds: string;
  specialties: string[]; 
  challenges: string;
  terms: boolean;
}

interface FormErrors {
  hospitalName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  beds?: string;
  specialties?: string;
  challenges?: string;
  terms?: string;
}

const formData = reactive<HospitalFormData>({
  hospitalName: '',
  contactPerson: '',
  email: '',
  phone: '',
  beds: '',
  specialties: [],
  challenges: '',
  terms: false
});

const loading = ref(false);
const formError = ref('');
const formSuccess = ref(false);
const errors = reactive<FormErrors>({});

// Validate individual fields
const validateField = (field: keyof HospitalFormData) => {
  errors[field] = '';
  
  switch(field) {
    case 'hospitalName':
      if (!formData.hospitalName.trim()) errors.hospitalName = 'Hospital name is required';
      break;
    case 'contactPerson':
      if (!formData.contactPerson.trim()) errors.contactPerson = 'Contact person is required';
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
    case 'beds':
      if (!formData.beds) {
        errors.beds = 'Number of beds is required';
      } else if (Number(formData.beds) < 0) {
        errors.beds = 'Number of beds must be a positive number';
      }
      break;
    case 'specialties':
      if (formData.specialties.length === 0) errors.specialties = 'Please select at least one specialty';
      break;
    case 'challenges':
      if (!formData.challenges.trim()) errors.challenges = 'Please describe your current staffing challenges';
      break;
    case 'terms':
      if (!formData.terms) errors.terms = 'You must agree to the terms and conditions';
      break;
  }
};

// Validate all form fields
const validateForm = () => {
  const fields: (keyof HospitalFormData)[] = ['hospitalName', 'contactPerson', 'email', 'phone', 'beds', 'specialties', 'challenges', 'terms'];
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
    
    const response = await fetch('/api/hospital-partnership', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit partnership request');
    }
    
    // Show success message and reset form
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
/* Transitions for form elements */
input, select, textarea, button {
  transition: all 0.3s ease;
}

/* Form focus styles */
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

/* Multiple select enhancements */
select[multiple] {
  height: auto;
  min-height: 120px;
  padding: 8px;
}

/* Improved checkbox styling */
input[type="checkbox"] {
  cursor: pointer;
}

/* Button hover effect */
button:hover:not(:disabled) {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>