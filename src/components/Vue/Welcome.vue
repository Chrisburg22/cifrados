<template>
  <div class="bg-gray-900 text-white min-h-screen py-8 px-4">
    <div class="container mx-auto max-w-7xl animate-fade-in">
      <header class="text-center mb-12">
        <h1 class="text-5xl font-bold mb-4">
          <span class="text-gradient">{{ siteTitle }}</span>
        </h1>
      </header>

      <main class="grid gap-8 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <aside class="flex justify-center">
          <CryptoInfo />
        </aside>
        <section class="lg:col-span-2">
          <div
            class="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700"
          >
            <CryptoForm
              ref="cryptoFormRef"
              @procesar="handleProcesar"
              @loading="setLoading"
            />
            <CryptoResult v-if="resultado && !loading" :resultado="resultado" />
            <div v-if="loading" class="text-center py-8">
              <div
                class="animate-spin rounded-full h-12 w-12 border-b-2 border-color2 mx-auto"
              ></div>
              <p class="mt-4 text-gray-300">Procesando...</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useCrypto } from '../../composables/useCrypto.js';
import CryptoForm from './CryptoForm.vue';
import CryptoResult from './CryptoResult.vue';
import CryptoInfo from './CryptoInfo.vue';

const siteTitle = 'Sistema de Cifrado';

const resultado = ref(null);
const loading = ref(false);
const canProcess = ref(true);  // Flag para controlar procesamiento
const cryptoFormRef = ref(null);
const { procesarMensaje } = useCrypto();

const handleProcesar = ({ metodo, mensaje, clave }) => {
  if (!canProcess.value) return;  // Evita procesamiento si no está permitido
  loading.value = true;
  canProcess.value = false;  // Bloquea hasta que termine
  try {
    resultado.value = procesarMensaje(metodo, mensaje, clave);
  } catch (error) {
    console.error(error.message);
  } finally {
    setTimeout(() => {
      loading.value = false;
      canProcess.value = true;  // Habilita de nuevo después de un tiempo
    }, 500);
  }
};

const setLoading = (value) => {
  loading.value = value;
};

// Watcher para reiniciar resultado cuando cambie el método
watch(() => cryptoFormRef.value?.metodo, (newMetodo, oldMetodo) => {
  if (newMetodo !== oldMetodo) {
    resultado.value = null;  // Reinicia el resultado al cambiar de tab
    canProcess.value = true;  // Asegura que se pueda procesar en la nueva tab
  }
});
</script>

<style scoped>
/* Estilos para tema oscuro */
.container {
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-gradient {
  background: linear-gradient(135deg, #259073, #7fda89);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 25px 50px -12px rgba(4, 17, 34, 0.5);
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
