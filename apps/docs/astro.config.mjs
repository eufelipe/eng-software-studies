import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

const isProduction = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  output: "static",
  base: isProduction ? "/eng-software-studies" : undefined,
  site: isProduction
    ? "https://eufelipe.github.io/eng-software-studies"
    : undefined,
  integrations: [
    starlight({
      title: "Guia de Estudos de Princípios e Padrões de Software",
      social: {
        github: "https://github.com/eufelipe/eng-software-studies",
      },
      sidebar: [
        {
          label: "Introdução",
          items: [
            { label: "Comece aqui", slug: "introduction/why-design-patterns" },
          ],
        },
        {
          label: "Princípios SOLID",
          items: [
            { label: "Por que SOLID?", slug: "solid/why-solid" },
            {
              label: "SRP - Princípio da Responsabilidade Única",
              slug: "solid/srp",
            },
            { label: "OCP - Princípio Aberto/Fechado", slug: "solid/ocp" },
            {
              label: "LSP - Princípio da Substituição de Liskov",
              slug: "solid/lsp",
            },
            {
              label: "ISP - Princípio da Segregação de Interfaces",
              slug: "solid/isp",
            },
            {
              label: "DIP - Princípio da Inversão de Dependência",
              slug: "solid/dip",
            },
          ],
        },
        {
          label: "Guia de Estudos de Design Patterns",
          items: [
            {
              label: "Por que Design Patterns?",
              slug: "design-patterns/why-design-patterns",
            },
            {
              label: "Padrões Criacionais",
              slug: "design-patterns/creational",
            },
            {
              label: "Padrões Estruturais",
              slug: "design-patterns/structural",
            },
            {
              label: "Padrões Comportamentais",
              slug: "design-patterns/behavioral",
            },
          ],
        },
        {
          label: "Arquitetura de Software",
          items: [
            {
              label: "Por que Arquitetura de Software?",
              slug: "architecture/why-architecture",
            },
            { label: "Arquitetura em Camadas", slug: "architecture/layered" },
            { label: "Arquitetura Hexagonal", slug: "architecture/hexagonal" },
            {
              label: "Arquitetura Orientada a Eventos",
              slug: "architecture/event-driven",
            },
            { label: "Microservices", slug: "architecture/microservices" },
          ],
        },
      ],
    }),
  ],
});
