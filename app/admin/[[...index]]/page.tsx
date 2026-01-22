"use client";
import { NextStudio } from "next-sanity/studio";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { product } from "@/sanity/schemaTypes/product"; // Path check kar lein

const config = defineConfig({
  projectId: "ll9lalgh", // Aapki real ID
  dataset: "production",
  basePath: "/admin",
  plugins: [structureTool()],
  schema: {
    types: [product],
  },
});

export default function AdminPage() {
  return <NextStudio config={config} />;
}