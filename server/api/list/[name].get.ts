export default defineEventHandler(async (event) => {
    const dataStorage = useStorage('data');
    const name = getRouterParam(event, 'name');

    if (!name) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing name parameter',
      })
    }
  
    return {
      items: await dataStorage.getItem(name),
    }
  })