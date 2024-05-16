import { z } from "zod";

export const ListItemSchema = z.object({
  id: z.number(),
  lat: z.number(),
  lon: z.number(),
  data: z.string(),
});

export type ListItemSchemaType = z.output<typeof ListItemSchema>;

export const ListDataSchema = z.object({
  items: z.array(ListItemSchema),
});

export interface ListData {
  id: number;
  lat: number;
  lon: number;
  data: string;
}
