
// export default async function FncBuscaTickers(query: string): Promise<string[]> {
//   if (query.trim().length < 2) return [];

//   const url = `http://127.0.0.1:8000/api/search/${encodeURIComponent(query)}`;

//   const resp = await fetch(url);
//   if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

//   const data: any[] = await resp.json();
//   return data.map((item) => item['1. symbol'] as string);
// }
// retorna só os campos que interessam
// (symbol, name, type) em vez de mostrar Alert


export default async function testarBusca(
  search_term: string
): Promise<Array<{ symbol: string; name: string; type: string }>> {
  const url = `http://127.0.0.1:8000/api/search/${encodeURIComponent(
    search_term
  )}`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const rawData: any[] = await resp.json();

    // cada item da API tem chaves “1. symbol”, “2. name”, “3. type” …
    const lista = rawData.map((item) => ({
      symbol: item['1. symbol'],
      name: item['2. name'],
      type: item['3. type'],
    }));

    return lista; // quem chamar decide o que fazer (setState, console.log etc.)
  } catch (err: any) {
    throw new Error(err?.message ?? String(err));
  }
}
