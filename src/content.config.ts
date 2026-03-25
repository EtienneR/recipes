import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const base = new URL("./content/recipes", import.meta.url).pathname;

const recipes = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base
  }),
  schema: z.object({
    title: z.string(),
    type: z.string(),
    slug: z.string().optional(),
    ingredients: z.array(
      z.object({
        step: z.string().optional(),
        list: z.string().array(),
      }),
    ),
    directions: z.array(
      z.object({
        step: z.string().optional(),
        list: z.string().array(),
      }),
    ),
  }),
});

export const ingredientSchema = z.object({
  step: z.string().optional(),
  list: z.array(z.string()),
});

export const directionsSchema = z.object({
  step: z.string().optional(),
  list: z.array(z.string()),
});

export const collections = { recipes };
