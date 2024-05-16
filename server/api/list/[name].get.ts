import { ListData } from "~/types/list";

export default defineEventHandler(async (event) => {
  const dataStorage = useStorage("data");
  const name = getRouterParam(event, "name");

  console.log("name", name);

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing name parameter",
    });
  }

  const result = (await dataStorage.getItem(name)) as ListData[] | null;
  console.log("result", result);

  return result;
});
