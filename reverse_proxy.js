addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    const url = new URL(request.url);

    // OPTIONS メソッドの処理（CORS対応）
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Authorization, Content-Type, Notion-Version'
        }
      });
    }

    // ルートパスの場合、使い方の説明を表示
    if (url.pathname === '/' || url.pathname === '') {
      return new Response(
        `Usage: ${url.origin}/https://api.notion.com/<endpoint>`,
        { status: 200 }
      );
    }

    // ターゲットURLを、パス部分（先頭のスラッシュを除去）とクエリ文字列から組み立てる
    const targetUrlStr = decodeURIComponent(url.pathname.substring(1)) + url.search;
    let targetUrl;
    try {
      targetUrl = new URL(targetUrlStr);
    } catch (err) {
      return new Response("Invalid target URL", { status: 400 });
    }
    
    // リクエストヘッダーのクローンと Notion-Version の追加
    const headers = new Headers(request.headers);
    if (targetUrl.hostname === 'api.notion.com' && !headers.has('Notion-Version')) {
      headers.set('Notion-Version', '2021-05-13');
    }

    // ターゲットURLに対してリクエストを転送
    const response = await fetch(targetUrl.href, {
      method: request.method,
      headers: headers,
      body: request.body
    });

    // レスポンスに CORS ヘッダーを追加
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS');
    newResponse.headers.set('Access-Control-Allow-Headers', 'Authorization, Content-Type, Notion-Version');

    return newResponse;
  } catch (e) {
    return new Response("Internal Server Error", { status: 500 });
  }
}