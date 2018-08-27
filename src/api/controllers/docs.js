const docs = (req, res) => {
  res.json({
  "openapi" : "3.0.1",
  "info" : {
    "title" : "StackOverflow Lite",
    "description" : "A basic app where users can post questions and receive answers",
    "version" : "0.1"
  },
  "servers" : [ {
    "url" : "https://thegbols.herokuapp.com"
  } ],
  "paths" : {
    "/api/v1/questions/" : {
      "get" : {
        "description" : "Auto generated using Swagger Inspector",
        "responses" : {
          "200" : {
            "description" : "Auto generated using Swagger Inspector",
            "content" : {
              "application/json; charset=utf-8" : {
                "schema" : {
                  "type" : "string"
                },
                "examples" : { }
              }
            }
          }
        }
      }
    },
    "/api/v1/questions/17" : {
      "get" : {
        "description" : "Auto generated using Swagger Inspector",
        "responses" : {
          "200" : {
            "description" : "Auto generated using Swagger Inspector",
            "content" : {
              "application/json; charset=utf-8" : {
                "schema" : {
                  "type" : "string"
                },
                "examples" : { }
              }
            }
          }
        }
      },
      "delete" : {
        "description" : "Auto generated using Swagger Inspector",
        "responses" : {
          "403" : {
            "description" : "Auto generated using Swagger Inspector",
            "content" : {
              "text/html; charset=utf-8" : {
                "schema" : {
                  "type" : "string"
                },
                "examples" : { }
              }
            }
          }
        }
      }
    },
    "/api/v1/questions/17/answers" : {
      "post" : {
        "description" : "Auto generated using Swagger Inspector",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "type" : "object",
                "properties" : {
                  "question" : {
                    "type" : "string"
                  }
                }
              },
              "examples" : {
                "0" : {
                  "value" : "{\n    \"question\":\"who is captain america\"\n}"
                }
              }
            }
          }
        },
        "responses" : {
          "403" : {
            "description" : "Auto generated using Swagger Inspector",
            "content" : {
              "text/html; charset=utf-8" : {
                "schema" : {
                  "type" : "string"
                },
                "examples" : { }
              }
            }
          }
        }
      }
    },
    "/api/v1/auth/login" : {
      "post" : {
        "description" : "Auto generated using Swagger Inspector",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "type" : "object",
                "properties" : {
                  "password" : {
                    "type" : "string"
                  },
                  "username" : {
                    "type" : "string"
                  }
                }
              },
              "examples" : {
                "0" : {
                  "value" : "{\n    \"username\":\"tope\",\n    \"password\":\"sistope\"\n}"
                }
              }
            }
          }
        },
        "responses" : {
          "200" : {
            "description" : "Auto generated using Swagger Inspector",
            "content" : {
              "application/json; charset=utf-8" : {
                "schema" : {
                  "type" : "string"
                },
                "examples" : { }
              }
            }
          }
        }
      }
    },
    "/api/v1/auth/signup" : {
      "post" : {
        "description" : "Auto generated using Swagger Inspector",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "type" : "object",
                "properties" : {
                  "password" : {
                    "type" : "string"
                  },
                  "email" : {
                    "type" : "string"
                  },
                  "username" : {
                    "type" : "string"
                  }
                }
              },
              "examples" : {
                "0" : {
                  "value" : "{\n    \"username\":\"tope\",\n    \"email\":\"tope@tope.com\",\n    \"password\":\"sistope\"\n}"
                }
              }
            }
          }
        },
        "responses" : {
          "200" : {
            "description" : "Auto generated using Swagger Inspector",
            "content" : {
              "application/json; charset=utf-8" : {
                "schema" : {
                  "type" : "string"
                },
                "examples" : { }
              }
            }
          }
        }
      }
    },
    "/api/v1/questions/17/answers/1" : {
      "put" : {
        "description" : "Auto generated using Swagger Inspector",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "type" : "object",
                "properties" : {
                  "question" : {
                    "type" : "string"
                  }
                }
              },
              "examples" : {
                "0" : {
                  "value" : "{\n    \"question\":\"who is captain america\"\n}"
                }
              }
            }
          }
        },
        "responses" : {
          "403" : {
            "description" : "Auto generated using Swagger Inspector",
            "content" : {
              "text/html; charset=utf-8" : {
                "schema" : {
                  "type" : "string"
                },
                "examples" : { }
              }
            }
          }
        }
      }
    },
    "/api/v1/questions" : {
      "post" : {
        "description" : "Auto generated using Swagger Inspector",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "type" : "object",
                "properties" : {
                  "question" : {
                    "type" : "string"
                  }
                }
              },
              "examples" : {
                "0" : {
                  "value" : "{\n    \"question\":\"who is captain america\"\n}"
                }
              }
            }
          }
        },
        "responses" : {
          "403" : {
            "description" : "Auto generated using Swagger Inspector",
            "content" : {
              "text/html; charset=utf-8" : {
                "schema" : {
                  "type" : "string"
                },
                "examples" : { }
              }
            }
          }
        }
      }
    }
  }
})
}

export default docs;