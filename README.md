```
{
  "openapi": "3.1.0",
  "info": {
    "title": "Notion API",
    "version": "v1.0.0"
  },
  "servers": [
    {
      "url": "https://tabear95.katakuma4625.workers.dev/https://api.notion.com"
    }
  ],
  "paths": {
    "/v1/blocks/{block_id}/children": {
      "get": {
        "description": "Retrieve children of a block",
        "operationId": "getBlockChildren",
        "tags": [
          "Blocks"
        ],
        "parameters": [
          {
            "name": "block_id",
            "in": "path",
            "required": true,
            "description": "ID of the block or page to get the child process",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "start_cursor",
            "in": "query",
            "description": "A cursor to paginate through the block's children",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "description": "The number of items returned per page",
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "list"
                      ]
                    },
                    "results": {
                      "type": "array",
                      "items": {
                        "type": "object"
                      }
                    },
                    "next_cursor": {
                      "type": "string"
                    },
                    "has_more": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not Found"
          },
          "429": {
            "description": "Too Many Requests"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/v1/search": {
      "post": {
        "description": "Search across all pages and databases",
        "operationId": "search",
        "tags": [
          "Search"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "query": {
                    "type": "string",
                    "description": "Text to search for"
                  },
                  "sort": {
                    "type": "object",
                    "properties": {
                      "direction": {
                        "type": "string",
                        "enum": [
                          "ascending",
                          "descending"
                        ]
                      },
                      "timestamp": {
                        "type": "string"
                      }
                    }
                  },
                  "filter": {
                    "type": "object",
                    "properties": {
                      "property": {
                        "type": "string"
                      },
                      "value": {
                        "type": "object"
                      }
                    }
                  },
                  "start_cursor": {
                    "type": "string"
                  },
                  "page_size": {
                    "type": "integer"
                  }
                },
                "required": [
                  "query"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "results": {
                      "type": "array",
                      "items": {
                        "type": "object"
                      }
                    },
                    "next_cursor": {
                      "type": "string"
                    },
                    "has_more": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/v1/databases/{database_id}/query": {
      "post": {
        "description": "Query a database",
        "operationId": "queryDatabase",
        "tags": [
          "Databases"
        ],
        "parameters": [
          {
            "name": "database_id",
            "in": "path",
            "required": true,
            "description": "ID of the database to query",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "filter": {
                    "type": "object",
                    "description": "Filter conditions for the query"
                  },
                  "sorts": {
                    "type": "array",
                    "items": {
                      "type": "object"
                    }
                  },
                  "start_cursor": {
                    "type": "string"
                  },
                  "page_size": {
                    "type": "integer"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "list"
                      ]
                    },
                    "results": {
                      "type": "array",
                      "items": {
                        "type": "object"
                      }
                    },
                    "next_cursor": {
                      "type": "string"
                    },
                    "has_more": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not Found"
          },
          "429": {
            "description": "Too Many Requests"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {},
    "securitySchemes": {
      "apiKey": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization"
      }
    }
  }
}

```
