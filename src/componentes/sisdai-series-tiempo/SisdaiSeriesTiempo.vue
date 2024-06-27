<script setup>
import { bisector } from 'd3';
import { extent, max } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { timeParse } from 'd3-time-format';
import { format } from 'date-fns';
import { onMounted, onUnmounted, ref, shallowRef, toRaw, toRefs, watch, watchEffect } from 'vue';
import usarRegistroGraficas from '../../composables/usarRegistroGraficas';
import {
  buscarIdContenedorHtmlSisdai,
  creaEjeHorizontal,
  creaEjeVertical,
} from '../../utils';

const props = defineProps({
  datos: {
    type: Array,
    require: true,
  },
  variables: {
    type: Array,
    require: true,
    validator(value) {
      // debe tener: id, nombre, color
      const validado = value.some(
        ({ id, nombre, color }) =>
          id !== undefined || nombre !== undefined || color !== undefined
      )
      if (!validado) {
        console.error('El objeto no cumple con las especificaciones')
      }
      return validado
    },
  },
  clave_fecha: {
    type: String,
    default: 'fecha',
  },
  alineacion_eje_y: {
    type: String,
    default: 'izquierda',
    validator(value) {
      const validado = value === 'izquierda' || value === 'derecha'
      if (!validado) {
        console.error(
          "la propiedad 'alineacion_eje_y' sólo admite los valores 'izquierda' o 'derecha'"
        )
      }
      return validado
    },
  },
  angulo_etiquetas_eje_x: {
    type: Number,
    default: 0,
    validator(value) {
      // debe estar entre -90 y 90
      const validado = -90 <= value && value <= 90
      if (!validado) {
        console.error('El número debe estar entre -90 y 90')
      }
      return validado
    },
  },
  angulo_etiquetas_eje_y: {
    type: Number,
    default: 0,
    validator(value) {
      // debe estar entre -90 y 90
      const validado = -90 <= value && value <= 90
      if (!validado) {
        console.error('El número debe estar entre -90 y 90')
      }
      return validado
    },
  },
  formato_temporal: {
    default: '%d-%m-%Y',
    type: String,
  },
})

const { datos, clave_fecha, variables } = toRefs(props)
const idGrafica = ref()
const conversionTemporal = timeParse(props.formato_temporal)
const datos_hover = ref({})
const sisdaiSeriesTiempo = shallowRef()
const margenesSvg = ref({})
const escalaTemporal = ref()
const escalaLineal = ref()
const grupoContenedor = ref()
const grupoSeries = ref()
const circulo_marcador = ref()

const grafica = () => usarRegistroGraficas().grafica(idGrafica.value)


function calcularEscalas(grupoVis, datos) {
  if (!grupoVis || grupoVis.ancho === 0) return;

  const datosConFechas = datos.map(d => ({ ...d, [clave_fecha.value]: conversionTemporal(d[clave_fecha.value]) }))

  escalaTemporal.value = scaleTime()
    .domain(extent(datosConFechas, d => d[clave_fecha.value]))
    .range([0, grupoVis.ancho])

  escalaLineal.value = scaleLinear()
    .domain([0, max(datosConFechas, d => max(variables.value.map(dd => d[dd.id])))])
    .range([grupoVis.alto, 0])

  creaEjeHorizontal(
    idGrafica.value,
    escalaTemporal.value,
    props.angulo_etiquetas_eje_x
  )

  creaEjeVertical(
    idGrafica.value,
    escalaLineal.value,
    props.angulo_etiquetas_eje_y,
    props.alineacion_eje_y,
    grupoVis.ancho
  )
}

function creaSeries(datos) {
  const datosConFechas = datos.map(d => ({ ...d, [clave_fecha.value]: conversionTemporal(d[clave_fecha.value]) }))

  grupoSeries.value = grupoContenedor.value.selectAll('g.serie-temporal')
  grupoSeries.value.data(variables.value).join(
    enter => {
      let grupo = enter
        .append('g')
        .attr('class', 'serie-temporal')
        .style('fill', 'none')
        .style('stroke', d => d.color)
        .style('stroke-width', '1px')

      grupo
        .selectAll('path.linea')
        .data(d => [{ ...d, datos: datosConFechas }])
        .enter()
        .append('path')
        .attr('class', 'linea')
        .attr('d', dd =>
          line()
            .x(d => escalaTemporal.value(d[clave_fecha.value]))
            .y(d => escalaLineal.value(d[dd.id]))(dd.datos)
        )

      grupo
        .selectAll('circle.puntos')
        .data(d =>
          datosConFechas.map(datum => ({
            [clave_fecha.value]: datum[clave_fecha.value],
            valor: datum[d.id],
            ...d,
          }))
        )
        .enter()
        .append('circle')
        .attr('class', 'puntos')
        .attr('r', 0)
        .attr('cx', d => escalaTemporal.value(d[clave_fecha.value]))
        .attr('cy', grafica()?.grupoVis.alto)
        .style('stroke', '#fff')
        .style('fill', d => d.color)

      return grupo
    },
    update => {
      let grupo = update.call(update1 =>
        update1
          .transition()
          .duration(500)
          .style('fill', 'none')
          .style('stroke', d => d.color)
          .style('stroke-width', '1px')
      )
      grupo
        .selectAll('path.linea')
        .data(d => [{ ...d, datos: datosConFechas }])
        .transition()
        .duration(500)
        .attr('d', dd =>
          line()
            .x(d => escalaTemporal.value(d[clave_fecha.value]))
            .y(d => escalaLineal.value(d[dd.id]))(dd.datos)
        )

      grupo
        .selectAll('circle.puntos')
        .data(d =>
          datosConFechas.map(datum => ({
            [clave_fecha.value]: datum[clave_fecha.value],
            valor: datum[d.id],
            ...d,
          }))
        )
        .transition()
        .duration(500)
        .attr('r', variables.value.length > 1 ? 0 : 4)
        .attr('cx', d => escalaTemporal.value(d[clave_fecha.value]))
        .attr('cy', d => escalaLineal.value(d.valor))
        .style('stroke', '#fff')
        .style('fill', d => d.color)

      return grupo
    },
    exit => {
      exit.remove()
    }
  )
}

function actualizarGrafico() {
  const graficaVis = grafica()?.grupoVis
  const newDatos = toRaw(datos.value)

  if (graficaVis) {
    calcularEscalas(graficaVis, toRaw(newDatos))
    creaSeries(newDatos)
  }
}

onMounted(() => {
  idGrafica.value = buscarIdContenedorHtmlSisdai('grafica', sisdaiSeriesTiempo.value)

  grupoContenedor.value = select('#' + idGrafica.value + ' svg g.contenedor-series')
  circulo_marcador.value = grupoContenedor.value
    .append('circle')
    .style('fill-opacity', 0)
    .attr('r', 5)
  margenesSvg.value = grafica()?.margenes

  actualizarGrafico()
  window.addEventListener('resize', actualizarGrafico)
})

watchEffect(() => {
  actualizarGrafico()
});

watch(
  () => grafica()?.margenes,
  nv => margenesSvg.value = nv
)

watch(
  () => grafica()?.grupoVis,
  nv => calcularEscalas(nv, toRaw(datos.value))
)

const formatDate = (date) => {
  const types = {
    '%Y': 'yyyy',
    '%m': 'MM',
    '%d': 'dd',
  }

  const formatDate = props.formato_temporal.split('-').map((tipo) => types[tipo]).toString().replaceAll(',', '-')
  return  format(date, formatDate)
}

watch(
  () => grafica()?.posicion_cursor,
  nv => {
    const bisecetDate = bisector(d => d[clave_fecha.value]).left
    const x0 = formatDate(escalaTemporal.value.invert(nv.x - margenesSvg.value.izquierda))
    const indice = bisecetDate(datos.value, x0)

    const tooltip_data_seleccionada_x = datos.value[indice]

    const datos_y = variables.value
      .map(d => [d, tooltip_data_seleccionada_x[d.id]])
      .sort((a, b) => ascending(a[1], b[1]))

    const bisectCantidad = bisector(d => d).center
    const y0 = escalaLineal.value.invert(nv.y - margenesSvg.value.arriba)

    let indiceY = bisectCantidad(
      datos_y.map(d => d[1]),
      y0
    )

    datos_hover.value = {
      ...datos_y[indiceY][0],
      ...tooltip_data_seleccionada_x,
    }

    circulo_marcador.value
      .style('fill-opacity', 1)
      .attr('cx', escalaTemporal.value(datos_hover.value[clave_fecha.value]))
      .attr(
        'cy',
        escalaLineal.value(+datos_hover.value[datos_hover.value['id']])
      )
      .style('fill', datos_hover.value.color)

    grupoSeries.value
      .selectAll('path')
      .style('stroke-width', '2px')
      .style('stroke-opacity', '.3')
    grupoSeries.value
      .filter(d => d.id === datos_hover.value.id)
      .selectAll('path')
      .style('stroke-width', '3px')
      .style('stroke-opacity', '1')
  },
  { deep: true }
)

watch(
  () => grafica()?.globo_visible,
  nv => {
    if (!nv) {
      circulo_marcador.value.style('fill-opacity', 0)
      grupoSeries.value
        .selectAll('path')
        .style('stroke-width', '2px')
        .style('stroke-opacity', '.8')
    }
  }
)

onUnmounted(() => {
  window.removeEventListener('resize', actualizarGrafico)
})

defineExpose({
  escalaTemporal,
  escalaLineal,
  conversionTemporal,
  datos_hover: datos_hover.value
})

</script>

<template>
  <g
    ref="sisdaiSeriesTiempo"
    :transform="`translate(${margenesSvg?.izquierda || 0},${
      margenesSvg?.arriba || 0
    })`"
    class="contenedor-series"
  >
  </g>
</template>
