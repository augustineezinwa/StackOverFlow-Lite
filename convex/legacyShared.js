export const toNumber = value => Number.parseInt(value, 10);

export const buildStatsMap = (items, keyName, valueBuilder) => {
  const map = new Map();
  items.forEach((item) => {
    const key = item[keyName];
    if (!map.has(key)) {
      map.set(key, valueBuilder());
    }
    map.get(key).push(item);
  });
  return map;
};

export const getAll = async (ctx, table) => ctx.db.query(table).collect();

export const findByField = async (ctx, table, indexName, field, value) => ctx.db
  .query(table)
  .withIndex(indexName, q => q.eq(field, value))
  .collect();

export const firstByField = async (ctx, table, indexName, field, value) => ctx.db
  .query(table)
  .withIndex(indexName, q => q.eq(field, value))
  .first();

export const removeDocs = async (ctx, docs) => {
  await Promise.all(docs.map(doc => ctx.db.delete(doc._id)));
};

export const setCounter = async (ctx, key, value) => {
  const found = await firstByField(ctx, 'meta', 'by_key', 'key', key);
  if (found) {
    await ctx.db.patch(found._id, { value });
    return;
  }
  await ctx.db.insert('meta', { key, value });
};

export const nextCounter = async (ctx, key) => {
  const found = await firstByField(ctx, 'meta', 'by_key', 'key', key);
  if (!found) {
    await ctx.db.insert('meta', { key, value: 1 });
    return 1;
  }
  const value = found.value + 1;
  await ctx.db.patch(found._id, { value });
  return value;
};
