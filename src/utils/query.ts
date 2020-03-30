const search = JSON.parse(
  '{"' +
    decodeURI(window.location.search.substring(1))
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
);

const server: string = decodeURIComponent(search.server)!;
const apiToken: string = decodeURIComponent(search.apiToken)!;
const documentSetId: string = decodeURIComponent(search.documentSetId)!;

const query: { server: string; apiToken: string; documentSetId: string } = {
  server,
  apiToken,
  documentSetId
};

export default query;
