"use client";

import { addCollection } from "@iconify/react";
import colecao from "./solar-icones.json";

/* Registra os ícones do site de dentro do bundle, em vez de deixar o
   @iconify/react buscá-los em api.iconify.design.
 *
 * Sem isto, o navegador de cada visitante fazia DUAS requisições a um host
 * de terceiros só para saber como desenhar os ícones. Custava:
 *
 * - dois ciclos de DNS, TLS e latência antes de qualquer ícone aparecer,
 *   o que num 4G ruim é meio segundo largo;
 * - uma dependência externa que não controlamos: se aquele serviço cair ou
 *   for bloqueado numa rede corporativa, o site fica sem nenhum ícone;
 * - e, o mais caro, DUAS passagens de renderização. Os 98 ícones da página
 *   eram montados vazios, e remontados quando o JSON chegava.
 *
 * O arquivo tem só os 39 ícones que o site realmente usa, e não a coleção
 * solar inteira, que passa de mil. É gerado consultando a mesma API que o
 * navegador consultava: quando um ícone novo for usado, é preciso
 * regravá-lo (ver o comando no commit que criou este arquivo).
 *
 * addCollection roda no escopo do módulo, e não dentro de um efeito: os
 * imports são avaliados antes de qualquer render, então os dados já estão
 * registrados quando o primeiro <Icon> pinta. Num efeito chegariam tarde e
 * a dupla renderização voltaria. */
addCollection(colecao as Parameters<typeof addCollection>[0]);
