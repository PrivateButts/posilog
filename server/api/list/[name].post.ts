import { ListDataSchema } from "~/types/list";

export default defineEventHandler(async (event) => {
  const dataStorage = useStorage("data");
  const name = getRouterParam(event, "name");
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing name parameter",
    });
  }

  const items = await readValidatedBody(event, (body) =>
    ListDataSchema.safeParse(body)
  );
  // const items = await readBody(event);

  await dataStorage.setItem(name, items);

  return { success: true };
});
