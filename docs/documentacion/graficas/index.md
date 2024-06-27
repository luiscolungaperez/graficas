<script setup>
import Basico from "../../.vitepress/components/graficas/basico.vue";
import Editable from "../../.vitepress/components/graficas/editable.vue";
</script>

# SisdaiGraficas

El componente de `<SisdaiGraficas>` consiste en un contenedor en el cual se pueden agregar distintos tipos de gráficas. Este contenedor crea un svg con un id único, y en dicho svg se pintarán los subcomponentes de barras, series de tiempo, cajas, etc.

## Propiedades

- `id`: (_String_) Por default genera un string alfanumérico aleatorio que funciona como identificado único. Se puede ingresar un string específico si se desea.
- `margenes`: (_Object_) Por default es `{ arriba: 20, abajo: 20, derecha: 20, izquierda: 30 }` y se puede ingresar un objeto con las mismas claves, pero valores distintos. Sus valores idican la los márgenes que habrá entre los bordes del svg y los límites de la(s) graficas que se agreguen dentro de dicho svg respectivamente.
- `titulo_eje_y`: (_String_) Nombre del eje vertical
- `titulo_eje_x`: (_String_) Nombre del eje horizontal

## Ejemplos

### Ejemplo básico de componente

En este ejemplo se muestra como se escribe el componente `<SisdaiGraficas>` y se especifican algunas de sus propiedades. Una inspección de elementos deja ver que este componente simplemente crea un svg con aunos grupos en su interior

```html
  <SisdaiGraficas
    :titulo_eje_y="'título del eje y'"
    :titulo_eje_x="'título del eje x'"
    :alto="300"
  >
  </SisdaiGraficas>
```

<Basico />
<!-- <utilsEjemploDoc ruta="graficas/basico.vue"/> -->

### Ejemplo con propiedades dinámicas

En este ejemplo se agrega un rectángulo en el interior del svg que para ilustrar como se puedeagregar reactividad a este para ajustar sus dimensiones según el ancho del contenedor del svg y según la manipulación de los márgenes. El área del rectángulo ilustra el espacio en el cual se dibujarán los gráficos y los márgenes pueden servir como espacio para pintar los ejes.

```html
  <SisdaiGraficas
    class="con-panel-encabezado-vis"
    ref="sisdaiGraficaEditable"
    :margenes="{
      arriba: Number(margen),
      abajo: Number(margen),
      derecha: Number(margen),
      izquierda: Number(margen),
    }"
    :titulo_eje_y="'título del eje y'"
    :titulo_eje_x="'título del eje x'"
  >
    <template #panel-encabezado-vis>
      <div>
        <p class="vis-titulo-visualizacion">Titulo de visualizacion</p>
        <p class="vis-instruccional">
          Modifica el margen para ver su efecto en el componente
        </p>
        <label for="margenes">margen: {{ margen }}</label>

        <input
          id="margenes"
          type="range"
          v-model="margen"
        />
      </div>
    </template>
    <rect
      :x="margen"
      :y="margen"
      :height="alto_rectangulo"
      :width="ancho_rectangulo"
    ></rect>
  </SisdaiGraficas>
```

<ClientOnly>
  <Editable />
</ClientOnly>
