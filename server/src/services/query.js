const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;

function getPagination(query) {
  if (!query) {
    query = {};
  }

  const page = query.page
    ? Math.abs(Number(query.page)) || DEFAULT_PAGE_NUMBER
    : DEFAULT_PAGE_NUMBER;
  const limit = query.limit
    ? Math.abs(Number(query.limit)) || DEFAULT_PAGE_LIMIT
    : DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;

  return { skip, limit, page };
}

module.exports = {
  getPagination,
};
