<script setup>
import { ref } from 'vue';
const laSerie = ref()
</script>
<template>
  <SisdaiGraficas
    :titulo_eje_y="'título del eje y'"
    :titulo_eje_x="'título del eje x'"
    :margenes="{ arriba: 30, abajo: 70, derecha: 30, izquierda: 40 }"
  >
    <template #globo-informacion>
      <SisdaiGraficasGloboInfo :ancho="200">
        <template>
          <div>
            <p>Cantidad 1: {{ laSerie?.datos_hover?.annual_rate }}</p>
          </div>
        </template>
      </SisdaiGraficasGloboInfo>
    </template>
    <SisdaiSeriesTiempo
      ref="laSerie"
      :datos="[
        { year: '2015', annual_rate: 100 },
        { year: '2016', annual_rate: 80 },
        { year: '2017', annual_rate: 50 },
        { year: '2018', annual_rate: 100 },
        { year: '2019', annual_rate: 80 },
        { year: '2020', annual_rate: 40 },
        { year: '2021', annual_rate: 70 },
      ]"
      :variables="[
        {
          id: 'annual_rate',
          nombre: 'Cantidad 1',
          color: 'blue',
        },
      ]"
      :angulo_etiquetas_eje_x="-45"
      formato_temporal="%Y"
      clave_fecha="year"
    />
  </SisdaiGraficas>
</template>
