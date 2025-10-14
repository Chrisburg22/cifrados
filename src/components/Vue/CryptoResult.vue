<template>
  <div class="mt-8 animate-fade-in" role="region" aria-labelledby="result-title">
    <h2 id="result-title" class="sr-only">Resultado del Procesamiento</h2>
    <div class="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 shadow-lg">
      <h3 class="text-2xl font-bold text-white mb-6 flex items-center">
        ✨ Resultado
      </h3>
      <div class="grid gap-6 md:grid-cols-1">
        <div class="bg-gray-700 p-4 rounded-lg">
          <p class="text-sm font-semibold text-gray-300 mb-2">🔢 Función Criptográfica:</p>
          <p class="font-mono text-sm bg-gray-900 p-3 rounded border text-white">{{ resultado.funcionCripto }}</p>
        </div>
        <div class="bg-gray-700 p-4 rounded-lg">
          <p class="text-sm font-semibold text-gray-300 mb-2">📝 Mensaje Original:</p>
          <p class="font-mono text-lg bg-gray-900 p-3 rounded border text-white">{{ resultado.mensajeOriginal }}</p>
        </div>
        <div class="bg-gray-700 p-4 rounded-lg">
          <p class="text-sm font-semibold text-gray-300 mb-2">🎯 Mensaje Procesado:</p>
          <p class="font-mono text-lg font-bold bg-gray-900 p-3 rounded border text-color3">{{ resultado.mensajeProcesado }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  resultado: Object
});
</script>