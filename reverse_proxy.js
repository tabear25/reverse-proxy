export default {
  async fetch(request, env) {
    const NOTION_TOKEN = env.NOTION_TOKEN;
    const NOTION_VER   = "2022-06-28";

    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Notion-Version"
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 200, headers: cors });
    }

    const url     = new URL(request.url);
    let   path    = url.pathname.replace(/\/+/g, "/").replace(/^\/+/, "");
    let   segArr  = path.split("/").filter(Boolean);
    if (segArr[0] === "v1") segArr.shift();

    if (segArr.length === 0) {
      return new Response(JSON.stringify({ ok: true, msg: "Notion proxy alive" }), {
        status: 200,
        headers: { ...cors, "Content-Type": "application/json" }
      });
    }

    if (segArr[0] === "databases" && segArr.length === 2) {
      segArr.push("query");                // /databases/<id> → /databases/<id>/query
    }

    const notionEndpoint = `https://api.notion.com/v1/${segArr.join("/")}${url.search}`;

    const headers = {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": NOTION_VER,
      "Content-Type": request.headers.get("content-type") || "application/json"
    };

    const init = {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body
    };

    const res = await fetch(notionEndpoint, init);

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: { ...Object.fromEntries(res.headers), ...cors }
    });
  }
};
