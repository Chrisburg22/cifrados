<template>
  <form class="space-y-6" @submit.prevent="procesar" aria-labelledby="form-title">
    <h2 id="form-title" class="sr-only">Formulario de Cifrado</h2>

    <!-- Tabs para seleccionar método -->
    <div>
      <label class="block text-sm font-semibold text-gray-300 mb-4">Método de Cifrado</label>
      <div class="flex flex-wrap gap-3 justify-center" role="tablist" aria-label="Selecciona un método de cifrado">
        <button
          v-for="method in methods"
          :key="method.value"
          @click="metodo = method.value"
          :class="[
            'px-5 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md border-2 btn-gradient'
          ]"
          :aria-selected="metodo === method.value"
          role="tab"
          :aria-controls="`panel-${method.value}`"
        >
          {{ method.label }}
        </button>
      </div>
      <p class="text-xs text-gray-400 mt-3 text-center">Selecciona el tipo de operación criptográfica.</p>
    </div>

    <!-- Resto del formulario permanece igual -->
    <div>
      <label for="mensaje" class="block text-sm font-semibold text-gray-300 mb-2">
        Mensaje <span class="text-xs text-gray-400">(1-30 caracteres)</span>
      </label>
      <input
        id="mensaje"
        v-model="mensaje"
        type="text"
        maxlength="30"
        placeholder="Ingresa el mensaje aquí"
        class="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-color3 focus:border-color3 transition"
        aria-describedby="mensaje-count"
      >
      <p id="mensaje-count" class="text-xs text-gray-400 mt-1 text-center">Contador: <span class="font-semibold text-gray-300">{{ mensaje.length }}</span>/30</p>
    </div>

    <div>
      <label for="clave" class="block text-sm font-semibold text-gray-300 mb-2">
        Clave
      </label>
      <input
        id="clave"
        v-model="clave"
        type="text"
        placeholder="Ingresa la clave (número para César, texto para Vigenère)"
        class="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-color3 focus:border-color3 transition"
        aria-describedby="clave-desc"
      >
      <p id="clave-desc" class="text-xs text-gray-400 mt-1 text-center">Para César: número de desplazamiento. Para Vigenère: palabra clave.</p>
    </div>

    <button
      type="submit"
      class="w-full bg-gradient-to-r from-color2 to-color3 hover:from-color3 hover:to-color2 text-white font-bold py-4 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
      :disabled="loading"
    >
      <span v-if="loading">Procesando...</span>
      <span v-else>🚀 Procesar</span>
    </button>

    <div v-if="error" role="alert" class="mt-4 p-4 bg-red-900 border-l-4 border-red-500 text-red-200 rounded text-center">
      {{ error }}
    </div>
  </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['procesar', 'loading']);

const methods = [
  { value: 'cesar-cifrar', label: '🔐 Cifrado César' },
  { value: 'cesar-descifrar', label: '🔓 Descifrado César' },
  { value: 'vigenere-cifrar', label: '🔐 Cifrado Vigenère' },
  { value: 'vigenere-descifrar', label: '🔓 Descifrado Vigenère' }
];

const metodo = ref('cesar-cifrar');
const mensaje = ref('');
const clave = ref('');
const error = ref('');
const loading = ref(false);

const procesar = () => {
  if (loading.value) return;  // Evita múltiples procesamientos
  loading.value = true;
  emit('loading', true);
  emit('procesar', { metodo: metodo.value, mensaje: mensaje.value, clave: clave.value });
  setTimeout(() => {
    loading.value = false;
    emit('loading', false);
  }, 1000);
};

defineExpose({ metodo, mensaje, clave, error });
</script>

<style scoped>
.btn-gradient {
  background: #c8e98e;
  transition: all 0.3s ease;
}

.btn-gradient:hover:not(:disabled) {
  background: #259073;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(37, 144, 115, 0.4);
}


.btn-gradient:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>