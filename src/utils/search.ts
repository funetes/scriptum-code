import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

export const typesenseAdapter = new TypesenseInstantsearchAdapter({
  server: {
    apiKey: import.meta.env.VITE_TYPESENSE_SEARCH_ONLY_KEY,
    nodes: [
      {
        host: import.meta.env.VITE_TYPESENSE_HOST,
        port: 443,
        protocol: "https",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "title,full_text",
    query_by_weights: "2,1",
  },
});
