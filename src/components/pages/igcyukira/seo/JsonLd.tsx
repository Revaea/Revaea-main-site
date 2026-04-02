type JsonLdData = Record<string, unknown>;

function toJsonLd(data: JsonLdData) {
  // Avoid embedding raw '<' inside script tags.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd(props: { data: JsonLdData }) {
  const { data } = props;
  return <script type="application/ld+json">{toJsonLd(data)}</script>;
}
