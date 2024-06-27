// This file is part of sisdai-graficas.
//
//   sisdai-graficas is free software: you can redistribute it and/or modify
//   it under the terms of the GNU Lesser General Public License as published by the
//   Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.
//
//   sisdai-graficas is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General
//   Public License for more details.
//
//   You should have received a copy of the GNU Lesser General Public License along
//   with sisdai-graficas. If not, see <https://www.gnu.org/licenses/>.

// This file is part of sisdai-graficas.
//
//   sisdai-graficas is free software: you can redistribute it and/or modify
//   it under the terms of the GNU Lesser General Public License as published by the
//   Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.
//
//   sisdai-graficas is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General
//   Public License for more details.
//
//   You should have received a copy of the GNU Lesser General Public License along
//   with sisdai-graficas. If not, see <https://www.gnu.org/licenses/>.


import SisdaiAlluvial from './componentes/sisdai-alluvial/SisdaiAlluvial.vue'
import SisdaiAreasApiladasOrdenadas from './componentes/sisdai-areas-apiladas-ordenadas/SisdaiAreasApiladasOrdenadas.vue'
import SisdaiAreasApiladas from './componentes/sisdai-areas-apiladas/SisdaiAreasApiladas.vue'
import SisdaiBarras from './componentes/sisdai-barras/SisdaiBarras.vue'
import SisdaiCajasBigotes from './componentes/sisdai-cajas-bigotes/SisdaiCajasBigotes.vue'
import SisdaiChecks from './componentes/sisdai-checks/SisdaiChecks.vue'
import SisdaiDona from './componentes/sisdai-dona/SisdaiDona.vue'
import SisdaiGraficasGloboInfo from './componentes/sisdai-graficas-globo-info/SisdaiGraficasGloboInfo.vue'
import SisdaiGraficas from './componentes/sisdai-graficas/SisdaiGraficas.vue'
import SisdaiNomenclatura from './componentes/sisdai-nomenclatura/SisdaiNomenclatura.vue'
import SisdaiSeriesTiempo from './componentes/sisdai-series-tiempo/SisdaiSeriesTiempo.vue'
import SisdaiViolines from './componentes/sisdai-violines/SisdaiViolines.vue'

const components = {
  SisdaiAlluvial,
  SisdaiAreasApiladasOrdenadas,
  SisdaiAreasApiladas,
  SisdaiBarras,
  SisdaiCajasBigotes,
  SisdaiChecks,
  SisdaiDona,
  SisdaiGraficasGloboInfo,
  SisdaiGraficas,
  SisdaiNomenclatura,
  SisdaiSeriesTiempo,
  SisdaiViolines
};

export default {
  install: (app) => {
    for (const component in components) {
      app.component(component, components[component]);
    }
  },
  ...components
};
