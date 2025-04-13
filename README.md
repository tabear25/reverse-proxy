# これは何（What's this?）
ChatGPTのGPTsからNotionのデータベースを参照して回答を行うためのリバースプロキシとOpenAPIスキーマです。

# 前提条件（Prerequisites）
[Cloudflare](https://www.cloudflare.com/ja-jp/)のアカウントを持っている必要があります。
Notionにデータベース型としてデータが格納されている必要があります。

# 使い方（How to Use）

### 1. 準備（Preparation）
1. **Cloudflareでデプロイする**
   - `reverse_proxy.js`をCloudflareでデプロイする
   - デプロイをするだけでその他の設定は不要です。

2. **OpenAPIスキーマを設定する**
   - GPTsの設定画面のActionsで`openAPI_schema.json`を張り付けてください
   - NotionのDBIDはAPI KeyのBearerとして渡してください    
    
### 2. 実行する（Run the Script）
   - 全ての設定が完了したら、適当にGPTsのインストラクションを作成してお終いです。

### 注意点（Notes）
- DBに入っているデータ量が多いとデータが取得できないことが多いので、その場合はプロンプトでクエリが狭まるように設定したり、インストラクションで挙動を抑制したりしてください