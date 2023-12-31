const fs= require("fs")
import "dotenv/config";

const env=process.env.NODE_ENV
console.log(env)

const doc={
    "openapi": "3.0.0",
    "info": {
      "title": "motorShop",
      "description": "api de compra e venda de carros",
      "version": "1.0.0"
    },
    "servers":[
      {
        "url":"http://localhost:3001",
        "description":"Development server"
      },
      {
        "url":"https://motorsshop-w0l3.onrender.com",
        "description":"Production server"
      }
    ],
    "paths": {
      "/users/register": {
        "post": {
          "tags":["users"],
          "description": "register user",
          "requestBody":{
            "required":true,
            "content":{
              "application/json":{
                "schema":{
                  "$ref":"#/components/schemas/user" 
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Created",
              "content":{
                "application/json":{
                  "schema":{
                    "$ref":"#/components/schemas/user"
                  }
                }
              }
            },
            "400":{
              "description":"Bad Request",
              "content":{
                "application/json":{
                  "schema":{
                    "type":"object",
                    "properties":{
                      "description":{
                        "type":"string",
                        "example":"user email or cpf already exists"
                      }
                    }             
                  }
                }
              } 
            }
          }
        }
      },
      "/users/login": {
        "post": {
          "description": "user login",
          "tags":["users"],
          "requestBody":{
            "required":true,
            "content":{
              "application/json":{
                "schema":{
                  "type": "object",
                  "properties": {
                    "email": {
                      "type":"string",
                      "format":"email"
                    },
                    "password": {
                      "type": "string",
                      "format":"password"
                    }
                  },
                  "required":[
                    "password",
                    "email"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "OK",
              "content":{
                "application/json":{
                    "schema":{
                      "type":"object",
                      "properties":{
                      "token":{
                        "type":"string"
                      }
                    }
                  }
                }
              }
            },
            "400":{
              "description": "user email or password invalid"
            }
          }
        }
      },
      "/users/update": {
        "patch": {
          "description": "update user",
          "tags":["users"],
          "security":[{"bearerAuth":[]}],
          "requestBody":{
            "content":{
              "application/json":{
                "schema":{
                  "$ref":"#/components/schemas/user"
                }
              }
            }
          
          },
          "responses": {
            "200": {
              "description": "OK",
              "content":{
                "application/json":{
                  "schema":{
                    "$ref":"#/components/schemas/user"
                  }
                }
              }
            },
            "401":{
              "$ref":"#/components/responses/401Unauthorized"
            },
            "404":{
              "$ref":"#/components/responses/404NotFound"
            }
          }
        }
      },
      "/users/delete":{
        "delete": {
          "description": "delete user",
          "tags":["users"],
          "security":[{"bearerAuth":[]}],
          "responses": {
            "204": {
              "description": "No Content"
            },
            "404":{
              "$ref":"#/components/responses/404NotFound"
            }
          }
        }
      },
      "/users/{id}/adverts": {
        "get": {
          "tags":["adverts","users"],
          "description": "get user adverts",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string",
              "format":"uuid"
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content":{
                "application/json":{
                  "schema":{
                    "$ref":"#/components/parameters/paginated",
                    "type":"object",
                    "properties":{
                      "data":{
                        "$ref":"#/components/schemas/userAdverts"
                      }
                    }
                  }
                }
              }
            },
            "404":{
              "$ref":"#/components/responses/404NotFound"
            }
          }
        }
      },
      "/users/loggedUser": {
        "get": {
          "description": "get user logged",
          "tags":["users"],
          "security":[{"bearerAuth":[]}],
          "responses": {
            "200": {
              "description": "OK",
              "content":{
                "application/json":{
                  "schema":{
                    "$ref":"#/components/schemas/user"
                  }
                }
              }
            },
            "401":{
              "$ref":"#/components/responses/401Unauthorized"
            }
          }
        }
      },
      "/users/resetPassword": {
        "post": {
          "description": "reset password",
          "tags":["users"],
          "security":[{"bearerAuth":[]}],
          "requestBody":{
            "content":{
              "application/json":{
                "schema":{
                  "type":"object",
                  "properties":{
                    "email":{
                      "type":"string",
                      "format":"email"
                    }
                  }
                }
              }
            },
            "required":true
          },
          "responses": {
            "200": {
              "description": "OK",
              "content":{
                "application/json":{
                  "schema":{
                    "type":"object",
                    "properties":{
                      "message":{
                        "type":"string",
                        "example":"token send"
                      }
                    }
                  }
                }
  
              }
            },
            "401":{
              "$ref":"#/components/responses/401Unauthorized"
            },
            "404":{
              "$ref":"#/components/responses/404NotFound"
            }
          }
        }
      },
      "/users/resetPassword/{token}": {
        "patch": {
          "description": "reset user password",
          "security":[{"bearerAuth":[]}],
          "tags":["users"],
          "parameters": [
            {
              "name": "token",
              "in": "path",
              "required": true,
              "type": "string"
            }
          ],
          "requestBody":{
            "content":{
              "application/json":{
                "schema": {
                  "type": "object",
                  "properties": {
                    "password": {
                      "type": "string",
                      "format":"password"
                    }
                  }
                }
              }
            },
            "required":true
          },
          "responses": {
            "200": {
              "description": "OK",
              "content":{
                "application/json":{
                  "schema":{
                    "type":"object",
                    "properties":{
                      "message":{
                        "type":"string",
                        "example":"password change with sucess"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/adverts":{
        "post":{
          "tags":["adverts"],
          "description":"create post",
          "security":[{"bearerAuth":[]}],
          "requestBody":{
            "content":{
              "application/json":{
                "schema":{
                  "$ref":"#/components/schemas/advert"
                }
              }
            },
            "required":true
          },
          "responses":{
            "201":{
              "description":"Ok",
              "content":{
                "application/json":{
                  "schema":{
                    "$ref":"#/components/schemas/advert"
                  }
                }
              }
            },
            "401":{
              "$ref":"#/components/responses/401Unauthorized"
            }
          }
        },
        "get":{
          "tags":["adverts"],
          "description":"get adverts",
          "responses":{
            "200":{
              "content":{
                "application/json":{
                  "schema":{
                    "$ref":"#/components/parameters/paginated",
                    "type":"object",
                    "properties":{
                      "adverts":{
                          "$ref":"#/components/schemas/advert"                
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/adverts/{id}": {
        "get": {
          "tags":["adverts"],
          "description": "get advert by id",
          "security":[{"bearerAuth":[]}],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string",
              "format":"uuid"
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content":{
                "application/json":{
                  "schema":{
                    "$ref":"#/components/schemas/advert"
                  }
                }
              }
            },
            "404":{
              "$ref":"#/components/responses/404NotFound"
            }
          }
        },
        "patch": {
          "tags":["adverts"],
          "description": "update advert",
          "security":[{"bearerAuth":[]}],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
            },
            {
              "name":"body",
              "in":"body",
              "schema":{
                "$ref":"#/components/schemas/advert"
              },
              "required":true
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content":{
                "application/json":{
                  "schema":{
                    "$ref":"#/components/schemas/advert"
                  }
                }
              }
            },
            "401":{
              "$ref":"#/components/responses/401Unauthorized"
            },
            "404":{
              "$ref":"#/components/responses/404NotFound"
            }
          }
        },
        "delete": {
          "description": "delete advert",
          "tags":["adverts"],
          "security":[{"bearerAuth":[]}],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string",
              "format":"uuid"
            }
          ],
          "responses": {
            "204": {
              "description": "No Content"
            },
            "401":{
              "$ref":"#/components/responses/401Unauthorized"
            },
            "404":{
              "$ref":"#/components/responses/404NotFound"
            }
          }
        }
      },
      "/comments/{postId}": {
        "post": {
          "description": "create comment to post",
          "tags":["comments"],
          "security":[{"bearerAuth":[]}],
          "parameters": [
            {
              "name": "postId",
              "in": "path",
              "required": true,
              "type": "string"
            }
          ],
          "requestBody":{
            "content":{
              "application/json":{
                "schema":{
                    "$ref":"#/components/schemas/comment"
                }
              }
            },
            "required":true
          },
          "responses": {
            "200": {
              "description": "OK",
              "content":{
                "application/json":{
                  "schema":{
                    "$ref":"#/components/schemas/comment"
                  }
                }
              }
            }
          }
        },
        "get": {
          "description": "get comments to post",
          "tags":["comments"],
          "security":[{"bearerAuth":[]}],
          "parameters": [
            {
              "name": "postId",
              "in": "path",
              "required": true,
              "type": "string"
  
            }
          ],
          "responses": {
            "200":{
              "description": "OK",
              "content":{
                "application/json":{
                  "schema":{
                    "type":"object",
                    "properties":{
                      "post":{
                        "$ref":"#/components/schemas/simpleAdvert"
                      },
                      "postComments":{
                        "type":"array",
                        "items":{
                          "$ref":"#/components/schemas/comment"
                        },
                        "minItems":5
                      }
                    }
                  }
                }
              }
            },
            "401":{
              "$ref":"#/components/responses/401Unauthorized"
            },
            "404":{
              "$ref":"#/components/responses/404NotFound"
            }
          }
        }
      },
      "/comments": {
        "get": {
          "description": "get all comments",
          "tags":["comments"],
          "security":[{"bearerAuth":[]}],
          "responses": {
            "200": {
              "description": "OK",
              "content":{
                "application/json":{
                  "schema":{
                    "type":"array",
                    "items":{
                      "$ref":"#/components/schemas/comment"
                    },
                    "minItems": 5
                  }
                }
              }
            },
            "401":{
              "$ref":"#/components/responses/401Unauthorized"
            }
          }
        }
      },
      "/address/{id}": {
        "patch": {
          "description": "update address",
          "security":[{"bearerAuth":[]}],
          "tags":["address"],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
            }
          ],
          "requestBody":{
            "content":{
              "application/json":{
                "schema":{
                  "$ref":"#/components/schemas/address"
                }
              }
            },
            "required":true
          },
          "responses": {
            "200": {
              "description": "OK",
              "content":{
                "application/json":{
                  "schema":{
                    "$ref":"#/components/responseSchemas/address",
                    "type":"object",
                    "properties":{
                      "user":{
                        "$ref":"#/components/schemas/userWithoutAddress"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "components":{
      "parameters":{
        "id":{
          "name": "id",
          "in": "path",
          "type": "string",
          "format":"uuid",
          "required":true
        },
        "paginated":{
          "type":"object",
          "properties":{
            "prev":{
              "type":"string"
            },
            "page":{
              "type":"string"
            },
            "next":{
              "type":"string"
            },
            "maxPage":{ 
              "type":"number"
            },
            "count":{
              "type":"number"
            }
          },
          "required":[
            "prev",
            "page",
            "next",
            "maxPage",
            "count"
          ]
        }
      },
      "responses":{
        "401Unauthorized":{
          "description":"Unauthorized",
          "content":{
            "application/json":{
              "schema":{
                "type":"object",
                "properties":{
                  "message":{
                    "type":"string",
                    "default":"jwt must be provided"
                  }
                }
              }
            }
          }
        },
        "403Forbidden":{
          "description":"Forbidden",
          "content":{
            "application/json":{
              "schema":{
                "type":"object",
                "properties":{
                  "message":{
                    "type":"string",
                    "default":"forbidden"
                  }
                }
              }
            }
          }
        },
        "404NotFound":{
          "description": "Not Found",
          "content":{
            "application/json":{
              "schema":{
                "type":"object",
                "properties":{
                  "message":{
                    "type":"string",
                    "default":"Not Found"
                  }
                }
              }
            }
          }
        },
        "409Conflict":{
          "description":"Conflict",
          "content":{
            "application/json":{
              "schema":{
                "type":"object",
                "properties":{
                  "message":{
                    "type":"string",
                    "default":"conflict"
                  }
                }
              }
            }
          }
        }
      },
      "schemas":{
        "comment":{
          "type":"object",
          "properties":{
            "id":{
              "type":"string",
              "format":"uuid",
              "readOnly":true
            },
            "user":{
              "readOnly":true,
              "type":"object",
              "properties":{
                "name":{
                  "type":"string"
                },
                "id":{
                  "type":"string"
                },
                "profileImg":{
                  "type":"string",
                  "nullable":true,
                  "default":null
                }
              }
            },
            "createdAt":{
              "readOnly":true,
              "type":"string",
              "format":"date-time"
            },
            "advertisement": {
              "readOnly":true,
              "type":"string",
              "format":"uuid"
            },
            "comment":{
              "type":"string"
            }
          }
        },
        "user":{
          "$ref": "#/components/schemas/userWithoutAddress",
          "type":"object",
          "properties":{
            "address":{
              "$ref":"#/components/schemas/address"
            }
          }
        },
        "userWithoutAddress":{
          "type":"object",
          "properties":{
            "id":{
              "type":"string",
              "format":"uuid",
              "readOnly":true
            },
            "name":{
              "type":"string"
            },
            "email":{
              "type":"string",
              "format":"email"
            },
            "password":{
              "type":"string",
              "minLength":8,
              "writeOnly":true
            },
            "cpf":{
              "type":"string",
              "length":11
            },
            "phone":{
              "type":"string",
              "length":9
            },
            "profileImg":{
              "type":"string",
              "nullable":true,
              "default":null
            },
            "description":{
              "type":"string",
              "nullable":true
            },
            "isAdvertiser":{
              "type":"boolean",
              "default":false
            },
            "birthdate":{
              "type":"string",
              "format": "date"
            },
            "createdAt":{
              "type":"string",
              "format":"date-time",
              "readOnly":true
            },
            "updatedAt":{
              "type":"string",
              "format":"date-time",
              "nullable":true,
              "default":null,
              "readOnly":true
            }
          },
          "required":[
            "name",
            "email",
            "password",
            "cpf",
            "birthdate",
            "phone",
            "address"
          ]
        },
        "userSimple":{
          "type":"object",
          "properties":{
            "id":{
              "type":"string",
              "format":"uuid",
              "readOnly":true
            },
            "name":{
              "type":"string"
            },
            "email":{
              "type":"string",
              "format":"email"
            },
            "profileImg":{
              "type":"string",
              "nullable":true
            },
            "description":{
              "type":"string",
              "nullable":true
            }
          }
        },
        "address": {
          "type":"object",
          "properties":{
            "id":{
              "type":"string",
              "format":"uuid",
              "readOnly":true
            },
            "zipCode":{
              "type": "string",
              "length":8
            },
            "state":{
              "type":"string",
              "length":2
            },
            "city":{
              "type":"string"
            },
            "street": {
              "type":"string"
            },
            "number":{
              "type":"string"
            },
            "complement":{
              "type":"string"
            }
          },
          "required":[
            "zipCode",
            "state",
            "city",
            "street",
            "number"
          ]
        },
        "simpleAdvert":{
          "type":"object",
          "properties":{
            "id":{
              "type":"string",
              "readOnly":true,
              "format":"uuid"
            },
            "brand":{
              "type":"string"
            },
            "model":{
              "type":"string"
            },
            "year": {
              "type":"number"
            },
            "fuel":{
              "type":"string"
            },
            "color":{
              "type":"string"
            },
            "quilometers": {
              "type":"string"
            },
            "price":{
              "type": "number",
              "format":"float"
            },
            "coverImage":{
              "type":"string",
              "nullable": true
            },
            "description":{ 
              "type":"string",
              "nullable":true
            },
            "isAvailable":{
              "type":"boolean",
              "default":true
            },
            "createdAt":{
              "type":"string",
              "format":"date-time",
              "readOnly":true
            },
            "updatedAt":{
              "type":"string",
              "nullable":true,
              "default":null,
              "format":"date-time",
              "readOnly":true
            }
          }
        },
        "advert":{
          "type":"object",
          "properties":{
            "id":{
              "type":"string",
              "readOnly":true,
              "format":"uuid"
            },
            "brand":{
              "type":"string"
            },
            "model":{
              "type":"string"
            },
            "year": {
              "type":"number"
            },
            "fuel":{
              "type":"string"
            },
            "color":{
              "type":"string"
            },
            "quilometers": {
              "type":"string"
            },
            "price":{
              "type": "number",
              "format":"float"
            },
            "coverImage":{
              "type":"string",
              "nullable": true
            },
            "description":{ 
              "type":"string",
              "nullable":true
            },
            "isAvailable":{
              "type":"boolean",
              "default":true
            },
            "createdAt":{
              "type":"string",
              "format":"date-time",
              "readOnly":true
            },
            "updatedAt":{
              "type":"string",
              "nullable":true,
              "format":"date-time",
              "readOnly":true
            },
            "fipeDeal":{
              "type":"boolean",
              "readOnly":true
            },
            "comments":{
              "type":"array",
              "items":{
                "$ref":"#/components/schemas/comment"
              }
            },
            "galleryAdvertisement":{
              "type":"array",
              "nullable":true,
              "items":{
                "type":"array",
                "items":{
                  "$ref":"#/components/schemas/galleryAdvertisement"
                }
              }
            }
          }
        },
        "galleryAdvertisement": {        
          "type":"object",
          "properties":{
            "id":{
              "type":"string",
              "format":"uuid",
              "writeOnly":true
            },
            "imageUrl":{
              "type":"string"
            }
          }
        },
        "userAdverts":{
          "type":"object",
          "properties": {
            "user":{
              "$ref":"#/components/schemas/userWithoutAddress"
            },
            "adverts":{
              "type":"array",
              "items":{
                "$ref":"#/components/schemas/advert"
              },
              "minItems":3
            }
          }
        }
      },
      "responseSchemas":{
        "address": {
          "type":"object",
          "properties":{
            "id":{
              "type":"string",
              "format":"uuid",
              "readOnly":true
            },
            "zipCode":{
              "type": "string",
              "length":8
            },
            "state":{
              "type":"string",
              "length":2
            },
            "city":{
              "type":"string"
            },
            "street": {
              "type":"string"
            },
            "number":{
              "type":"string"
            },
            "complement":{
              "type":"string"
            }
          },
          "required":[
            "zipCode",
            "state",
            "city",
            "street",
            "number"
          ]
        }
      },
      "securitySchemes":{
        "bearerAuth":{
          "type":"http",
          "scheme":"bearer",
          "bearerFormat":"JWT"
        }
      }
    }
}

const createDoc=(local:"dist"|"src")=>{
  fs.appendFile(`./${local}/swagger.json`,JSON.stringify(doc), function (err:any) {
    if (err) throw err;
    console.log('Arquivo Salvo!');
  });
}

env=="dev" ? createDoc("src") : createDoc("dist")

export default doc