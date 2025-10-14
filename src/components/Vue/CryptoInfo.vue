<template>
  <div class="mt-6 bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700 text-center" role="complementary" aria-labelledby="info-title">
    <h3 id="info-title" class="text-3xl font-bold text-white mb-6 flex items-center justify-center">
      ℹ️ Información del Sistema
    </h3>
    <ul class="text-base text-gray-300 space-y-4 list-none max-w-2xl mx-auto">
      <li class="flex items-start">
        Los espacios se eliminan automáticamente para simplificar el procesamiento.
      </li>
      <li class="flex items-start">
        Las vocales acentuadas (á, é, í, ó, ú) se convierten a sus equivalentes sin acento.
      </li>
      <li class="flex items-start">
        Alfabeto usado: A-Z + Ñ (27 letras totales, donde Ñ equivale a la posición 14).
      </li>
      <li class="flex items-start">
        Cifrado César: Realiza un desplazamiento simple de letras con módulo 27.
      </li>
      <li class="flex items-start">
        Cifrado Vigenère: Usa una clave repetida para sumar/restar valores de letras.
      </li>
    </ul>
  </div>
</template>

<script setup>
// Sin lógica adicional
</script>

<style scoped>
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(4, 17, 34, 0.3), 0 10px 10px -5px rgba(37, 144, 115, 0.2);
}
</style>