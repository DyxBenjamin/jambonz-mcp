import type { RestEndpointDefinition } from "./catalog.types.js";

// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.
// Regenerate with: npm run rest:catalog:generate
export const REST_ENDPOINTS: readonly RestEndpointDefinition[] = [
  {
    "toolName": "jambonz_accounts_add_limit_for_account",
    "domain": "accounts",
    "endpointSlug": "add-limit-for-account",
    "sourcePath": "reference/rest-platform-management/accounts/add-limit-for-account.mdx",
    "method": "POST",
    "pathTemplate": "/v1/Accounts/{AccountSid}/Limits",
    "operationId": "add-limit-for-account",
    "summary": "create a limit for an account",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "category": {
            "type": "string",
            "enum": [
              {
                "value": "voice_call_session"
              },
              {
                "value": "api_limit"
              },
              {
                "value": "devices"
              }
            ]
          }
        }
      }
    },
    "componentsSchemas": {
      "LimitsCategory": {
        "type": "string",
        "enum": [
          {
            "value": "voice_call_session"
          },
          {
            "value": "api_limit"
          },
          {
            "value": "devices"
          }
        ]
      },
      "Limits": {
        "type": "object",
        "properties": {
          "category": {
            "$ref": "#/components/schemas/LimitsCategory"
          }
        }
      },
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_accounts_check_availability",
    "domain": "accounts",
    "endpointSlug": "check-availability",
    "sourcePath": "reference/rest-platform-management/accounts/check-availability.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Availability",
    "operationId": "check-availability",
    "summary": "check if a limited-availability entity such as a subdomain, email or phone number is already in use",
    "parameters": [
      {
        "name": "type",
        "in": "query",
        "required": true,
        "schema": {
          "type": "string",
          "enum": [
            {
              "value": "email"
            },
            {
              "value": "phone"
            },
            {
              "value": "subdomain"
            }
          ]
        }
      },
      {
        "name": "value",
        "in": "query",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "AvailabilityGetParametersType": {
        "type": "string",
        "enum": [
          {
            "value": "email"
          },
          {
            "value": "phone"
          },
          {
            "value": "subdomain"
          }
        ]
      },
      "Accounts_checkAvailability_Response_200": {
        "type": "object",
        "properties": {
          "available": {
            "type": "boolean",
            "description": "true if value requested is available"
          }
        },
        "required": [
          "available"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_accounts_create_account",
    "domain": "accounts",
    "endpointSlug": "create-account",
    "sourcePath": "reference/rest-platform-management/accounts/create-account.mdx",
    "method": "POST",
    "pathTemplate": "/v1/Accounts",
    "operationId": "create-account",
    "summary": "create an account",
    "parameters": [],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "account name"
          },
          "sip_realm": {
            "type": "string",
            "description": "sip realm for registration"
          },
          "registration_hook": {
            "type": "object",
            "properties": {
              "webhook_sid": {
                "type": "string",
                "format": "uuid"
              },
              "url": {
                "type": "string",
                "format": "url"
              },
              "method": {
                "type": "string",
                "enum": [
                  {
                    "value": "get"
                  },
                  {
                    "value": "post"
                  }
                ]
              },
              "username": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }
            },
            "required": [
              "url"
            ]
          },
          "queue_event_hook": {
            "type": "object",
            "properties": {
              "webhook_sid": {
                "type": "string",
                "format": "uuid"
              },
              "url": {
                "type": "string",
                "format": "url"
              },
              "method": {
                "type": "string",
                "enum": [
                  {
                    "value": "get"
                  },
                  {
                    "value": "post"
                  }
                ]
              },
              "username": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }
            },
            "required": [
              "url"
            ]
          },
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          }
        },
        "required": [
          "name",
          "service_provider_sid"
        ]
      }
    },
    "componentsSchemas": {
      "WebhookMethod": {
        "type": "string",
        "enum": [
          {
            "value": "get"
          },
          {
            "value": "post"
          }
        ]
      },
      "Webhook": {
        "type": "object",
        "properties": {
          "webhook_sid": {
            "type": "string",
            "format": "uuid"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "method": {
            "$ref": "#/components/schemas/WebhookMethod"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "url"
        ]
      },
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_accounts_create_api_key",
    "domain": "accounts",
    "endpointSlug": "create-api-key",
    "sourcePath": "reference/rest-platform-management/accounts/create-api-key.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "POST",
    "pathTemplate": "/v1/ApiKeys",
    "operationId": "create-api-key",
    "summary": "create an API key for an account",
    "parameters": [],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "account_sid": {
            "type": "string",
            "format": "uuid"
          }
        },
        "required": [
          "account_sid"
        ]
      }
    },
    "componentsSchemas": {
      "Accounts_createApiKey_Response_200": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string",
            "format": "uuid"
          },
          "token": {
            "type": "string",
            "format": "uuid"
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_accounts_create_sip_realm",
    "domain": "accounts",
    "endpointSlug": "create-sip-realm",
    "sourcePath": "reference/rest-platform-management/accounts/create-sip-realm.mdx",
    "method": "POST",
    "pathTemplate": "/v1/Accounts/{AccountSid}/SipRealms/{SipRealm}",
    "operationId": "create-sip-realm",
    "summary": "add or change the sip realm",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "SipRealm",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Accounts_createSipRealm_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_accounts_delete_account",
    "domain": "accounts",
    "endpointSlug": "delete-account",
    "sourcePath": "reference/rest-platform-management/accounts/delete-account.mdx",
    "method": "DELETE",
    "pathTemplate": "/v1/Accounts/{AccountSid}",
    "operationId": "delete-account",
    "summary": "delete an account",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Accounts_deleteAccount_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_accounts_get_account",
    "domain": "accounts",
    "endpointSlug": "get-account",
    "sourcePath": "reference/rest-platform-management/accounts/get-account.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}",
    "operationId": "get-account",
    "summary": "retrieve account",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "WebhookMethod": {
        "type": "string",
        "enum": [
          {
            "value": "get"
          },
          {
            "value": "post"
          }
        ]
      },
      "Webhook": {
        "type": "object",
        "properties": {
          "webhook_sid": {
            "type": "string",
            "format": "uuid"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "method": {
            "$ref": "#/components/schemas/WebhookMethod"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "url"
        ]
      },
      "AccountRecordFormat": {
        "type": "string",
        "enum": [
          {
            "value": "wav"
          },
          {
            "value": "mp3"
          }
        ]
      },
      "AccountBucketCredentialVendor": {
        "type": "string",
        "enum": [
          {
            "value": "aws_s3"
          },
          {
            "value": "s3_compatible"
          },
          {
            "value": "azure"
          },
          {
            "value": "google"
          }
        ]
      },
      "AccountBucketCredential": {
        "type": "object",
        "properties": {
          "vendor": {
            "$ref": "#/components/schemas/AccountBucketCredentialVendor"
          },
          "region": {
            "type": "string"
          },
          "name": {
            "type": "string",
            "description": "name of the bucket"
          },
          "access_key_id": {
            "type": "string"
          },
          "secret_access_key": {
            "type": "string"
          }
        }
      },
      "Account": {
        "type": "object",
        "properties": {
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "sip_realm": {
            "type": "string"
          },
          "registration_hook": {
            "description": "authentication webhook for registration",
            "$ref": "#/components/schemas/Webhook"
          },
          "device_calling_application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "record_all_calls": {
            "type": "boolean"
          },
          "record_format": {
            "$ref": "#/components/schemas/AccountRecordFormat"
          },
          "bucket_credential": {
            "description": "Credentials for recording storage",
            "$ref": "#/components/schemas/AccountBucketCredential"
          }
        },
        "required": [
          "account_sid",
          "name",
          "service_provider_sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_accounts_get_account_api_keys",
    "domain": "accounts",
    "endpointSlug": "get-account-api-keys",
    "sourcePath": "reference/rest-platform-management/accounts/get-account-api-keys.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "GET",
    "pathTemplate": "/v1/ApiKeys",
    "operationId": "get-account-api-keys",
    "summary": "get all api keys for an account",
    "parameters": [],
    "componentsSchemas": {
      "ApiKey": {
        "type": "object",
        "properties": {
          "api_key_sid": {
            "type": "string",
            "format": "uuid"
          },
          "token": {
            "type": "string",
            "format": "uuid"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "expires_at": {
            "type": "string",
            "format": "date-time"
          },
          "created_at": {
            "type": "string",
            "format": "date-time"
          },
          "last_used": {
            "type": "string",
            "format": "date-time"
          }
        },
        "required": [
          "api_key_sid",
          "token"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_accounts_get_account_limits",
    "domain": "accounts",
    "endpointSlug": "get-account-limits",
    "sourcePath": "reference/rest-platform-management/accounts/get-account-limits.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/Limits",
    "operationId": "get-account-limits",
    "summary": "retrieve call capacity and other limits from the account",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "componentsSchemas": {
      "LimitsCategory": {
        "type": "string",
        "enum": [
          {
            "value": "voice_call_session"
          },
          {
            "value": "api_limit"
          },
          {
            "value": "devices"
          }
        ]
      },
      "Limits": {
        "type": "object",
        "properties": {
          "category": {
            "$ref": "#/components/schemas/LimitsCategory"
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_accounts_get_webhook_secret",
    "domain": "accounts",
    "endpointSlug": "get-webhook-secret",
    "sourcePath": "reference/rest-platform-management/accounts/get-webhook-secret.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/WebhookSecret",
    "operationId": "get-webhook-secret",
    "summary": "get webhook signing secret, regenerating if requested",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Accounts_getWebhookSecret_Response_200": {
        "type": "object",
        "properties": {
          "webhook_secret": {
            "type": "string"
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_accounts_list_accounts",
    "domain": "accounts",
    "endpointSlug": "list-accounts",
    "sourcePath": "reference/rest-platform-management/accounts/list-accounts.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "GET",
    "pathTemplate": "/v1/Accounts",
    "operationId": "list-accounts",
    "summary": "list accounts",
    "parameters": [],
    "componentsSchemas": {
      "WebhookMethod": {
        "type": "string",
        "enum": [
          {
            "value": "get"
          },
          {
            "value": "post"
          }
        ]
      },
      "Webhook": {
        "type": "object",
        "properties": {
          "webhook_sid": {
            "type": "string",
            "format": "uuid"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "method": {
            "$ref": "#/components/schemas/WebhookMethod"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "url"
        ]
      },
      "AccountRecordFormat": {
        "type": "string",
        "enum": [
          {
            "value": "wav"
          },
          {
            "value": "mp3"
          }
        ]
      },
      "AccountBucketCredentialVendor": {
        "type": "string",
        "enum": [
          {
            "value": "aws_s3"
          },
          {
            "value": "s3_compatible"
          },
          {
            "value": "azure"
          },
          {
            "value": "google"
          }
        ]
      },
      "AccountBucketCredential": {
        "type": "object",
        "properties": {
          "vendor": {
            "$ref": "#/components/schemas/AccountBucketCredentialVendor"
          },
          "region": {
            "type": "string"
          },
          "name": {
            "type": "string",
            "description": "name of the bucket"
          },
          "access_key_id": {
            "type": "string"
          },
          "secret_access_key": {
            "type": "string"
          }
        }
      },
      "Account": {
        "type": "object",
        "properties": {
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "sip_realm": {
            "type": "string"
          },
          "registration_hook": {
            "description": "authentication webhook for registration",
            "$ref": "#/components/schemas/Webhook"
          },
          "device_calling_application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "record_all_calls": {
            "type": "boolean"
          },
          "record_format": {
            "$ref": "#/components/schemas/AccountRecordFormat"
          },
          "bucket_credential": {
            "description": "Credentials for recording storage",
            "$ref": "#/components/schemas/AccountBucketCredential"
          }
        },
        "required": [
          "account_sid",
          "name",
          "service_provider_sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_accounts_update_account",
    "domain": "accounts",
    "endpointSlug": "update-account",
    "sourcePath": "reference/rest-platform-management/accounts/update-account.mdx",
    "method": "PUT",
    "pathTemplate": "/v1/Accounts/{AccountSid}",
    "operationId": "update-account",
    "summary": "update account",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "sip_realm": {
            "type": "string"
          },
          "registration_hook": {
            "type": "object",
            "properties": {
              "webhook_sid": {
                "type": "string",
                "format": "uuid"
              },
              "url": {
                "type": "string",
                "format": "url"
              },
              "method": {
                "type": "string",
                "enum": [
                  {
                    "value": "get"
                  },
                  {
                    "value": "post"
                  }
                ]
              },
              "username": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }
            },
            "required": [
              "url"
            ]
          },
          "device_calling_application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "record_all_calls": {
            "type": "boolean"
          },
          "record_format": {
            "type": "string",
            "enum": [
              {
                "value": "wav"
              },
              {
                "value": "mp3"
              }
            ]
          },
          "bucket_credential": {
            "type": "object",
            "properties": {
              "vendor": {
                "type": "string",
                "enum": [
                  {
                    "value": "aws_s3"
                  },
                  {
                    "value": "s3_compatible"
                  },
                  {
                    "value": "azure"
                  },
                  {
                    "value": "google"
                  }
                ]
              },
              "region": {
                "type": "string"
              },
              "name": {
                "type": "string",
                "description": "name of the bucket"
              },
              "access_key_id": {
                "type": "string"
              },
              "secret_access_key": {
                "type": "string"
              }
            }
          }
        },
        "required": [
          "account_sid",
          "name",
          "service_provider_sid"
        ]
      }
    },
    "componentsSchemas": {
      "WebhookMethod": {
        "type": "string",
        "enum": [
          {
            "value": "get"
          },
          {
            "value": "post"
          }
        ]
      },
      "Webhook": {
        "type": "object",
        "properties": {
          "webhook_sid": {
            "type": "string",
            "format": "uuid"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "method": {
            "$ref": "#/components/schemas/WebhookMethod"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "url"
        ]
      },
      "AccountRecordFormat": {
        "type": "string",
        "enum": [
          {
            "value": "wav"
          },
          {
            "value": "mp3"
          }
        ]
      },
      "AccountBucketCredentialVendor": {
        "type": "string",
        "enum": [
          {
            "value": "aws_s3"
          },
          {
            "value": "s3_compatible"
          },
          {
            "value": "azure"
          },
          {
            "value": "google"
          }
        ]
      },
      "AccountBucketCredential": {
        "type": "object",
        "properties": {
          "vendor": {
            "$ref": "#/components/schemas/AccountBucketCredentialVendor"
          },
          "region": {
            "type": "string"
          },
          "name": {
            "type": "string",
            "description": "name of the bucket"
          },
          "access_key_id": {
            "type": "string"
          },
          "secret_access_key": {
            "type": "string"
          }
        }
      },
      "Account": {
        "type": "object",
        "properties": {
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "sip_realm": {
            "type": "string"
          },
          "registration_hook": {
            "description": "authentication webhook for registration",
            "$ref": "#/components/schemas/Webhook"
          },
          "device_calling_application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "record_all_calls": {
            "type": "boolean"
          },
          "record_format": {
            "$ref": "#/components/schemas/AccountRecordFormat"
          },
          "bucket_credential": {
            "description": "Credentials for recording storage",
            "$ref": "#/components/schemas/AccountBucketCredential"
          }
        },
        "required": [
          "account_sid",
          "name",
          "service_provider_sid"
        ]
      },
      "Accounts_updateAccount_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_alerts_list_alerts_by_account",
    "domain": "alerts",
    "endpointSlug": "list-alerts-by-account",
    "sourcePath": "reference/rest-platform-management/alerts/list-alerts-by-account.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/Alerts",
    "operationId": "list-alerts-by-account",
    "summary": "retrieve alerts for an account",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      {
        "name": "page",
        "in": "query",
        "required": true,
        "schema": {
          "type": "integer"
        }
      },
      {
        "name": "count",
        "in": "query",
        "required": true,
        "schema": {
          "type": "integer"
        }
      },
      {
        "name": "days",
        "in": "query",
        "required": false,
        "schema": {
          "type": "integer"
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "schema": {
          "type": "string",
          "format": "date-time"
        }
      },
      {
        "name": "end",
        "in": "query",
        "required": false,
        "schema": {
          "type": "string",
          "format": "date-time"
        }
      },
      {
        "name": "alert_type",
        "in": "query",
        "required": false,
        "schema": {
          "type": "string",
          "enum": [
            {
              "value": "webhook-failure"
            },
            {
              "value": "webhook-connection-failure"
            },
            {
              "value": "webhook-auth-failure"
            },
            {
              "value": "no-tts"
            },
            {
              "value": "no-stt"
            },
            {
              "value": "tts-failure"
            },
            {
              "value": "stt-failure"
            },
            {
              "value": "no-carrier"
            },
            {
              "value": "call-limit"
            },
            {
              "value": "device-limit"
            },
            {
              "value": "api-limit"
            }
          ]
        }
      }
    ],
    "componentsSchemas": {
      "AccountsAccountSidAlertsGetParametersAlertType": {
        "type": "string",
        "enum": [
          {
            "value": "webhook-failure"
          },
          {
            "value": "webhook-connection-failure"
          },
          {
            "value": "webhook-auth-failure"
          },
          {
            "value": "no-tts"
          },
          {
            "value": "no-stt"
          },
          {
            "value": "tts-failure"
          },
          {
            "value": "stt-failure"
          },
          {
            "value": "no-carrier"
          },
          {
            "value": "call-limit"
          },
          {
            "value": "device-limit"
          },
          {
            "value": "api-limit"
          }
        ]
      },
      "AccountsAccountSidAlertsGetResponsesContentApplicationJsonSchemaDataItems": {
        "type": "object",
        "properties": {
          "time": {
            "type": "string",
            "format": "date-time"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "alert_type": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "detail": {
            "type": "string"
          }
        },
        "required": [
          "time",
          "account_sid",
          "alert_type",
          "message"
        ]
      },
      "Alerts_listAlertsByAccount_Response_200": {
        "type": "object",
        "properties": {
          "total": {
            "type": "integer",
            "description": "total number of records in that database that match the filter criteria"
          },
          "batch": {
            "type": "integer",
            "description": "total number of records returned in this page set"
          },
          "page": {
            "type": "integer",
            "description": "page number that was requested, and is being returned"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AccountsAccountSidAlertsGetResponsesContentApplicationJsonSchemaDataItems"
            }
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_applications_create_application",
    "domain": "applications",
    "endpointSlug": "create-application",
    "sourcePath": "reference/rest-platform-management/applications/create-application.mdx",
    "method": "POST",
    "pathTemplate": "/v1/Applications",
    "operationId": "create-application",
    "summary": "create application",
    "parameters": [],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "application name"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "call_hook": {
            "type": "object",
            "properties": {
              "webhook_sid": {
                "type": "string",
                "format": "uuid"
              },
              "url": {
                "type": "string",
                "format": "url"
              },
              "method": {
                "type": "string",
                "enum": [
                  {
                    "value": "get"
                  },
                  {
                    "value": "post"
                  }
                ]
              },
              "username": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }
            },
            "required": [
              "url"
            ]
          },
          "call_status_hook": {
            "type": "object",
            "properties": {
              "webhook_sid": {
                "type": "string",
                "format": "uuid"
              },
              "url": {
                "type": "string",
                "format": "url"
              },
              "method": {
                "type": "string",
                "enum": [
                  {
                    "value": "get"
                  },
                  {
                    "value": "post"
                  }
                ]
              },
              "username": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }
            },
            "required": [
              "url"
            ]
          },
          "messaging_hook": {
            "type": "object",
            "properties": {
              "webhook_sid": {
                "type": "string",
                "format": "uuid"
              },
              "url": {
                "type": "string",
                "format": "url"
              },
              "method": {
                "type": "string",
                "enum": [
                  {
                    "value": "get"
                  },
                  {
                    "value": "post"
                  }
                ]
              },
              "username": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }
            },
            "required": [
              "url"
            ]
          },
          "app_json": {
            "type": "string",
            "description": "Voice Application Json, call_hook will not be invoked if app_json is provided"
          },
          "speech_synthesis_vendor": {
            "type": "string"
          },
          "speech_synthesis_voice": {
            "type": "string"
          },
          "speech_recognizer_vendor": {
            "type": "string"
          },
          "speech_recognizer_language": {
            "type": "string"
          },
          "env_vars": {
            "type": "object",
            "properties": {}
          }
        },
        "required": [
          "name",
          "account_sid",
          "call_hook",
          "call_status_hook"
        ]
      }
    },
    "componentsSchemas": {
      "WebhookMethod": {
        "type": "string",
        "enum": [
          {
            "value": "get"
          },
          {
            "value": "post"
          }
        ]
      },
      "Webhook": {
        "type": "object",
        "properties": {
          "webhook_sid": {
            "type": "string",
            "format": "uuid"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "method": {
            "$ref": "#/components/schemas/WebhookMethod"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "url"
        ]
      },
      "ApplicationsPostRequestBodyContentApplicationJsonSchemaEnvVars": {
        "type": "object",
        "properties": {}
      },
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_applications_delete_application",
    "domain": "applications",
    "endpointSlug": "delete-application",
    "sourcePath": "reference/rest-platform-management/applications/delete-application.mdx",
    "method": "DELETE",
    "pathTemplate": "/v1/Applications/{ApplicationSid}",
    "operationId": "delete-application",
    "summary": "delete an application",
    "parameters": [
      {
        "name": "ApplicationSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Applications_deleteApplication_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_applications_get_app_env_schema",
    "domain": "applications",
    "endpointSlug": "get-app-env-schema",
    "sourcePath": "reference/rest-platform-management/applications/get-app-env-schema.mdx",
    "method": "GET",
    "pathTemplate": "/v1/AppEnv",
    "operationId": "get-app-env-schema",
    "summary": "Get App Env Schema",
    "parameters": [
      {
        "name": "url",
        "in": "query",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Applications_getAppEnvSchema_Response_200": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_applications_get_webhook",
    "domain": "applications",
    "endpointSlug": "get-webhook",
    "sourcePath": "reference/rest-platform-management/applications/get-webhook.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "GET",
    "pathTemplate": "/v1/Webhooks/{WebhookSid}",
    "operationId": "get-webhook",
    "summary": "retrieve webhook",
    "parameters": [
      {
        "name": "WebhookSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "WebhookMethod": {
        "type": "string",
        "enum": [
          {
            "value": "get"
          },
          {
            "value": "post"
          }
        ]
      },
      "Webhook": {
        "type": "object",
        "properties": {
          "webhook_sid": {
            "type": "string",
            "format": "uuid"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "method": {
            "$ref": "#/components/schemas/WebhookMethod"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "url"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_applications_list_applications",
    "domain": "applications",
    "endpointSlug": "list-applications",
    "sourcePath": "reference/rest-platform-management/applications/list-applications.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "GET",
    "pathTemplate": "/v1/Applications",
    "operationId": "list-applications",
    "summary": "list applications",
    "parameters": [],
    "componentsSchemas": {
      "WebhookMethod": {
        "type": "string",
        "enum": [
          {
            "value": "get"
          },
          {
            "value": "post"
          }
        ]
      },
      "Webhook": {
        "type": "object",
        "properties": {
          "webhook_sid": {
            "type": "string",
            "format": "uuid"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "method": {
            "$ref": "#/components/schemas/WebhookMethod"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "url"
        ]
      },
      "ApplicationEnvVars": {
        "type": "object",
        "properties": {}
      },
      "Application": {
        "type": "object",
        "properties": {
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "call_hook": {
            "description": "application webhook for inbound voice calls",
            "$ref": "#/components/schemas/Webhook"
          },
          "call_status_hook": {
            "description": "webhhok for reporting call status events",
            "$ref": "#/components/schemas/Webhook"
          },
          "messaging_hook": {
            "description": "application webhook for inbound SMS/MMS",
            "$ref": "#/components/schemas/Webhook"
          },
          "speech_synthesis_vendor": {
            "type": "string"
          },
          "speech_synthesis_voice": {
            "type": "string"
          },
          "speech_recognizer_vendor": {
            "type": "string"
          },
          "speech_recognizer_language": {
            "type": "string"
          },
          "env_vars": {
            "description": "Object containing the Application Environment Variables as key/value to be sent with the call_hook payload",
            "$ref": "#/components/schemas/ApplicationEnvVars"
          },
          "record_all_calls": {
            "type": "boolean"
          }
        },
        "required": [
          "name",
          "account_sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_applications_retrieve_an_application",
    "domain": "applications",
    "endpointSlug": "retrieve-an-application",
    "sourcePath": "reference/rest-platform-management/applications/retrieve-an-application.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "GET",
    "pathTemplate": "/v1/Applications/{ApplicationSid}",
    "operationId": "retrieve-an-application",
    "summary": "retrieve an application",
    "parameters": [
      {
        "name": "ApplicationSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "WebhookMethod": {
        "type": "string",
        "enum": [
          {
            "value": "get"
          },
          {
            "value": "post"
          }
        ]
      },
      "Webhook": {
        "type": "object",
        "properties": {
          "webhook_sid": {
            "type": "string",
            "format": "uuid"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "method": {
            "$ref": "#/components/schemas/WebhookMethod"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "url"
        ]
      },
      "ApplicationEnvVars": {
        "type": "object",
        "properties": {}
      },
      "Application": {
        "type": "object",
        "properties": {
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "call_hook": {
            "description": "application webhook for inbound voice calls",
            "$ref": "#/components/schemas/Webhook"
          },
          "call_status_hook": {
            "description": "webhhok for reporting call status events",
            "$ref": "#/components/schemas/Webhook"
          },
          "messaging_hook": {
            "description": "application webhook for inbound SMS/MMS",
            "$ref": "#/components/schemas/Webhook"
          },
          "speech_synthesis_vendor": {
            "type": "string"
          },
          "speech_synthesis_voice": {
            "type": "string"
          },
          "speech_recognizer_vendor": {
            "type": "string"
          },
          "speech_recognizer_language": {
            "type": "string"
          },
          "env_vars": {
            "description": "Object containing the Application Environment Variables as key/value to be sent with the call_hook payload",
            "$ref": "#/components/schemas/ApplicationEnvVars"
          },
          "record_all_calls": {
            "type": "boolean"
          }
        },
        "required": [
          "name",
          "account_sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_applications_update_application",
    "domain": "applications",
    "endpointSlug": "update-application",
    "sourcePath": "reference/rest-platform-management/applications/update-application.mdx",
    "method": "PUT",
    "pathTemplate": "/v1/Applications/{ApplicationSid}",
    "operationId": "update-application",
    "summary": "update application",
    "parameters": [
      {
        "name": "ApplicationSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "call_hook": {
            "type": "object",
            "properties": {
              "webhook_sid": {
                "type": "string",
                "format": "uuid"
              },
              "url": {
                "type": "string",
                "format": "url"
              },
              "method": {
                "type": "string",
                "enum": [
                  {
                    "value": "get"
                  },
                  {
                    "value": "post"
                  }
                ]
              },
              "username": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }
            },
            "required": [
              "url"
            ]
          },
          "call_status_hook": {
            "type": "object",
            "properties": {
              "webhook_sid": {
                "type": "string",
                "format": "uuid"
              },
              "url": {
                "type": "string",
                "format": "url"
              },
              "method": {
                "type": "string",
                "enum": [
                  {
                    "value": "get"
                  },
                  {
                    "value": "post"
                  }
                ]
              },
              "username": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }
            },
            "required": [
              "url"
            ]
          },
          "messaging_hook": {
            "type": "object",
            "properties": {
              "webhook_sid": {
                "type": "string",
                "format": "uuid"
              },
              "url": {
                "type": "string",
                "format": "url"
              },
              "method": {
                "type": "string",
                "enum": [
                  {
                    "value": "get"
                  },
                  {
                    "value": "post"
                  }
                ]
              },
              "username": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }
            },
            "required": [
              "url"
            ]
          },
          "speech_synthesis_vendor": {
            "type": "string"
          },
          "speech_synthesis_voice": {
            "type": "string"
          },
          "speech_recognizer_vendor": {
            "type": "string"
          },
          "speech_recognizer_language": {
            "type": "string"
          },
          "env_vars": {
            "type": "object",
            "properties": {}
          },
          "record_all_calls": {
            "type": "boolean"
          }
        },
        "required": [
          "name",
          "account_sid"
        ]
      }
    },
    "componentsSchemas": {
      "WebhookMethod": {
        "type": "string",
        "enum": [
          {
            "value": "get"
          },
          {
            "value": "post"
          }
        ]
      },
      "Webhook": {
        "type": "object",
        "properties": {
          "webhook_sid": {
            "type": "string",
            "format": "uuid"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "method": {
            "$ref": "#/components/schemas/WebhookMethod"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "url"
        ]
      },
      "ApplicationEnvVars": {
        "type": "object",
        "properties": {}
      },
      "Application": {
        "type": "object",
        "properties": {
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "call_hook": {
            "description": "application webhook for inbound voice calls",
            "$ref": "#/components/schemas/Webhook"
          },
          "call_status_hook": {
            "description": "webhhok for reporting call status events",
            "$ref": "#/components/schemas/Webhook"
          },
          "messaging_hook": {
            "description": "application webhook for inbound SMS/MMS",
            "$ref": "#/components/schemas/Webhook"
          },
          "speech_synthesis_vendor": {
            "type": "string"
          },
          "speech_synthesis_voice": {
            "type": "string"
          },
          "speech_recognizer_vendor": {
            "type": "string"
          },
          "speech_recognizer_language": {
            "type": "string"
          },
          "env_vars": {
            "description": "Object containing the Application Environment Variables as key/value to be sent with the call_hook payload",
            "$ref": "#/components/schemas/ApplicationEnvVars"
          },
          "record_all_calls": {
            "type": "boolean"
          }
        },
        "required": [
          "name",
          "account_sid"
        ]
      },
      "Applications_updateApplication_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_create_lcr",
    "domain": "call-routing",
    "endpointSlug": "create-lcr",
    "sourcePath": "reference/rest-platform-management/call-routing/create-lcr.mdx",
    "method": "POST",
    "pathTemplate": "/v1/Lcrs",
    "operationId": "create-lcr",
    "summary": "create a Least Cost Routing",
    "parameters": [],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "name or Least Cost Routing"
          }
        },
        "required": [
          "name"
        ]
      }
    },
    "componentsSchemas": {
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_create_lcr_carrier_set_entry",
    "domain": "call-routing",
    "endpointSlug": "create-lcr-carrier-set-entry",
    "sourcePath": "reference/rest-platform-management/call-routing/create-lcr-carrier-set-entry.mdx",
    "method": "POST",
    "pathTemplate": "/v1/LcrCarrierSetEntries",
    "operationId": "create-lcr-carrier-set-entry",
    "summary": "create a Least Cost Routing Carrier Set Entry",
    "parameters": [],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "workload": {
              "type": "integer",
              "description": "traffic distribution value"
            },
            "lcr_route_sid": {
              "type": "string"
            },
            "voip_carrier_sid": {
              "type": "string"
            },
            "priority": {
              "type": "integer"
            }
          },
          "required": [
            "lcr_route_sid",
            "voip_carrier_sid",
            "priority"
          ]
        }
      }
    },
    "componentsSchemas": {
      "LcrCarrierSetEntry": {
        "type": "object",
        "properties": {
          "workload": {
            "type": "integer",
            "description": "traffic distribution value"
          },
          "lcr_route_sid": {
            "type": "string"
          },
          "voip_carrier_sid": {
            "type": "string"
          },
          "priority": {
            "type": "integer"
          }
        },
        "required": [
          "lcr_route_sid",
          "voip_carrier_sid",
          "priority"
        ]
      },
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_create_lcr_for_service_provider",
    "domain": "call-routing",
    "endpointSlug": "create-lcr-for-service-provider",
    "sourcePath": "reference/rest-platform-management/call-routing/create-lcr-for-service-provider.mdx",
    "method": "POST",
    "pathTemplate": "/v1/ServiceProviders/{ServiceProviderSid}/Lcrs",
    "operationId": "create-lcr-for-service-provider",
    "summary": "create a Lest cost routing for a service provider",
    "parameters": [
      {
        "name": "ServiceProviderSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "name or Least Cost Routing"
          }
        },
        "required": [
          "name"
        ]
      }
    },
    "componentsSchemas": {
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_create_lcr_routes",
    "domain": "call-routing",
    "endpointSlug": "create-lcr-routes",
    "sourcePath": "reference/rest-platform-management/call-routing/create-lcr-routes.mdx",
    "method": "POST",
    "pathTemplate": "/v1/LcrRoutes",
    "operationId": "create-lcr-routes",
    "summary": "create a Least Cost Routing Routes",
    "parameters": [],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "lcr_sid": {
              "type": "string"
            },
            "regex": {
              "type": "string",
              "description": "out going call Phone number regex"
            },
            "priority": {
              "type": "integer"
            },
            "description": {
              "type": "string"
            }
          },
          "required": [
            "lcr_sid",
            "regex",
            "priority"
          ]
        }
      }
    },
    "componentsSchemas": {
      "LcrRoute": {
        "type": "object",
        "properties": {
          "lcr_sid": {
            "type": "string"
          },
          "regex": {
            "type": "string",
            "description": "out going call Phone number regex"
          },
          "priority": {
            "type": "integer"
          },
          "description": {
            "type": "string"
          }
        },
        "required": [
          "lcr_sid",
          "regex",
          "priority"
        ]
      },
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_create_least_cost_routing_routes_and_carrier_entries",
    "domain": "call-routing",
    "endpointSlug": "create-least-cost-routing-routes-and-carrier-entries",
    "sourcePath": "reference/rest-platform-management/call-routing/create-least-cost-routing-routes-and-carrier-entries.mdx",
    "method": "POST",
    "pathTemplate": "/v1/Lcrs/{LcrSid}/Routes",
    "operationId": "create-least-cost-routing-routes-and-carrier-entries",
    "summary": "Create least cost routing routes and carrier set entries",
    "parameters": [
      {
        "name": "LcrSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "lcr_sid": {
              "type": "string"
            },
            "regex": {
              "type": "string",
              "description": "out going call Phone number regex"
            },
            "priority": {
              "type": "integer"
            },
            "description": {
              "type": "string"
            },
            "lcr_carrier_set_entries": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "workload": {
                    "type": "integer",
                    "description": "traffic distribution value"
                  },
                  "lcr_route_sid": {
                    "type": "string"
                  },
                  "voip_carrier_sid": {
                    "type": "string"
                  },
                  "priority": {
                    "type": "integer"
                  }
                },
                "required": [
                  "lcr_route_sid",
                  "voip_carrier_sid",
                  "priority"
                ]
              }
            }
          },
          "required": [
            "lcr_sid",
            "regex",
            "priority"
          ]
        }
      }
    },
    "componentsSchemas": {
      "LcrCarrierSetEntry": {
        "type": "object",
        "properties": {
          "workload": {
            "type": "integer",
            "description": "traffic distribution value"
          },
          "lcr_route_sid": {
            "type": "string"
          },
          "voip_carrier_sid": {
            "type": "string"
          },
          "priority": {
            "type": "integer"
          }
        },
        "required": [
          "lcr_route_sid",
          "voip_carrier_sid",
          "priority"
        ]
      },
      "LcrRouteAndCarrierEntries": {
        "type": "object",
        "properties": {
          "lcr_sid": {
            "type": "string"
          },
          "regex": {
            "type": "string",
            "description": "out going call Phone number regex"
          },
          "priority": {
            "type": "integer"
          },
          "description": {
            "type": "string"
          },
          "lcr_carrier_set_entries": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/LcrCarrierSetEntry"
            }
          }
        },
        "required": [
          "lcr_sid",
          "regex",
          "priority"
        ]
      },
      "LcrRoutes": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LcrRouteAndCarrierEntries"
        }
      },
      "Call Routing_createLeastCostRoutingRoutesAndCarrierEntries_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_delete_least_cost_routing",
    "domain": "call-routing",
    "endpointSlug": "delete-least-cost-routing",
    "sourcePath": "reference/rest-platform-management/call-routing/delete-least-cost-routing.mdx",
    "method": "DELETE",
    "pathTemplate": "/v1/Lcrs/{LcrSid}",
    "operationId": "delete-least-cost-routing",
    "summary": "delete a least cost routing",
    "parameters": [
      {
        "name": "LcrSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Call Routing_deleteLeastCostRouting_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_delete_least_cost_routing_carrier_set_entry",
    "domain": "call-routing",
    "endpointSlug": "delete-least-cost-routing-carrier-set-entry",
    "sourcePath": "reference/rest-platform-management/call-routing/delete-least-cost-routing-carrier-set-entry.mdx",
    "method": "DELETE",
    "pathTemplate": "/v1/LcrCarrierSetEntries/{LcrCarrierSetEntrySid}",
    "operationId": "delete-least-cost-routing-carrier-set-entry",
    "summary": "delete a least cost routing carrier set entry",
    "parameters": [
      {
        "name": "LcrCarrierSetEntrySid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Call Routing_deleteLeastCostRoutingCarrierSetEntry_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_delete_least_cost_routing_route",
    "domain": "call-routing",
    "endpointSlug": "delete-least-cost-routing-route",
    "sourcePath": "reference/rest-platform-management/call-routing/delete-least-cost-routing-route.mdx",
    "method": "DELETE",
    "pathTemplate": "/v1/LcrRoutes/{LcrRouteSid}",
    "operationId": "delete-least-cost-routing-route",
    "summary": "delete a least cost routing route",
    "parameters": [
      {
        "name": "LcrRouteSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Call Routing_deleteLeastCostRoutingRoute_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_get_least_cost_routing",
    "domain": "call-routing",
    "endpointSlug": "get-least-cost-routing",
    "sourcePath": "reference/rest-platform-management/call-routing/get-least-cost-routing.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Lcrs/{LcrSid}",
    "operationId": "get-least-cost-routing",
    "summary": "retrieve least cost routing",
    "parameters": [
      {
        "name": "LcrSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Lcr": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "default_carrier_set_entry_sid": {
            "type": "string"
          }
        },
        "required": [
          "name"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_get_least_cost_routing_carrier_set_entry",
    "domain": "call-routing",
    "endpointSlug": "get-least-cost-routing-carrier-set-entry",
    "sourcePath": "reference/rest-platform-management/call-routing/get-least-cost-routing-carrier-set-entry.mdx",
    "method": "GET",
    "pathTemplate": "/v1/LcrCarrierSetEntries/{LcrCarrierSetEntrySid}",
    "operationId": "get-least-cost-routing-carrier-set-entry",
    "summary": "retrieve least cost routing carrier set entry",
    "parameters": [
      {
        "name": "LcrCarrierSetEntrySid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "LcrCarrierSetEntry": {
        "type": "object",
        "properties": {
          "workload": {
            "type": "integer",
            "description": "traffic distribution value"
          },
          "lcr_route_sid": {
            "type": "string"
          },
          "voip_carrier_sid": {
            "type": "string"
          },
          "priority": {
            "type": "integer"
          }
        },
        "required": [
          "lcr_route_sid",
          "voip_carrier_sid",
          "priority"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_get_least_cost_routing_route",
    "domain": "call-routing",
    "endpointSlug": "get-least-cost-routing-route",
    "sourcePath": "reference/rest-platform-management/call-routing/get-least-cost-routing-route.mdx",
    "method": "GET",
    "pathTemplate": "/v1/LcrRoutes/{LcrRouteSid}",
    "operationId": "get-least-cost-routing-route",
    "summary": "retrieve least cost routing route",
    "parameters": [
      {
        "name": "LcrRouteSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "LcrRoute": {
        "type": "object",
        "properties": {
          "lcr_sid": {
            "type": "string"
          },
          "regex": {
            "type": "string",
            "description": "out going call Phone number regex"
          },
          "priority": {
            "type": "integer"
          },
          "description": {
            "type": "string"
          }
        },
        "required": [
          "lcr_sid",
          "regex",
          "priority"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_get_service_provider_lcrs",
    "domain": "call-routing",
    "endpointSlug": "get-service-provider-lcrs",
    "sourcePath": "reference/rest-platform-management/call-routing/get-service-provider-lcrs.mdx",
    "method": "GET",
    "pathTemplate": "/v1/ServiceProviders/{ServiceProviderSid}/Lcrs",
    "operationId": "get-service-provider-lcrs",
    "summary": "get all Least Cost Routings for a service provider",
    "parameters": [
      {
        "name": "ServiceProviderSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Lcr": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "default_carrier_set_entry_sid": {
            "type": "string"
          }
        },
        "required": [
          "name"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_list_least_cost_routing_routes",
    "domain": "call-routing",
    "endpointSlug": "list-least-cost-routing-routes",
    "sourcePath": "reference/rest-platform-management/call-routing/list-least-cost-routing-routes.mdx",
    "method": "GET",
    "pathTemplate": "/v1/LcrRoutes",
    "operationId": "list-least-cost-routing-routes",
    "summary": "list least cost routings routes",
    "parameters": [
      {
        "name": "lcr_sid",
        "in": "query",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "LcrRoute": {
        "type": "object",
        "properties": {
          "lcr_sid": {
            "type": "string"
          },
          "regex": {
            "type": "string",
            "description": "out going call Phone number regex"
          },
          "priority": {
            "type": "integer"
          },
          "description": {
            "type": "string"
          }
        },
        "required": [
          "lcr_sid",
          "regex",
          "priority"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_list_least_cost_routings",
    "domain": "call-routing",
    "endpointSlug": "list-least-cost-routings",
    "sourcePath": "reference/rest-platform-management/call-routing/list-least-cost-routings.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Lcrs",
    "operationId": "list-least-cost-routings",
    "summary": "list least cost routings",
    "parameters": [],
    "componentsSchemas": {
      "Lcr": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "default_carrier_set_entry_sid": {
            "type": "string"
          }
        },
        "required": [
          "name"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_update_least_cost_routing",
    "domain": "call-routing",
    "endpointSlug": "update-least-cost-routing",
    "sourcePath": "reference/rest-platform-management/call-routing/update-least-cost-routing.mdx",
    "method": "PUT",
    "pathTemplate": "/v1/Lcrs/{LcrSid}",
    "operationId": "update-least-cost-routing",
    "summary": "update least cost routing",
    "parameters": [
      {
        "name": "LcrSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "default_carrier_set_entry_sid": {
            "type": "string"
          }
        },
        "required": [
          "name"
        ]
      }
    },
    "componentsSchemas": {
      "Lcr": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "default_carrier_set_entry_sid": {
            "type": "string"
          }
        },
        "required": [
          "name"
        ]
      },
      "Call Routing_updateLeastCostRouting_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_update_least_cost_routing_carrier_set_entry",
    "domain": "call-routing",
    "endpointSlug": "update-least-cost-routing-carrier-set-entry",
    "sourcePath": "reference/rest-platform-management/call-routing/update-least-cost-routing-carrier-set-entry.mdx",
    "method": "PUT",
    "pathTemplate": "/v1/LcrCarrierSetEntries/{LcrCarrierSetEntrySid}",
    "operationId": "update-least-cost-routing-carrier-set-entry",
    "summary": "update least cost routing carrier set entry",
    "parameters": [
      {
        "name": "LcrCarrierSetEntrySid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "workload": {
            "type": "integer",
            "description": "traffic distribution value"
          },
          "lcr_route_sid": {
            "type": "string"
          },
          "voip_carrier_sid": {
            "type": "string"
          },
          "priority": {
            "type": "integer"
          }
        },
        "required": [
          "lcr_route_sid",
          "voip_carrier_sid",
          "priority"
        ]
      }
    },
    "componentsSchemas": {
      "LcrCarrierSetEntry": {
        "type": "object",
        "properties": {
          "workload": {
            "type": "integer",
            "description": "traffic distribution value"
          },
          "lcr_route_sid": {
            "type": "string"
          },
          "voip_carrier_sid": {
            "type": "string"
          },
          "priority": {
            "type": "integer"
          }
        },
        "required": [
          "lcr_route_sid",
          "voip_carrier_sid",
          "priority"
        ]
      },
      "Call Routing_updateLeastCostRoutingCarrierSetEntry_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_update_least_cost_routing_route",
    "domain": "call-routing",
    "endpointSlug": "update-least-cost-routing-route",
    "sourcePath": "reference/rest-platform-management/call-routing/update-least-cost-routing-route.mdx",
    "method": "PUT",
    "pathTemplate": "/v1/LcrRoutes/{LcrRouteSid}",
    "operationId": "update-least-cost-routing-route",
    "summary": "update least cost routing route",
    "parameters": [
      {
        "name": "LcrRouteSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "lcr_sid": {
            "type": "string"
          },
          "regex": {
            "type": "string",
            "description": "out going call Phone number regex"
          },
          "priority": {
            "type": "integer"
          },
          "description": {
            "type": "string"
          }
        },
        "required": [
          "lcr_sid",
          "regex",
          "priority"
        ]
      }
    },
    "componentsSchemas": {
      "LcrRoute": {
        "type": "object",
        "properties": {
          "lcr_sid": {
            "type": "string"
          },
          "regex": {
            "type": "string",
            "description": "out going call Phone number regex"
          },
          "priority": {
            "type": "integer"
          },
          "description": {
            "type": "string"
          }
        },
        "required": [
          "lcr_sid",
          "regex",
          "priority"
        ]
      },
      "Call Routing_updateLeastCostRoutingRoute_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_call_routing_update_least_cost_routing_routes_and_carrier_entries",
    "domain": "call-routing",
    "endpointSlug": "update-least-cost-routing-routes-and-carrier-entries",
    "sourcePath": "reference/rest-platform-management/call-routing/update-least-cost-routing-routes-and-carrier-entries.mdx",
    "method": "PUT",
    "pathTemplate": "/v1/Lcrs/{LcrSid}/Routes",
    "operationId": "update-least-cost-routing-routes-and-carrier-entries",
    "summary": "update least cost routing routes and carrier set entries",
    "parameters": [
      {
        "name": "LcrSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "lcr_sid": {
              "type": "string"
            },
            "regex": {
              "type": "string",
              "description": "out going call Phone number regex"
            },
            "priority": {
              "type": "integer"
            },
            "description": {
              "type": "string"
            },
            "lcr_carrier_set_entries": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "workload": {
                    "type": "integer",
                    "description": "traffic distribution value"
                  },
                  "lcr_route_sid": {
                    "type": "string"
                  },
                  "voip_carrier_sid": {
                    "type": "string"
                  },
                  "priority": {
                    "type": "integer"
                  }
                },
                "required": [
                  "lcr_route_sid",
                  "voip_carrier_sid",
                  "priority"
                ]
              }
            }
          },
          "required": [
            "lcr_sid",
            "regex",
            "priority"
          ]
        }
      }
    },
    "componentsSchemas": {
      "LcrCarrierSetEntry": {
        "type": "object",
        "properties": {
          "workload": {
            "type": "integer",
            "description": "traffic distribution value"
          },
          "lcr_route_sid": {
            "type": "string"
          },
          "voip_carrier_sid": {
            "type": "string"
          },
          "priority": {
            "type": "integer"
          }
        },
        "required": [
          "lcr_route_sid",
          "voip_carrier_sid",
          "priority"
        ]
      },
      "LcrRouteAndCarrierEntries": {
        "type": "object",
        "properties": {
          "lcr_sid": {
            "type": "string"
          },
          "regex": {
            "type": "string",
            "description": "out going call Phone number regex"
          },
          "priority": {
            "type": "integer"
          },
          "description": {
            "type": "string"
          },
          "lcr_carrier_set_entries": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/LcrCarrierSetEntry"
            }
          }
        },
        "required": [
          "lcr_sid",
          "regex",
          "priority"
        ]
      },
      "LcrRoutes": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LcrRouteAndCarrierEntries"
        }
      },
      "Call Routing_updateLeastCostRoutingRoutesAndCarrierEntries_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_calls_create_call",
    "domain": "calls",
    "endpointSlug": "create-call",
    "sourcePath": "reference/rest-call-control/calls/create-call.mdx",
    "method": "POST",
    "pathTemplate": "/v1/Accounts/{AccountSid}/Calls",
    "operationId": "create-call",
    "summary": "create a call",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "application_sid": {
            "type": "string",
            "format": "uuid",
            "description": "The application to use to control this call.  Either application_sid or call_hook is required."
          },
          "answerOnBridge": {
            "type": "boolean",
            "description": "If set to true, the inbound call will ring until the number that was dialed answers the call, and at that point a 200 OK will be sent on the inbound leg.  If false, the inbound call will be answered immediately as the outbound call is placed."
          },
          "call_hook": {
            "type": "object",
            "properties": {
              "webhook_sid": {
                "type": "string",
                "format": "uuid"
              },
              "url": {
                "type": "string",
                "format": "url"
              },
              "method": {
                "type": "string",
                "enum": [
                  {
                    "value": "get"
                  },
                  {
                    "value": "post"
                  }
                ]
              },
              "username": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }
            },
            "required": [
              "url"
            ]
          },
          "call_status_hook": {
            "type": "object",
            "properties": {
              "webhook_sid": {
                "type": "string",
                "format": "uuid"
              },
              "url": {
                "type": "string",
                "format": "url"
              },
              "method": {
                "type": "string",
                "enum": [
                  {
                    "value": "get"
                  },
                  {
                    "value": "post"
                  }
                ]
              },
              "username": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }
            },
            "required": [
              "url"
            ]
          },
          "from": {
            "type": "string",
            "description": "The calling party number"
          },
          "fromHost": {
            "type": "string",
            "description": "The hostname to put in the SIP From header of the INVITE"
          },
          "timeout": {
            "type": "integer",
            "description": "The number of seconds to wait for call to be answered.  Defaults to 60."
          },
          "timeLimit": {
            "type": "integer",
            "description": "The max length of call in seconds"
          },
          "tag": {
            "type": "object",
            "properties": {}
          },
          "to": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  {
                    "value": "phone"
                  },
                  {
                    "value": "sip"
                  },
                  {
                    "value": "user"
                  },
                  {
                    "value": "teams"
                  }
                ]
              },
              "number": {
                "type": "string",
                "description": "A phone number to call (when type is phone)"
              },
              "sipUri": {
                "type": "string",
                "description": "A SIP URI to call (when type is sip)"
              },
              "tenant": {
                "type": "string",
                "description": "Microsoft Teams customer tenant domain name (when type is teams)"
              },
              "trunk": {
                "type": "string",
                "description": "The name of the Carrier that should be used to deliver this call (when type is phone)"
              },
              "vmail": {
                "type": "boolean",
                "description": "Dial directly into user's voicemail to leave a message (MS Teams only)"
              },
              "overrideTo": {
                "type": "string",
                "description": "A SIP URI that, if provided, will be used as the To header in the outbound INVITE (not needed in most cases)"
              },
              "name": {
                "type": "string",
                "description": "The name of a registered jambonz user to call (when type is user)"
              },
              "auth": {
                "type": "object",
                "properties": {
                  "username": {
                    "type": "string",
                    "description": "The username to use for SIP authentication, if challenged"
                  },
                  "password": {
                    "type": "string",
                    "description": "The password to use for SIP authentication, if challenged"
                  }
                }
              },
              "proxy": {
                "type": "string",
                "description": "SIP Proxy to use for the outgoing INVITE"
              }
            },
            "required": [
              "type"
            ]
          },
          "headers": {
            "type": "object",
            "properties": {}
          },
          "sipRequestWithinDialogHook": {
            "type": "string",
            "description": "The sip indialog hook to receive session messages"
          },
          "speech_synthesis_vendor": {
            "type": "string",
            "description": "The vendor for Text to Speech (required if application_sid is not used)"
          },
          "speech_synthesis_language": {
            "type": "string",
            "description": "The language for Text to Speech (required if application_sid is not used)"
          },
          "speech_synthesis_voice": {
            "type": "string",
            "description": "The voice for Text to Speech (required if application_sid is not used)"
          },
          "speech_recognizer_vendor": {
            "type": "string",
            "description": "The vendor for Speech to Text (required if application_sid is not used)"
          },
          "speech_recognizer_language": {
            "type": "string",
            "description": "The language for Speech to Text (required if application_sid is not used)"
          },
          "amd": {
            "type": "object",
            "properties": {
              "actionHook": {
                "type": "string",
                "description": "Webhook to send AMD events."
              },
              "thresholdWordCount": {
                "type": "number",
                "format": "double",
                "description": "Number of spoken words in a greeting that result in an amd_machine_detected result."
              },
              "digitCount": {
                "type": "number",
                "format": "double",
                "description": "Number of digits in a greeting to trigger a amd_machine_detected result. 0 is off"
              },
              "timers": {
                "type": "object",
                "properties": {
                  "decisionTimeoutMs": {
                    "type": "number",
                    "format": "double",
                    "description": "Time in milliseconds to wait before returning amd_decision_timeout.",
                    "default": 15000
                  },
                  "greetingCompletionTimeoutMs": {
                    "type": "number",
                    "format": "double",
                    "description": "Silence in milliseconds to wait for during greeting before returning amd_machine_stopped_speaking.",
                    "default": 2000
                  },
                  "noSpeechTimeoutMs": {
                    "type": "number",
                    "format": "double",
                    "description": "Time in milliseconds to wait for speech before returning amd_no_speech_detected.",
                    "default": 5000
                  },
                  "toneTimeoutMs": {
                    "type": "number",
                    "format": "double",
                    "description": "Time in milliseconds to wait to hear a tone.",
                    "default": 20000
                  }
                }
              }
            }
          }
        },
        "required": [
          "from",
          "to"
        ]
      }
    },
    "componentsSchemas": {
      "WebhookMethod": {
        "type": "string",
        "enum": [
          {
            "value": "get"
          },
          {
            "value": "post"
          }
        ]
      },
      "Webhook": {
        "type": "object",
        "properties": {
          "webhook_sid": {
            "type": "string",
            "format": "uuid"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "method": {
            "$ref": "#/components/schemas/WebhookMethod"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "url"
        ]
      },
      "AccountsAccountSidCallsPostRequestBodyContentApplicationJsonSchemaTag": {
        "type": "object",
        "properties": {}
      },
      "TargetType": {
        "type": "string",
        "enum": [
          {
            "value": "phone"
          },
          {
            "value": "sip"
          },
          {
            "value": "user"
          },
          {
            "value": "teams"
          }
        ]
      },
      "TargetAuth": {
        "type": "object",
        "properties": {
          "username": {
            "type": "string",
            "description": "The username to use for SIP authentication, if challenged"
          },
          "password": {
            "type": "string",
            "description": "The password to use for SIP authentication, if challenged"
          }
        }
      },
      "Target": {
        "type": "object",
        "properties": {
          "type": {
            "$ref": "#/components/schemas/TargetType"
          },
          "number": {
            "type": "string",
            "description": "A phone number to call (when type is phone)"
          },
          "sipUri": {
            "type": "string",
            "description": "A SIP URI to call (when type is sip)"
          },
          "tenant": {
            "type": "string",
            "description": "Microsoft Teams customer tenant domain name (when type is teams)"
          },
          "trunk": {
            "type": "string",
            "description": "The name of the Carrier that should be used to deliver this call (when type is phone)"
          },
          "vmail": {
            "type": "boolean",
            "description": "Dial directly into user's voicemail to leave a message (MS Teams only)"
          },
          "overrideTo": {
            "type": "string",
            "description": "A SIP URI that, if provided, will be used as the To header in the outbound INVITE (not needed in most cases)"
          },
          "name": {
            "type": "string",
            "description": "The name of a registered jambonz user to call (when type is user)"
          },
          "auth": {
            "$ref": "#/components/schemas/TargetAuth"
          },
          "proxy": {
            "type": "string",
            "description": "SIP Proxy to use for the outgoing INVITE"
          }
        },
        "required": [
          "type"
        ]
      },
      "AccountsAccountSidCallsPostRequestBodyContentApplicationJsonSchemaHeaders": {
        "type": "object",
        "properties": {}
      },
      "AmdTimers": {
        "type": "object",
        "properties": {
          "decisionTimeoutMs": {
            "type": "number",
            "format": "double",
            "description": "Time in milliseconds to wait before returning amd_decision_timeout.",
            "default": 15000
          },
          "greetingCompletionTimeoutMs": {
            "type": "number",
            "format": "double",
            "description": "Silence in milliseconds to wait for during greeting before returning amd_machine_stopped_speaking.",
            "default": 2000
          },
          "noSpeechTimeoutMs": {
            "type": "number",
            "format": "double",
            "description": "Time in milliseconds to wait for speech before returning amd_no_speech_detected.",
            "default": 5000
          },
          "toneTimeoutMs": {
            "type": "number",
            "format": "double",
            "description": "Time in milliseconds to wait to hear a tone.",
            "default": 20000
          }
        }
      },
      "amd": {
        "type": "object",
        "properties": {
          "actionHook": {
            "type": "string",
            "description": "Webhook to send AMD events."
          },
          "thresholdWordCount": {
            "type": "number",
            "format": "double",
            "description": "Number of spoken words in a greeting that result in an amd_machine_detected result."
          },
          "digitCount": {
            "type": "number",
            "format": "double",
            "description": "Number of digits in a greeting to trigger a amd_machine_detected result. 0 is off"
          },
          "timers": {
            "$ref": "#/components/schemas/AmdTimers"
          }
        }
      },
      "Calls_createCall_Response_201": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string",
            "format": "uuid"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_calls_delete_call",
    "domain": "calls",
    "endpointSlug": "delete-call",
    "sourcePath": "reference/rest-call-control/calls/delete-call.mdx",
    "method": "DELETE",
    "pathTemplate": "/v1/Accounts/{AccountSid}/Calls/{CallSid}",
    "operationId": "delete-call",
    "summary": "delete a call",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "CallSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Calls_deleteCall_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_calls_get_call",
    "domain": "calls",
    "endpointSlug": "get-call",
    "sourcePath": "reference/rest-call-control/calls/get-call.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/Calls/{CallSid}",
    "operationId": "get-call",
    "summary": "retrieve a call",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "CallSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "CallCallStatus": {
        "type": "string",
        "enum": [
          {
            "value": "trying"
          },
          {
            "value": "ringing"
          },
          {
            "value": "alerting"
          },
          {
            "value": "in-progress"
          },
          {
            "value": "completed"
          },
          {
            "value": "busy"
          },
          {
            "value": "no-answer"
          },
          {
            "value": "failed"
          },
          {
            "value": "queued"
          }
        ]
      },
      "CallDirection": {
        "type": "string",
        "enum": [
          {
            "value": "inbound"
          },
          {
            "value": "outbound"
          }
        ]
      },
      "Call": {
        "type": "object",
        "properties": {
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "call_id": {
            "type": "string"
          },
          "call_sid": {
            "type": "string",
            "format": "uuid"
          },
          "call_status": {
            "$ref": "#/components/schemas/CallCallStatus"
          },
          "caller_name": {
            "type": "string"
          },
          "direction": {
            "$ref": "#/components/schemas/CallDirection"
          },
          "duration": {
            "type": "integer"
          },
          "from": {
            "type": "string"
          },
          "originating_sip_trunk_name": {
            "type": "string"
          },
          "parent_call_sid": {
            "type": "string",
            "format": "uuid"
          },
          "service_url": {
            "type": "string"
          },
          "sip_status": {
            "type": "integer"
          },
          "to": {
            "type": "string"
          }
        },
        "required": [
          "account_sid",
          "call_id",
          "call_sid",
          "call_status",
          "direction",
          "from",
          "service_url",
          "sip_status",
          "to"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_calls_get_call_count",
    "domain": "calls",
    "endpointSlug": "get-call-count",
    "sourcePath": "reference/rest-call-control/calls/get-call-count.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/CallCount",
    "operationId": "get-call-count",
    "summary": "get call count",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Calls_getCallCount_Response_200": {
        "type": "object",
        "properties": {
          "inbound": {
            "type": "number",
            "format": "double",
            "description": "Number of inbound calls to the platform"
          },
          "outbound": {
            "type": "number",
            "format": "double",
            "description": "Number of outbound calls to the platform"
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_calls_list_calls",
    "domain": "calls",
    "endpointSlug": "list-calls",
    "sourcePath": "reference/rest-call-control/calls/list-calls.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/Calls",
    "operationId": "list-calls",
    "summary": "list calls",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "direction",
        "in": "query",
        "required": false,
        "description": "call direction to retrieve",
        "schema": {
          "type": "string",
          "enum": [
            {
              "value": "inbound"
            },
            {
              "value": "outbound"
            }
          ]
        }
      },
      {
        "name": "from",
        "in": "query",
        "required": false,
        "description": "calling number to retrieve",
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "to",
        "in": "query",
        "required": false,
        "description": "called number to retrieve",
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "callStatus",
        "in": "query",
        "required": false,
        "description": "call status to retrieve",
        "schema": {
          "type": "string",
          "enum": [
            {
              "value": "trying"
            },
            {
              "value": "ringing"
            },
            {
              "value": "early-media"
            },
            {
              "value": "in-progress"
            },
            {
              "value": "completed"
            },
            {
              "value": "failed"
            },
            {
              "value": "busy"
            },
            {
              "value": "no-answer"
            },
            {
              "value": "queued"
            }
          ]
        }
      }
    ],
    "componentsSchemas": {
      "AccountsAccountSidCallsGetParametersDirection": {
        "type": "string",
        "enum": [
          {
            "value": "inbound"
          },
          {
            "value": "outbound"
          }
        ]
      },
      "AccountsAccountSidCallsGetParametersCallStatus": {
        "type": "string",
        "enum": [
          {
            "value": "trying"
          },
          {
            "value": "ringing"
          },
          {
            "value": "early-media"
          },
          {
            "value": "in-progress"
          },
          {
            "value": "completed"
          },
          {
            "value": "failed"
          },
          {
            "value": "busy"
          },
          {
            "value": "no-answer"
          },
          {
            "value": "queued"
          }
        ]
      },
      "CallCallStatus": {
        "type": "string",
        "enum": [
          {
            "value": "trying"
          },
          {
            "value": "ringing"
          },
          {
            "value": "alerting"
          },
          {
            "value": "in-progress"
          },
          {
            "value": "completed"
          },
          {
            "value": "busy"
          },
          {
            "value": "no-answer"
          },
          {
            "value": "failed"
          },
          {
            "value": "queued"
          }
        ]
      },
      "CallDirection": {
        "type": "string",
        "enum": [
          {
            "value": "inbound"
          },
          {
            "value": "outbound"
          }
        ]
      },
      "Call": {
        "type": "object",
        "properties": {
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "call_id": {
            "type": "string"
          },
          "call_sid": {
            "type": "string",
            "format": "uuid"
          },
          "call_status": {
            "$ref": "#/components/schemas/CallCallStatus"
          },
          "caller_name": {
            "type": "string"
          },
          "direction": {
            "$ref": "#/components/schemas/CallDirection"
          },
          "duration": {
            "type": "integer"
          },
          "from": {
            "type": "string"
          },
          "originating_sip_trunk_name": {
            "type": "string"
          },
          "parent_call_sid": {
            "type": "string",
            "format": "uuid"
          },
          "service_url": {
            "type": "string"
          },
          "sip_status": {
            "type": "integer"
          },
          "to": {
            "type": "string"
          }
        },
        "required": [
          "account_sid",
          "call_id",
          "call_sid",
          "call_status",
          "direction",
          "from",
          "service_url",
          "sip_status",
          "to"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_calls_update_call",
    "domain": "calls",
    "endpointSlug": "update-call",
    "sourcePath": "reference/rest-call-control/calls/update-call.mdx",
    "method": "PUT",
    "pathTemplate": "/v1/Accounts/{AccountSid}/Calls/{CallSid}",
    "operationId": "update-call",
    "summary": "update a call",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "CallSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "call_hook": {
            "type": "object",
            "properties": {
              "webhook_sid": {
                "type": "string",
                "format": "uuid"
              },
              "url": {
                "type": "string",
                "format": "url"
              },
              "method": {
                "type": "string",
                "enum": [
                  {
                    "value": "get"
                  },
                  {
                    "value": "post"
                  }
                ]
              },
              "username": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }
            },
            "required": [
              "url"
            ]
          },
          "child_call_hook": {
            "type": "object",
            "properties": {
              "webhook_sid": {
                "type": "string",
                "format": "uuid"
              },
              "url": {
                "type": "string",
                "format": "url"
              },
              "method": {
                "type": "string",
                "enum": [
                  {
                    "value": "get"
                  },
                  {
                    "value": "post"
                  }
                ]
              },
              "username": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }
            },
            "required": [
              "url"
            ]
          },
          "call_status": {
            "type": "string",
            "enum": [
              {
                "value": "completed"
              },
              {
                "value": "no-answer"
              }
            ]
          },
          "conf_mute_status": {
            "type": "string",
            "enum": [
              {
                "value": "mute"
              },
              {
                "value": "unmute"
              }
            ]
          },
          "conf_hold_status": {
            "type": "string",
            "enum": [
              {
                "value": "hold"
              },
              {
                "value": "unhold"
              }
            ]
          },
          "listen_status": {
            "type": "string",
            "enum": [
              {
                "value": "pause"
              },
              {
                "value": "silence"
              },
              {
                "value": "resume"
              }
            ]
          },
          "mute_status": {
            "type": "string",
            "enum": [
              {
                "value": "mute"
              },
              {
                "value": "unmute"
              }
            ]
          },
          "transcribe_status": {
            "type": "string",
            "enum": [
              {
                "value": "pause"
              },
              {
                "value": "resume"
              }
            ]
          },
          "whisper": {
            "oneOf": [
              {
                "type": "object",
                "properties": {
                  "verb": {
                    "type": "string",
                    "enum": [
                      {
                        "value": "say"
                      },
                      {
                        "value": "play"
                      }
                    ]
                  }
                }
              },
              {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "verb": {
                      "type": "string",
                      "enum": [
                        {
                          "value": "say"
                        },
                        {
                          "value": "play"
                        }
                      ]
                    }
                  }
                }
              }
            ]
          },
          "sip_request": {
            "type": "object",
            "properties": {
              "method": {
                "type": "string"
              },
              "content_type": {
                "type": "string"
              },
              "content": {
                "type": "string"
              },
              "headers": {
                "type": "object",
                "properties": {}
              }
            }
          },
          "record": {
            "type": "object",
            "properties": {
              "action": {
                "type": "string",
                "enum": [
                  {
                    "value": "startCallRecording"
                  },
                  {
                    "value": "stopCallRecording"
                  },
                  {
                    "value": "pauseCallRecording"
                  },
                  {
                    "value": "resumeCallRecording"
                  }
                ]
              },
              "type": {
                "type": "string",
                "enum": [
                  {
                    "value": "cloud"
                  },
                  {
                    "value": "siprec"
                  }
                ],
                "default": "siprec"
              },
              "recordingID": {
                "type": "string",
                "description": "used with startCallRecording and SIPREC"
              },
              "siprecServerURL": {
                "type": "string",
                "description": "used with startCallRecording and SIPREC"
              },
              "silence": {
                "type": "boolean",
                "description": "when pausing recording the file will be padded with silence",
                "default": false
              }
            }
          },
          "conferenceParticipantAction": {
            "type": "object",
            "properties": {
              "action": {
                "type": "string",
                "enum": [
                  {
                    "value": "tag"
                  },
                  {
                    "value": "untag"
                  },
                  {
                    "value": "coach"
                  },
                  {
                    "value": "uncoach"
                  },
                  {
                    "value": "mute"
                  },
                  {
                    "value": "unmute"
                  },
                  {
                    "value": "hold"
                  },
                  {
                    "value": "unhold"
                  }
                ]
              },
              "tag": {
                "type": "string"
              }
            }
          },
          "dtmf": {
            "type": "object",
            "properties": {
              "digit": {
                "type": "string",
                "enum": [
                  {
                    "value": "1"
                  },
                  {
                    "value": "2"
                  },
                  {
                    "value": "3"
                  },
                  {
                    "value": "4"
                  },
                  {
                    "value": "5"
                  },
                  {
                    "value": "6"
                  },
                  {
                    "value": "7"
                  },
                  {
                    "value": "8"
                  },
                  {
                    "value": "9"
                  },
                  {
                    "value": "0"
                  },
                  {
                    "value": "*"
                  },
                  {
                    "value": "#"
                  }
                ]
              },
              "duration": {
                "type": "integer",
                "description": "Duration of the tone in ms",
                "default": 250
              }
            },
            "required": [
              "digit"
            ]
          }
        }
      }
    },
    "componentsSchemas": {
      "WebhookMethod": {
        "type": "string",
        "enum": [
          {
            "value": "get"
          },
          {
            "value": "post"
          }
        ]
      },
      "Webhook": {
        "type": "object",
        "properties": {
          "webhook_sid": {
            "type": "string",
            "format": "uuid"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "method": {
            "$ref": "#/components/schemas/WebhookMethod"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "url"
        ]
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaCallStatus": {
        "type": "string",
        "enum": [
          {
            "value": "completed"
          },
          {
            "value": "no-answer"
          }
        ]
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaConfMuteStatus": {
        "type": "string",
        "enum": [
          {
            "value": "mute"
          },
          {
            "value": "unmute"
          }
        ]
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaConfHoldStatus": {
        "type": "string",
        "enum": [
          {
            "value": "hold"
          },
          {
            "value": "unhold"
          }
        ]
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaListenStatus": {
        "type": "string",
        "enum": [
          {
            "value": "pause"
          },
          {
            "value": "silence"
          },
          {
            "value": "resume"
          }
        ]
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaMuteStatus": {
        "type": "string",
        "enum": [
          {
            "value": "mute"
          },
          {
            "value": "unmute"
          }
        ]
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaTranscribeStatus": {
        "type": "string",
        "enum": [
          {
            "value": "pause"
          },
          {
            "value": "resume"
          }
        ]
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaWhisperOneOf0Verb": {
        "type": "string",
        "enum": [
          {
            "value": "say"
          },
          {
            "value": "play"
          }
        ]
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaWhisper0": {
        "type": "object",
        "properties": {
          "verb": {
            "description": "See [Say](/verbs/verbs/say) or [Play](/verbs/verbs/play) for details of the properties",
            "$ref": "#/components/schemas/AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaWhisperOneOf0Verb"
          }
        }
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaWhisperOneOf1ItemsVerb": {
        "type": "string",
        "enum": [
          {
            "value": "say"
          },
          {
            "value": "play"
          }
        ]
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaWhisperOneOf1Items": {
        "type": "object",
        "properties": {
          "verb": {
            "description": "See [Say](/verbs/verbs/say) or [Play](/verbs/verbs/play) for details of the properties",
            "$ref": "#/components/schemas/AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaWhisperOneOf1ItemsVerb"
          }
        }
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaWhisper1": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaWhisperOneOf1Items"
        }
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaWhisper": {
        "oneOf": [
          {
            "$ref": "#/components/schemas/AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaWhisper0"
          },
          {
            "$ref": "#/components/schemas/AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaWhisper1"
          }
        ]
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaSipRequestHeaders": {
        "type": "object",
        "properties": {}
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaSipRequest": {
        "type": "object",
        "properties": {
          "method": {
            "type": "string"
          },
          "content_type": {
            "type": "string"
          },
          "content": {
            "type": "string"
          },
          "headers": {
            "$ref": "#/components/schemas/AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaSipRequestHeaders"
          }
        }
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaRecordAction": {
        "type": "string",
        "enum": [
          {
            "value": "startCallRecording"
          },
          {
            "value": "stopCallRecording"
          },
          {
            "value": "pauseCallRecording"
          },
          {
            "value": "resumeCallRecording"
          }
        ]
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaRecordType": {
        "type": "string",
        "enum": [
          {
            "value": "cloud"
          },
          {
            "value": "siprec"
          }
        ],
        "default": "siprec"
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaRecord": {
        "type": "object",
        "properties": {
          "action": {
            "$ref": "#/components/schemas/AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaRecordAction"
          },
          "type": {
            "$ref": "#/components/schemas/AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaRecordType"
          },
          "recordingID": {
            "type": "string",
            "description": "used with startCallRecording and SIPREC"
          },
          "siprecServerURL": {
            "type": "string",
            "description": "used with startCallRecording and SIPREC"
          },
          "silence": {
            "type": "boolean",
            "description": "when pausing recording the file will be padded with silence",
            "default": false
          }
        }
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaConferenceParticipantActionAction": {
        "type": "string",
        "enum": [
          {
            "value": "tag"
          },
          {
            "value": "untag"
          },
          {
            "value": "coach"
          },
          {
            "value": "uncoach"
          },
          {
            "value": "mute"
          },
          {
            "value": "unmute"
          },
          {
            "value": "hold"
          },
          {
            "value": "unhold"
          }
        ]
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaConferenceParticipantAction": {
        "type": "object",
        "properties": {
          "action": {
            "$ref": "#/components/schemas/AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaConferenceParticipantActionAction"
          },
          "tag": {
            "type": "string"
          }
        }
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaDtmfDigit": {
        "type": "string",
        "enum": [
          {
            "value": "1"
          },
          {
            "value": "2"
          },
          {
            "value": "3"
          },
          {
            "value": "4"
          },
          {
            "value": "5"
          },
          {
            "value": "6"
          },
          {
            "value": "7"
          },
          {
            "value": "8"
          },
          {
            "value": "9"
          },
          {
            "value": "0"
          },
          {
            "value": "*"
          },
          {
            "value": "#"
          }
        ]
      },
      "AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaDtmf": {
        "type": "object",
        "properties": {
          "digit": {
            "description": "Single digit to send",
            "$ref": "#/components/schemas/AccountsAccountSidCallsCallSidPutRequestBodyContentApplicationJsonSchemaDtmfDigit"
          },
          "duration": {
            "type": "integer",
            "description": "Duration of the tone in ms",
            "default": 250
          }
        },
        "required": [
          "digit"
        ]
      },
      "Calls_updateCall_Response_200": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_carriers_create_carrier_for_account",
    "domain": "carriers",
    "endpointSlug": "create-carrier-for-account",
    "sourcePath": "reference/rest-platform-management/carriers/create-carrier-for-account.mdx",
    "method": "POST",
    "pathTemplate": "/v1/Accounts/{AccountSid}/VoipCarriers",
    "operationId": "create-carrier-for-account",
    "summary": "create a carrier for an account",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "e164_leading_plus": {
            "type": "boolean"
          },
          "requires_register": {
            "type": "boolean"
          },
          "register_username": {
            "type": "string"
          },
          "register_sip_realm": {
            "type": "string"
          },
          "register_password": {
            "type": "string"
          },
          "tech_prefix": {
            "type": "string"
          },
          "diversion": {
            "type": "string"
          },
          "is_active": {
            "type": "boolean"
          },
          "smpp_system_id": {
            "type": "string"
          },
          "smpp_password": {
            "type": "string"
          },
          "smpp_inbound_system_id": {
            "type": "string"
          },
          "smpp_inbound_password": {
            "type": "string"
          },
          "smpp_enquire_link_interval": {
            "type": "integer"
          },
          "trunk_type": {
            "type": "string",
            "enum": [
              {
                "value": "static_ip"
              },
              {
                "value": "auth"
              },
              {
                "value": "reg"
              }
            ],
            "default": "static_ip"
          },
          "inbound_auth_username": {
            "type": "string",
            "description": "username for an auth trunk"
          },
          "inbound_auth_password": {
            "type": "string",
            "description": "password for an auth trunk"
          }
        },
        "required": [
          "service_provider_sid",
          "name"
        ]
      }
    },
    "componentsSchemas": {
      "VoipCarrierTrunkType": {
        "type": "string",
        "enum": [
          {
            "value": "static_ip"
          },
          {
            "value": "auth"
          },
          {
            "value": "reg"
          }
        ],
        "default": "static_ip"
      },
      "VoipCarrier": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "e164_leading_plus": {
            "type": "boolean"
          },
          "requires_register": {
            "type": "boolean"
          },
          "register_username": {
            "type": "string"
          },
          "register_sip_realm": {
            "type": "string"
          },
          "register_password": {
            "type": "string"
          },
          "tech_prefix": {
            "type": "string"
          },
          "diversion": {
            "type": "string"
          },
          "is_active": {
            "type": "boolean"
          },
          "smpp_system_id": {
            "type": "string"
          },
          "smpp_password": {
            "type": "string"
          },
          "smpp_inbound_system_id": {
            "type": "string"
          },
          "smpp_inbound_password": {
            "type": "string"
          },
          "smpp_enquire_link_interval": {
            "type": "integer"
          },
          "trunk_type": {
            "description": "The type of trunk to create, see the [guide](/guides/using-the-jambonz-portal/basic-concepts/creating-carriers) for details",
            "$ref": "#/components/schemas/VoipCarrierTrunkType"
          },
          "inbound_auth_username": {
            "type": "string",
            "description": "username for an auth trunk"
          },
          "inbound_auth_password": {
            "type": "string",
            "description": "password for an auth trunk"
          }
        },
        "required": [
          "service_provider_sid",
          "name"
        ]
      },
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_carriers_create_carrier_for_service_provider",
    "domain": "carriers",
    "endpointSlug": "create-carrier-for-service-provider",
    "sourcePath": "reference/rest-platform-management/carriers/create-carrier-for-service-provider.mdx",
    "method": "POST",
    "pathTemplate": "/v1/ServiceProviders/{ServiceProviderSid}/VoipCarriers",
    "operationId": "create-carrier-for-service-provider",
    "summary": "create a carrier as a service provider",
    "parameters": [
      {
        "name": "ServiceProviderSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "e164_leading_plus": {
            "type": "boolean"
          },
          "requires_register": {
            "type": "boolean"
          },
          "register_username": {
            "type": "string"
          },
          "register_sip_realm": {
            "type": "string"
          },
          "register_password": {
            "type": "string"
          },
          "tech_prefix": {
            "type": "string"
          },
          "diversion": {
            "type": "string"
          },
          "is_active": {
            "type": "boolean"
          },
          "smpp_system_id": {
            "type": "string"
          },
          "smpp_password": {
            "type": "string"
          },
          "smpp_inbound_system_id": {
            "type": "string"
          },
          "smpp_inbound_password": {
            "type": "string"
          },
          "smpp_enquire_link_interval": {
            "type": "integer"
          },
          "trunk_type": {
            "type": "string",
            "enum": [
              {
                "value": "static_ip"
              },
              {
                "value": "auth"
              },
              {
                "value": "reg"
              }
            ],
            "default": "static_ip"
          },
          "inbound_auth_username": {
            "type": "string",
            "description": "username for an auth trunk"
          },
          "inbound_auth_password": {
            "type": "string",
            "description": "password for an auth trunk"
          }
        },
        "required": [
          "service_provider_sid",
          "name"
        ]
      }
    },
    "componentsSchemas": {
      "VoipCarrierTrunkType": {
        "type": "string",
        "enum": [
          {
            "value": "static_ip"
          },
          {
            "value": "auth"
          },
          {
            "value": "reg"
          }
        ],
        "default": "static_ip"
      },
      "VoipCarrier": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "e164_leading_plus": {
            "type": "boolean"
          },
          "requires_register": {
            "type": "boolean"
          },
          "register_username": {
            "type": "string"
          },
          "register_sip_realm": {
            "type": "string"
          },
          "register_password": {
            "type": "string"
          },
          "tech_prefix": {
            "type": "string"
          },
          "diversion": {
            "type": "string"
          },
          "is_active": {
            "type": "boolean"
          },
          "smpp_system_id": {
            "type": "string"
          },
          "smpp_password": {
            "type": "string"
          },
          "smpp_inbound_system_id": {
            "type": "string"
          },
          "smpp_inbound_password": {
            "type": "string"
          },
          "smpp_enquire_link_interval": {
            "type": "integer"
          },
          "trunk_type": {
            "description": "The type of trunk to create, see the [guide](/guides/using-the-jambonz-portal/basic-concepts/creating-carriers) for details",
            "$ref": "#/components/schemas/VoipCarrierTrunkType"
          },
          "inbound_auth_username": {
            "type": "string",
            "description": "username for an auth trunk"
          },
          "inbound_auth_password": {
            "type": "string",
            "description": "password for an auth trunk"
          }
        },
        "required": [
          "service_provider_sid",
          "name"
        ]
      },
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_carriers_create_sip_gateway",
    "domain": "carriers",
    "endpointSlug": "create-sip-gateway",
    "sourcePath": "reference/rest-platform-management/carriers/create-sip-gateway.mdx",
    "method": "POST",
    "pathTemplate": "/v1/SipGateways",
    "operationId": "create-sip-gateway",
    "summary": "create sip gateway",
    "parameters": [],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "voip_carrier_sid": {
            "type": "string",
            "format": "uuid",
            "description": "voip carrier that provides this gateway"
          },
          "ipv4": {
            "type": "string"
          },
          "netmask": {
            "type": "integer"
          },
          "port": {
            "type": "integer"
          },
          "is_active": {
            "type": "boolean"
          },
          "inbound": {
            "type": "boolean"
          },
          "outbound": {
            "type": "boolean"
          }
        },
        "required": [
          "voip_carrier_sid",
          "ipv4"
        ]
      }
    },
    "componentsSchemas": {
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_carriers_create_voip_carrier_from_template_by_sp",
    "domain": "carriers",
    "endpointSlug": "create-voip-carrier-from-template-by-sp",
    "sourcePath": "reference/rest-platform-management/carriers/create-voip-carrier-from-template-by-sp.mdx",
    "method": "POST",
    "pathTemplate": "/v1/ServiceProviders/{ServiceProviderSid}/PredefinedCarriers/{PredefinedCarrierSid}",
    "operationId": "create-voip-carrier-from-template-by-sp",
    "summary": "add a carrier to a service provider using a template",
    "parameters": [
      {
        "name": "ServiceProviderSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "PredefinedCarrierSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_carriers_delete_sip_gateway",
    "domain": "carriers",
    "endpointSlug": "delete-sip-gateway",
    "sourcePath": "reference/rest-platform-management/carriers/delete-sip-gateway.mdx",
    "method": "DELETE",
    "pathTemplate": "/v1/SipGateways/{SipGatewaySid}",
    "operationId": "delete-sip-gateway",
    "summary": "delete a sip gateway",
    "parameters": [
      {
        "name": "SipGatewaySid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Carriers_deleteSipGateway_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_carriers_delete_voip_carrier",
    "domain": "carriers",
    "endpointSlug": "delete-voip-carrier",
    "sourcePath": "reference/rest-platform-management/carriers/delete-voip-carrier.mdx",
    "method": "DELETE",
    "pathTemplate": "/v1/VoipCarriers/{VoipCarrierSid}",
    "operationId": "delete-voip-carrier",
    "summary": "delete a voip carrier",
    "parameters": [
      {
        "name": "VoipCarrierSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Carriers_deleteVoipCarrier_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_carriers_get_account_carriers",
    "domain": "carriers",
    "endpointSlug": "get-account-carriers",
    "sourcePath": "reference/rest-platform-management/carriers/get-account-carriers.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/VoipCarriers",
    "operationId": "get-account-carriers",
    "summary": "get all carriers for an account",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "VoipCarrierTrunkType": {
        "type": "string",
        "enum": [
          {
            "value": "static_ip"
          },
          {
            "value": "auth"
          },
          {
            "value": "reg"
          }
        ],
        "default": "static_ip"
      },
      "AccountsAccountSidVoipCarriersGetResponsesContentApplicationJsonSchemaItems": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "e164_leading_plus": {
            "type": "boolean"
          },
          "requires_register": {
            "type": "boolean"
          },
          "register_username": {
            "type": "string"
          },
          "register_sip_realm": {
            "type": "string"
          },
          "register_password": {
            "type": "string"
          },
          "tech_prefix": {
            "type": "string"
          },
          "diversion": {
            "type": "string"
          },
          "is_active": {
            "type": "boolean"
          },
          "smpp_system_id": {
            "type": "string"
          },
          "smpp_password": {
            "type": "string"
          },
          "smpp_inbound_system_id": {
            "type": "string"
          },
          "smpp_inbound_password": {
            "type": "string"
          },
          "smpp_enquire_link_interval": {
            "type": "integer"
          },
          "trunk_type": {
            "description": "The type of trunk to create, see the [guide](/guides/using-the-jambonz-portal/basic-concepts/creating-carriers) for details",
            "$ref": "#/components/schemas/VoipCarrierTrunkType"
          },
          "inbound_auth_username": {
            "type": "string",
            "description": "username for an auth trunk"
          },
          "inbound_auth_password": {
            "type": "string",
            "description": "password for an auth trunk"
          },
          "voip_carrier_sid": {
            "type": "string",
            "format": "uuid"
          }
        },
        "required": [
          "service_provider_sid",
          "name"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_carriers_get_service_provider_carriers",
    "domain": "carriers",
    "endpointSlug": "get-service-provider-carriers",
    "sourcePath": "reference/rest-platform-management/carriers/get-service-provider-carriers.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "GET",
    "pathTemplate": "/v1/ServiceProviders/{ServiceProviderSid}/VoipCarriers",
    "operationId": "get-service-provider-carriers",
    "summary": "get all carriers availlble to the account",
    "parameters": [
      {
        "name": "ServiceProviderSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "VoipCarrierTrunkType": {
        "type": "string",
        "enum": [
          {
            "value": "static_ip"
          },
          {
            "value": "auth"
          },
          {
            "value": "reg"
          }
        ],
        "default": "static_ip"
      },
      "VoipCarrier": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "e164_leading_plus": {
            "type": "boolean"
          },
          "requires_register": {
            "type": "boolean"
          },
          "register_username": {
            "type": "string"
          },
          "register_sip_realm": {
            "type": "string"
          },
          "register_password": {
            "type": "string"
          },
          "tech_prefix": {
            "type": "string"
          },
          "diversion": {
            "type": "string"
          },
          "is_active": {
            "type": "boolean"
          },
          "smpp_system_id": {
            "type": "string"
          },
          "smpp_password": {
            "type": "string"
          },
          "smpp_inbound_system_id": {
            "type": "string"
          },
          "smpp_inbound_password": {
            "type": "string"
          },
          "smpp_enquire_link_interval": {
            "type": "integer"
          },
          "trunk_type": {
            "description": "The type of trunk to create, see the [guide](/guides/using-the-jambonz-portal/basic-concepts/creating-carriers) for details",
            "$ref": "#/components/schemas/VoipCarrierTrunkType"
          },
          "inbound_auth_username": {
            "type": "string",
            "description": "username for an auth trunk"
          },
          "inbound_auth_password": {
            "type": "string",
            "description": "password for an auth trunk"
          }
        },
        "required": [
          "service_provider_sid",
          "name"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_carriers_get_sip_gateway",
    "domain": "carriers",
    "endpointSlug": "get-sip-gateway",
    "sourcePath": "reference/rest-platform-management/carriers/get-sip-gateway.mdx",
    "method": "GET",
    "pathTemplate": "/v1/SipGateways/{SipGatewaySid}",
    "operationId": "get-sip-gateway",
    "summary": "retrieve sip gateway",
    "parameters": [
      {
        "name": "SipGatewaySid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "SipGateway": {
        "type": "object",
        "properties": {
          "sip_gateway_sid": {
            "type": "string",
            "format": "uuid"
          },
          "ipv4": {
            "type": "string"
          },
          "port": {
            "type": "integer"
          },
          "netmask": {
            "type": "integer"
          },
          "voip_carrier_sid": {
            "type": "string",
            "format": "uuid"
          },
          "inbound": {
            "type": "boolean"
          },
          "outbound": {
            "type": "boolean"
          }
        },
        "required": [
          "sip_gateway_sid",
          "ipv4",
          "port",
          "netmask",
          "voip_carrier_sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_carriers_get_voip_carrier",
    "domain": "carriers",
    "endpointSlug": "get-voip-carrier",
    "sourcePath": "reference/rest-platform-management/carriers/get-voip-carrier.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "GET",
    "pathTemplate": "/v1/VoipCarriers/{VoipCarrierSid}",
    "operationId": "get-voip-carrier",
    "summary": "retrieve voip carrier",
    "parameters": [
      {
        "name": "VoipCarrierSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "VoipCarrierTrunkType": {
        "type": "string",
        "enum": [
          {
            "value": "static_ip"
          },
          {
            "value": "auth"
          },
          {
            "value": "reg"
          }
        ],
        "default": "static_ip"
      },
      "VoipCarrier": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "e164_leading_plus": {
            "type": "boolean"
          },
          "requires_register": {
            "type": "boolean"
          },
          "register_username": {
            "type": "string"
          },
          "register_sip_realm": {
            "type": "string"
          },
          "register_password": {
            "type": "string"
          },
          "tech_prefix": {
            "type": "string"
          },
          "diversion": {
            "type": "string"
          },
          "is_active": {
            "type": "boolean"
          },
          "smpp_system_id": {
            "type": "string"
          },
          "smpp_password": {
            "type": "string"
          },
          "smpp_inbound_system_id": {
            "type": "string"
          },
          "smpp_inbound_password": {
            "type": "string"
          },
          "smpp_enquire_link_interval": {
            "type": "integer"
          },
          "trunk_type": {
            "description": "The type of trunk to create, see the [guide](/guides/using-the-jambonz-portal/basic-concepts/creating-carriers) for details",
            "$ref": "#/components/schemas/VoipCarrierTrunkType"
          },
          "inbound_auth_username": {
            "type": "string",
            "description": "username for an auth trunk"
          },
          "inbound_auth_password": {
            "type": "string",
            "description": "password for an auth trunk"
          }
        },
        "required": [
          "service_provider_sid",
          "name"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_carriers_list_sbcs",
    "domain": "carriers",
    "endpointSlug": "list-sbcs",
    "sourcePath": "reference/rest-platform-management/carriers/list-sbcs.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Sbcs",
    "operationId": "list-sbcs",
    "summary": "retrieve public IP addresses of the jambonz SBCs",
    "parameters": [
      {
        "name": "service_provider_sid",
        "in": "query",
        "required": false,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "SbcsGetResponsesContentApplicationJsonSchemaItems": {
        "type": "object",
        "properties": {
          "ipv4": {
            "type": "string",
            "description": "ip address of one of our Sbcs"
          }
        },
        "required": [
          "ipv4"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_carriers_list_sip_gateways",
    "domain": "carriers",
    "endpointSlug": "list-sip-gateways",
    "sourcePath": "reference/rest-platform-management/carriers/list-sip-gateways.mdx",
    "method": "GET",
    "pathTemplate": "/v1/SipGateways",
    "operationId": "list-sip-gateways",
    "summary": "list sip gateways",
    "parameters": [
      {
        "name": "voip_carrier_sid",
        "in": "query",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "SipGateway": {
        "type": "object",
        "properties": {
          "sip_gateway_sid": {
            "type": "string",
            "format": "uuid"
          },
          "ipv4": {
            "type": "string"
          },
          "port": {
            "type": "integer"
          },
          "netmask": {
            "type": "integer"
          },
          "voip_carrier_sid": {
            "type": "string",
            "format": "uuid"
          },
          "inbound": {
            "type": "boolean"
          },
          "outbound": {
            "type": "boolean"
          }
        },
        "required": [
          "sip_gateway_sid",
          "ipv4",
          "port",
          "netmask",
          "voip_carrier_sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_carriers_update_sip_gateway",
    "domain": "carriers",
    "endpointSlug": "update-sip-gateway",
    "sourcePath": "reference/rest-platform-management/carriers/update-sip-gateway.mdx",
    "method": "PUT",
    "pathTemplate": "/v1/SipGateways/{SipGatewaySid}",
    "operationId": "update-sip-gateway",
    "summary": "update sip gateway",
    "parameters": [
      {
        "name": "SipGatewaySid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "sip_gateway_sid": {
            "type": "string",
            "format": "uuid"
          },
          "ipv4": {
            "type": "string"
          },
          "port": {
            "type": "integer"
          },
          "netmask": {
            "type": "integer"
          },
          "voip_carrier_sid": {
            "type": "string",
            "format": "uuid"
          },
          "inbound": {
            "type": "boolean"
          },
          "outbound": {
            "type": "boolean"
          }
        },
        "required": [
          "sip_gateway_sid",
          "ipv4",
          "port",
          "netmask",
          "voip_carrier_sid"
        ]
      }
    },
    "componentsSchemas": {
      "SipGateway": {
        "type": "object",
        "properties": {
          "sip_gateway_sid": {
            "type": "string",
            "format": "uuid"
          },
          "ipv4": {
            "type": "string"
          },
          "port": {
            "type": "integer"
          },
          "netmask": {
            "type": "integer"
          },
          "voip_carrier_sid": {
            "type": "string",
            "format": "uuid"
          },
          "inbound": {
            "type": "boolean"
          },
          "outbound": {
            "type": "boolean"
          }
        },
        "required": [
          "sip_gateway_sid",
          "ipv4",
          "port",
          "netmask",
          "voip_carrier_sid"
        ]
      },
      "Carriers_updateSipGateway_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_carriers_update_voip_carrier",
    "domain": "carriers",
    "endpointSlug": "update-voip-carrier",
    "sourcePath": "reference/rest-platform-management/carriers/update-voip-carrier.mdx",
    "method": "PUT",
    "pathTemplate": "/v1/VoipCarriers/{VoipCarrierSid}",
    "operationId": "update-voip-carrier",
    "summary": "update voip carrier",
    "parameters": [
      {
        "name": "VoipCarrierSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "e164_leading_plus": {
            "type": "boolean"
          },
          "requires_register": {
            "type": "boolean"
          },
          "register_username": {
            "type": "string"
          },
          "register_sip_realm": {
            "type": "string"
          },
          "register_password": {
            "type": "string"
          },
          "tech_prefix": {
            "type": "string"
          },
          "diversion": {
            "type": "string"
          },
          "is_active": {
            "type": "boolean"
          },
          "smpp_system_id": {
            "type": "string"
          },
          "smpp_password": {
            "type": "string"
          },
          "smpp_inbound_system_id": {
            "type": "string"
          },
          "smpp_inbound_password": {
            "type": "string"
          },
          "smpp_enquire_link_interval": {
            "type": "integer"
          },
          "trunk_type": {
            "type": "string",
            "enum": [
              {
                "value": "static_ip"
              },
              {
                "value": "auth"
              },
              {
                "value": "reg"
              }
            ],
            "default": "static_ip"
          },
          "inbound_auth_username": {
            "type": "string",
            "description": "username for an auth trunk"
          },
          "inbound_auth_password": {
            "type": "string",
            "description": "password for an auth trunk"
          }
        },
        "required": [
          "service_provider_sid",
          "name"
        ]
      }
    },
    "componentsSchemas": {
      "VoipCarrierTrunkType": {
        "type": "string",
        "enum": [
          {
            "value": "static_ip"
          },
          {
            "value": "auth"
          },
          {
            "value": "reg"
          }
        ],
        "default": "static_ip"
      },
      "VoipCarrier": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "e164_leading_plus": {
            "type": "boolean"
          },
          "requires_register": {
            "type": "boolean"
          },
          "register_username": {
            "type": "string"
          },
          "register_sip_realm": {
            "type": "string"
          },
          "register_password": {
            "type": "string"
          },
          "tech_prefix": {
            "type": "string"
          },
          "diversion": {
            "type": "string"
          },
          "is_active": {
            "type": "boolean"
          },
          "smpp_system_id": {
            "type": "string"
          },
          "smpp_password": {
            "type": "string"
          },
          "smpp_inbound_system_id": {
            "type": "string"
          },
          "smpp_inbound_password": {
            "type": "string"
          },
          "smpp_enquire_link_interval": {
            "type": "integer"
          },
          "trunk_type": {
            "description": "The type of trunk to create, see the [guide](/guides/using-the-jambonz-portal/basic-concepts/creating-carriers) for details",
            "$ref": "#/components/schemas/VoipCarrierTrunkType"
          },
          "inbound_auth_username": {
            "type": "string",
            "description": "username for an auth trunk"
          },
          "inbound_auth_password": {
            "type": "string",
            "description": "password for an auth trunk"
          }
        },
        "required": [
          "service_provider_sid",
          "name"
        ]
      },
      "Carriers_updateVoipCarrier_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_clients_create_client",
    "domain": "clients",
    "endpointSlug": "create-client",
    "sourcePath": "reference/rest-platform-management/clients/create-client.mdx",
    "method": "POST",
    "pathTemplate": "/v1/Clients",
    "operationId": "create-client",
    "summary": "Create a new client",
    "parameters": [],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          },
          "is_active": {
            "type": "string",
            "enum": [
              {
                "value": "1"
              },
              {
                "value": "0"
              }
            ]
          },
          "allow_direct_app_calling": {
            "type": "string",
            "enum": [
              {
                "value": "1"
              },
              {
                "value": "0"
              }
            ]
          },
          "allow_direct_queue_calling": {
            "type": "string",
            "enum": [
              {
                "value": "1"
              },
              {
                "value": "0"
              }
            ]
          },
          "allow_direct_user_calling": {
            "type": "string",
            "enum": [
              {
                "value": "1"
              },
              {
                "value": "0"
              }
            ]
          }
        },
        "required": [
          "account_sid",
          "username",
          "password"
        ]
      }
    },
    "componentsSchemas": {
      "ClientsPostRequestBodyContentApplicationJsonSchemaIsActive": {
        "type": "string",
        "enum": [
          {
            "value": "1"
          },
          {
            "value": "0"
          }
        ]
      },
      "ClientsPostRequestBodyContentApplicationJsonSchemaAllowDirectAppCalling": {
        "type": "string",
        "enum": [
          {
            "value": "1"
          },
          {
            "value": "0"
          }
        ]
      },
      "ClientsPostRequestBodyContentApplicationJsonSchemaAllowDirectQueueCalling": {
        "type": "string",
        "enum": [
          {
            "value": "1"
          },
          {
            "value": "0"
          }
        ]
      },
      "ClientsPostRequestBodyContentApplicationJsonSchemaAllowDirectUserCalling": {
        "type": "string",
        "enum": [
          {
            "value": "1"
          },
          {
            "value": "0"
          }
        ]
      },
      "Clients_createClient_Response_201": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string",
            "format": "uuid"
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_clients_delete_client",
    "domain": "clients",
    "endpointSlug": "delete-client",
    "sourcePath": "reference/rest-platform-management/clients/delete-client.mdx",
    "method": "DELETE",
    "pathTemplate": "/v1/Clients/{ClientSid}",
    "operationId": "delete-client",
    "summary": "delete a client",
    "parameters": [
      {
        "name": "ClientSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Clients_deleteClient_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_clients_get_client",
    "domain": "clients",
    "endpointSlug": "get-client",
    "sourcePath": "reference/rest-platform-management/clients/get-client.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "GET",
    "pathTemplate": "/v1/Clients/{ClientSid}",
    "operationId": "get-client",
    "summary": "Get a client",
    "parameters": [
      {
        "name": "ClientSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "ClientsClientSidGetResponsesContentApplicationJsonSchemaIsActive": {
        "type": "string",
        "enum": [
          {
            "value": "1"
          },
          {
            "value": "0"
          }
        ]
      },
      "ClientsClientSidGetResponsesContentApplicationJsonSchemaAllowDirectAppCalling": {
        "type": "string",
        "enum": [
          {
            "value": "1"
          },
          {
            "value": "0"
          }
        ]
      },
      "ClientsClientSidGetResponsesContentApplicationJsonSchemaAllowDirectQueueCalling": {
        "type": "string",
        "enum": [
          {
            "value": "1"
          },
          {
            "value": "0"
          }
        ]
      },
      "ClientsClientSidGetResponsesContentApplicationJsonSchemaAllowDirectUserCalling": {
        "type": "string",
        "enum": [
          {
            "value": "1"
          },
          {
            "value": "0"
          }
        ]
      },
      "Clients_getClient_Response_200": {
        "type": "object",
        "properties": {
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "client_sid": {
            "type": "string",
            "format": "uuid"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string",
            "description": "in the response the password will only show the first character with subsequnet ones replaces by an x"
          },
          "is_active": {
            "$ref": "#/components/schemas/ClientsClientSidGetResponsesContentApplicationJsonSchemaIsActive"
          },
          "allow_direct_app_calling": {
            "$ref": "#/components/schemas/ClientsClientSidGetResponsesContentApplicationJsonSchemaAllowDirectAppCalling"
          },
          "allow_direct_queue_calling": {
            "$ref": "#/components/schemas/ClientsClientSidGetResponsesContentApplicationJsonSchemaAllowDirectQueueCalling"
          },
          "allow_direct_user_calling": {
            "$ref": "#/components/schemas/ClientsClientSidGetResponsesContentApplicationJsonSchemaAllowDirectUserCalling"
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_clients_get_clients",
    "domain": "clients",
    "endpointSlug": "get-clients",
    "sourcePath": "reference/rest-platform-management/clients/get-clients.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "GET",
    "pathTemplate": "/v1/Clients",
    "operationId": "get-clients",
    "summary": "List Clients",
    "parameters": [],
    "componentsSchemas": {
      "ClientsGetResponsesContentApplicationJsonSchemaItemsIsActive": {
        "type": "string",
        "enum": [
          {
            "value": "1"
          },
          {
            "value": "0"
          }
        ]
      },
      "ClientsGetResponsesContentApplicationJsonSchemaItemsAllowDirectAppCalling": {
        "type": "string",
        "enum": [
          {
            "value": "1"
          },
          {
            "value": "0"
          }
        ]
      },
      "ClientsGetResponsesContentApplicationJsonSchemaItemsAllowDirectQueueCalling": {
        "type": "string",
        "enum": [
          {
            "value": "1"
          },
          {
            "value": "0"
          }
        ]
      },
      "ClientsGetResponsesContentApplicationJsonSchemaItemsAllowDirectUserCalling": {
        "type": "string",
        "enum": [
          {
            "value": "1"
          },
          {
            "value": "0"
          }
        ]
      },
      "ClientsGetResponsesContentApplicationJsonSchemaItems": {
        "type": "object",
        "properties": {
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "client_sid": {
            "type": "string",
            "format": "uuid"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string",
            "description": "in the response the password will only show the first character with subsequnet ones replaces by an x"
          },
          "is_active": {
            "$ref": "#/components/schemas/ClientsGetResponsesContentApplicationJsonSchemaItemsIsActive"
          },
          "allow_direct_app_calling": {
            "$ref": "#/components/schemas/ClientsGetResponsesContentApplicationJsonSchemaItemsAllowDirectAppCalling"
          },
          "allow_direct_queue_calling": {
            "$ref": "#/components/schemas/ClientsGetResponsesContentApplicationJsonSchemaItemsAllowDirectQueueCalling"
          },
          "allow_direct_user_calling": {
            "$ref": "#/components/schemas/ClientsGetResponsesContentApplicationJsonSchemaItemsAllowDirectUserCalling"
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_clients_get_registered_client",
    "domain": "clients",
    "endpointSlug": "get-registered-client",
    "sourcePath": "reference/rest-platform-management/clients/get-registered-client.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/RegisteredSipUsers/{Client}",
    "operationId": "get-registered-client",
    "summary": "retrieve registered client registration",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "Client",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "RegisteredClientProtocol": {
        "type": "string",
        "enum": [
          {
            "value": "wss"
          },
          {
            "value": "udp"
          },
          {
            "value": "tcp"
          },
          {
            "value": "tls"
          }
        ]
      },
      "RegisteredClientRegisteredStatus": {
        "type": "string",
        "enum": [
          {
            "value": "active"
          },
          {
            "value": "inactive"
          }
        ]
      },
      "RegisteredClient": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "the client username"
          },
          "contact": {
            "type": "string",
            "description": "The value in the contact header of the registration"
          },
          "expiryTime": {
            "type": "integer",
            "description": "The timestamp (in ms since 00:00:00.000 01/01/1970) that the current registraion will expire"
          },
          "protocol": {
            "$ref": "#/components/schemas/RegisteredClientProtocol"
          },
          "allow_direct_app_calling": {
            "type": "integer",
            "description": "set to 1 if client is allowed to call app sids directly"
          },
          "allow_direct_queue_calling": {
            "type": "integer",
            "description": "set to 1 if client is allowed to dial into queues to dequeue calls"
          },
          "allow_direct_user_calling": {
            "type": "integer",
            "description": "set to 1 if client is allowed to call other users by name directly."
          },
          "registered_status": {
            "description": "if there is a current registered session from the client",
            "$ref": "#/components/schemas/RegisteredClientRegisteredStatus"
          },
          "proxy": {
            "type": "string",
            "description": "The source IP and Port used for the registration request."
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_clients_list_registered_sip_users",
    "domain": "clients",
    "endpointSlug": "list-registered-sip-users",
    "sourcePath": "reference/rest-platform-management/clients/list-registered-sip-users.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/RegisteredSipUsers",
    "operationId": "list-registered-sip-users",
    "summary": "retrieve online sip users for an account",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {}
  },
  {
    "toolName": "jambonz_clients_list_registered_sip_users_by_username",
    "domain": "clients",
    "endpointSlug": "list-registered-sip-users-by-username",
    "sourcePath": "reference/rest-platform-management/clients/list-registered-sip-users-by-username.mdx",
    "method": "POST",
    "pathTemplate": "/v1/Accounts/{AccountSid}/RegisteredSipUsers",
    "operationId": "list-registered-sip-users-by-username",
    "summary": "retrieve online sip users for an account by list of sip username",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "array",
        "items": {
          "type": "string"
        }
      }
    },
    "componentsSchemas": {
      "RegisteredClientProtocol": {
        "type": "string",
        "enum": [
          {
            "value": "wss"
          },
          {
            "value": "udp"
          },
          {
            "value": "tcp"
          },
          {
            "value": "tls"
          }
        ]
      },
      "RegisteredClientRegisteredStatus": {
        "type": "string",
        "enum": [
          {
            "value": "active"
          },
          {
            "value": "inactive"
          }
        ]
      },
      "RegisteredClient": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "the client username"
          },
          "contact": {
            "type": "string",
            "description": "The value in the contact header of the registration"
          },
          "expiryTime": {
            "type": "integer",
            "description": "The timestamp (in ms since 00:00:00.000 01/01/1970) that the current registraion will expire"
          },
          "protocol": {
            "$ref": "#/components/schemas/RegisteredClientProtocol"
          },
          "allow_direct_app_calling": {
            "type": "integer",
            "description": "set to 1 if client is allowed to call app sids directly"
          },
          "allow_direct_queue_calling": {
            "type": "integer",
            "description": "set to 1 if client is allowed to dial into queues to dequeue calls"
          },
          "allow_direct_user_calling": {
            "type": "integer",
            "description": "set to 1 if client is allowed to call other users by name directly."
          },
          "registered_status": {
            "description": "if there is a current registered session from the client",
            "$ref": "#/components/schemas/RegisteredClientRegisteredStatus"
          },
          "proxy": {
            "type": "string",
            "description": "The source IP and Port used for the registration request."
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_clients_update_client",
    "domain": "clients",
    "endpointSlug": "update-client",
    "sourcePath": "reference/rest-platform-management/clients/update-client.mdx",
    "method": "PUT",
    "pathTemplate": "/v1/Clients/{ClientSid}",
    "operationId": "update-client",
    "summary": "Update a client",
    "parameters": [
      {
        "name": "ClientSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "is_active": {
            "type": "string",
            "enum": [
              {
                "value": "1"
              },
              {
                "value": "0"
              }
            ]
          },
          "allow_direct_app_calling": {
            "type": "string",
            "enum": [
              {
                "value": "1"
              },
              {
                "value": "0"
              }
            ]
          },
          "allow_direct_queue_calling": {
            "type": "string",
            "enum": [
              {
                "value": "1"
              },
              {
                "value": "0"
              }
            ]
          },
          "allow_direct_user_calling": {
            "type": "string",
            "enum": [
              {
                "value": "1"
              },
              {
                "value": "0"
              }
            ]
          }
        }
      }
    },
    "componentsSchemas": {
      "ClientsClientSidPutRequestBodyContentApplicationJsonSchemaIsActive": {
        "type": "string",
        "enum": [
          {
            "value": "1"
          },
          {
            "value": "0"
          }
        ]
      },
      "ClientsClientSidPutRequestBodyContentApplicationJsonSchemaAllowDirectAppCalling": {
        "type": "string",
        "enum": [
          {
            "value": "1"
          },
          {
            "value": "0"
          }
        ]
      },
      "ClientsClientSidPutRequestBodyContentApplicationJsonSchemaAllowDirectQueueCalling": {
        "type": "string",
        "enum": [
          {
            "value": "1"
          },
          {
            "value": "0"
          }
        ]
      },
      "ClientsClientSidPutRequestBodyContentApplicationJsonSchemaAllowDirectUserCalling": {
        "type": "string",
        "enum": [
          {
            "value": "1"
          },
          {
            "value": "0"
          }
        ]
      },
      "Clients_updateClient_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_conferences_list_conferences",
    "domain": "conferences",
    "endpointSlug": "list-conferences",
    "sourcePath": "reference/rest-call-control/conferences/list-conferences.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/Conferences",
    "operationId": "list-conferences",
    "summary": "list conferences",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {}
  },
  {
    "toolName": "jambonz_phone_numbers_delete_phone_number",
    "domain": "phone-numbers",
    "endpointSlug": "delete-phone-number",
    "sourcePath": "reference/rest-platform-management/phone-numbers/delete-phone-number.mdx",
    "method": "DELETE",
    "pathTemplate": "/v1/PhoneNumbers/{PhoneNumberSid}",
    "operationId": "delete-phone-number",
    "summary": "delete a phone number",
    "parameters": [
      {
        "name": "PhoneNumberSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Phone Numbers_deletePhoneNumber_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_phone_numbers_get_phone_number",
    "domain": "phone-numbers",
    "endpointSlug": "get-phone-number",
    "sourcePath": "reference/rest-platform-management/phone-numbers/get-phone-number.mdx",
    "method": "GET",
    "pathTemplate": "/v1/PhoneNumbers/{PhoneNumberSid}",
    "operationId": "get-phone-number",
    "summary": "retrieve phone number",
    "parameters": [
      {
        "name": "PhoneNumberSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "PhoneNumber": {
        "type": "object",
        "properties": {
          "phone_number_sid": {
            "type": "string",
            "format": "uuid"
          },
          "number": {
            "type": "string"
          },
          "voip_carrier_sid": {
            "type": "string",
            "format": "uuid"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          }
        },
        "required": [
          "phone_number_sid",
          "number",
          "voip_carrier_sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_phone_numbers_list_provisioned_phone_numbers",
    "domain": "phone-numbers",
    "endpointSlug": "list-provisioned-phone-numbers",
    "sourcePath": "reference/rest-platform-management/phone-numbers/list-provisioned-phone-numbers.mdx",
    "method": "GET",
    "pathTemplate": "/v1/PhoneNumbers",
    "operationId": "list-provisioned-phone-numbers",
    "summary": "list phone numbers",
    "parameters": [],
    "componentsSchemas": {
      "PhoneNumber": {
        "type": "object",
        "properties": {
          "phone_number_sid": {
            "type": "string",
            "format": "uuid"
          },
          "number": {
            "type": "string"
          },
          "voip_carrier_sid": {
            "type": "string",
            "format": "uuid"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          }
        },
        "required": [
          "phone_number_sid",
          "number",
          "voip_carrier_sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_phone_numbers_provision_phone_number",
    "domain": "phone-numbers",
    "endpointSlug": "provision-phone-number",
    "sourcePath": "reference/rest-platform-management/phone-numbers/provision-phone-number.mdx",
    "method": "POST",
    "pathTemplate": "/v1/PhoneNumbers",
    "operationId": "provision-phone-number",
    "summary": "provision a phone number into inventory from a Voip Carrier",
    "parameters": [],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "number": {
            "type": "string",
            "description": "telephone number"
          },
          "voip_carrier_sid": {
            "type": "string",
            "format": "uuid"
          }
        },
        "required": [
          "number",
          "voip_carrier_sid"
        ]
      }
    },
    "componentsSchemas": {
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_phone_numbers_update_phone_number",
    "domain": "phone-numbers",
    "endpointSlug": "update-phone-number",
    "sourcePath": "reference/rest-platform-management/phone-numbers/update-phone-number.mdx",
    "method": "PUT",
    "pathTemplate": "/v1/PhoneNumbers/{PhoneNumberSid}",
    "operationId": "update-phone-number",
    "summary": "update phone number",
    "parameters": [
      {
        "name": "PhoneNumberSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "phone_number_sid": {
            "type": "string",
            "format": "uuid"
          },
          "number": {
            "type": "string"
          },
          "voip_carrier_sid": {
            "type": "string",
            "format": "uuid"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          }
        },
        "required": [
          "phone_number_sid",
          "number",
          "voip_carrier_sid"
        ]
      }
    },
    "componentsSchemas": {
      "PhoneNumber": {
        "type": "object",
        "properties": {
          "phone_number_sid": {
            "type": "string",
            "format": "uuid"
          },
          "number": {
            "type": "string"
          },
          "voip_carrier_sid": {
            "type": "string",
            "format": "uuid"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          }
        },
        "required": [
          "phone_number_sid",
          "number",
          "voip_carrier_sid"
        ]
      },
      "Phone Numbers_updatePhoneNumber_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_queues_list_queues",
    "domain": "queues",
    "endpointSlug": "list-queues",
    "sourcePath": "reference/rest-call-control/queues/list-queues.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/Queues",
    "operationId": "list-queues",
    "summary": "retrieve active queues for an account",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "AccountsAccountSidQueuesGetResponsesContentApplicationJsonSchemaItems": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "length": {
            "type": "string"
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_recent_calls_get_recent_call_recording",
    "domain": "recent-calls",
    "endpointSlug": "get-recent-call-recording",
    "sourcePath": "reference/rest-platform-management/recent-calls/get-recent-call-recording.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/RecentCalls/{CallSid}/record/{YYYY}/{MM}/{DD}/{FORMAT}",
    "operationId": "get-recent-call-recording",
    "summary": "retrieve recording for a call",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "CallSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "YYYY",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "MM",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "DD",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "FORMAT",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Recent Calls_getRecentCallRecording_Response_200": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_recent_calls_get_recent_call_trace",
    "domain": "recent-calls",
    "endpointSlug": "get-recent-call-trace",
    "sourcePath": "reference/rest-platform-management/recent-calls/get-recent-call-trace.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/RecentCalls/trace/{CallId}",
    "operationId": "get-recent-call-trace",
    "summary": "retrieve jaeger trace detail for a call",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "CallId",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Recent Calls_getRecentCallTrace_Response_200": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_recent_calls_get_recent_call_trace_by_account",
    "domain": "recent-calls",
    "endpointSlug": "get-recent-call-trace-by-account",
    "sourcePath": "reference/rest-platform-management/recent-calls/get-recent-call-trace-by-account.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/RecentCalls/{CallId}/pcap",
    "operationId": "get-recent-call-trace-by-account",
    "summary": "retrieve pcap for a call",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "CallId",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Recent Calls_getRecentCallTraceByAccount_Response_200": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_recent_calls_list_recent_calls",
    "domain": "recent-calls",
    "endpointSlug": "list-recent-calls",
    "sourcePath": "reference/rest-platform-management/recent-calls/list-recent-calls.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/RecentCalls",
    "operationId": "list-recent-calls",
    "summary": "retrieve recent calls for an account",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      {
        "name": "page",
        "in": "query",
        "required": true,
        "schema": {
          "type": "integer"
        }
      },
      {
        "name": "count",
        "in": "query",
        "required": true,
        "schema": {
          "type": "integer"
        }
      },
      {
        "name": "days",
        "in": "query",
        "required": false,
        "schema": {
          "type": "integer"
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "schema": {
          "type": "string",
          "format": "date-time"
        }
      },
      {
        "name": "end",
        "in": "query",
        "required": false,
        "schema": {
          "type": "string",
          "format": "date-time"
        }
      },
      {
        "name": "answered",
        "in": "query",
        "required": false,
        "schema": {
          "type": "string",
          "enum": [
            {
              "value": "true"
            },
            {
              "value": "false"
            }
          ]
        }
      },
      {
        "name": "direction",
        "in": "query",
        "required": false,
        "schema": {
          "type": "string",
          "enum": [
            {
              "value": "inbound"
            },
            {
              "value": "outbound"
            }
          ]
        }
      },
      {
        "name": "filter",
        "in": "query",
        "required": false,
        "description": "Filter value can be caller ID, callee ID or call Sid",
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "AccountsAccountSidRecentCallsGetParametersAnswered": {
        "type": "string",
        "enum": [
          {
            "value": "true"
          },
          {
            "value": "false"
          }
        ]
      },
      "AccountsAccountSidRecentCallsGetParametersDirection": {
        "type": "string",
        "enum": [
          {
            "value": "inbound"
          },
          {
            "value": "outbound"
          }
        ]
      },
      "AccountsAccountSidRecentCallsGetResponsesContentApplicationJsonSchemaDataItemsDirection": {
        "type": "string",
        "enum": [
          {
            "value": "inbound"
          },
          {
            "value": "outbound"
          }
        ]
      },
      "AccountsAccountSidRecentCallsGetResponsesContentApplicationJsonSchemaDataItems": {
        "type": "object",
        "properties": {
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "call_sid": {
            "type": "string",
            "format": "uuid"
          },
          "from": {
            "type": "string"
          },
          "to": {
            "type": "string"
          },
          "answered": {
            "type": "boolean"
          },
          "sip_call_id": {
            "type": "string"
          },
          "sip_status": {
            "type": "integer"
          },
          "duration": {
            "type": "integer"
          },
          "attempted_at": {
            "type": "integer"
          },
          "answered_at": {
            "type": "integer"
          },
          "terminated_at": {
            "type": "integer"
          },
          "termination_reason": {
            "type": "string"
          },
          "host": {
            "type": "string"
          },
          "remote_host": {
            "type": "string"
          },
          "direction": {
            "$ref": "#/components/schemas/AccountsAccountSidRecentCallsGetResponsesContentApplicationJsonSchemaDataItemsDirection"
          },
          "trunk": {
            "type": "string"
          }
        },
        "required": [
          "account_sid",
          "call_sid",
          "from",
          "to",
          "answered",
          "sip_status",
          "duration",
          "attempted_at",
          "terminated_at",
          "direction"
        ]
      },
      "Recent Calls_listRecentCalls_Response_200": {
        "type": "object",
        "properties": {
          "total": {
            "type": "integer",
            "description": "total number of records in that database that match the filter criteria"
          },
          "batch": {
            "type": "integer",
            "description": "total number of records returned in this page set"
          },
          "page": {
            "type": "integer",
            "description": "page number that was requested, and is being returned"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AccountsAccountSidRecentCallsGetResponsesContentApplicationJsonSchemaDataItems"
            }
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_service_providers_add_limit_for_service_provider",
    "domain": "service-providers",
    "endpointSlug": "add-limit-for-service-provider",
    "sourcePath": "reference/rest-platform-management/service-providers/add-limit-for-service-provider.mdx",
    "method": "POST",
    "pathTemplate": "/v1/ServiceProviders/{ServiceProviderSid}/Limits",
    "operationId": "add-limit-for-service-provider",
    "summary": "create a limit for a service provider",
    "parameters": [
      {
        "name": "ServiceProviderSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "category": {
            "type": "string",
            "enum": [
              {
                "value": "voice_call_session"
              },
              {
                "value": "api_limit"
              },
              {
                "value": "devices"
              }
            ]
          }
        }
      }
    },
    "componentsSchemas": {
      "LimitsCategory": {
        "type": "string",
        "enum": [
          {
            "value": "voice_call_session"
          },
          {
            "value": "api_limit"
          },
          {
            "value": "devices"
          }
        ]
      },
      "Limits": {
        "type": "object",
        "properties": {
          "category": {
            "$ref": "#/components/schemas/LimitsCategory"
          }
        }
      },
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_service_providers_create_service_provider",
    "domain": "service-providers",
    "endpointSlug": "create-service-provider",
    "sourcePath": "reference/rest-platform-management/service-providers/create-service-provider.mdx",
    "method": "POST",
    "pathTemplate": "/v1/ServiceProviders",
    "operationId": "create-service-provider",
    "summary": "create service provider",
    "parameters": [],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "service provider name"
          },
          "description": {
            "type": "string"
          },
          "root_domain": {
            "type": "string",
            "description": "root domain for group of accounts that share a registration hook"
          },
          "registration_hook": {
            "type": "object",
            "properties": {
              "webhook_sid": {
                "type": "string",
                "format": "uuid"
              },
              "url": {
                "type": "string",
                "format": "url"
              },
              "method": {
                "type": "string",
                "enum": [
                  {
                    "value": "get"
                  },
                  {
                    "value": "post"
                  }
                ]
              },
              "username": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }
            },
            "required": [
              "url"
            ]
          },
          "ms_teams_fqdn": {
            "type": "string",
            "description": "SBC domain name for Microsoft Teams"
          }
        },
        "required": [
          "name"
        ]
      }
    },
    "componentsSchemas": {
      "WebhookMethod": {
        "type": "string",
        "enum": [
          {
            "value": "get"
          },
          {
            "value": "post"
          }
        ]
      },
      "Webhook": {
        "type": "object",
        "properties": {
          "webhook_sid": {
            "type": "string",
            "format": "uuid"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "method": {
            "$ref": "#/components/schemas/WebhookMethod"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "url"
        ]
      },
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_service_providers_delete_service_provider",
    "domain": "service-providers",
    "endpointSlug": "delete-service-provider",
    "sourcePath": "reference/rest-platform-management/service-providers/delete-service-provider.mdx",
    "method": "DELETE",
    "pathTemplate": "/v1/ServiceProviders/{ServiceProviderSid}",
    "operationId": "delete-service-provider",
    "summary": "delete a service provider",
    "parameters": [
      {
        "name": "ServiceProviderSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Service Providers_deleteServiceProvider_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_service_providers_get_service_provider",
    "domain": "service-providers",
    "endpointSlug": "get-service-provider",
    "sourcePath": "reference/rest-platform-management/service-providers/get-service-provider.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "GET",
    "pathTemplate": "/v1/ServiceProviders/{ServiceProviderSid}",
    "operationId": "get-service-provider",
    "summary": "retrieve service provider",
    "parameters": [
      {
        "name": "ServiceProviderSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "WebhookMethod": {
        "type": "string",
        "enum": [
          {
            "value": "get"
          },
          {
            "value": "post"
          }
        ]
      },
      "Webhook": {
        "type": "object",
        "properties": {
          "webhook_sid": {
            "type": "string",
            "format": "uuid"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "method": {
            "$ref": "#/components/schemas/WebhookMethod"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "url"
        ]
      },
      "ServiceProvider": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "root_domain": {
            "type": "string"
          },
          "registration_hook": {
            "description": "authentication webhook for registration",
            "$ref": "#/components/schemas/Webhook"
          },
          "ms_teams_fqdn": {
            "type": "string"
          },
          "test_number": {
            "type": "string",
            "description": "used for inbound testing for accounts on free plan"
          },
          "test_application_name": {
            "type": "string",
            "description": "name of test application that can be used for new signups"
          },
          "test_application_sid": {
            "type": "string",
            "description": "identifies test application that can be used for new signups"
          }
        },
        "required": [
          "service_provider_sid",
          "name"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_service_providers_get_service_provider_accounts",
    "domain": "service-providers",
    "endpointSlug": "get-service-provider-accounts",
    "sourcePath": "reference/rest-platform-management/service-providers/get-service-provider-accounts.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "GET",
    "pathTemplate": "/v1/ServiceProviders/{ServiceProviderSid}/Accounts",
    "operationId": "get-service-provider-accounts",
    "summary": "get all accounts for a service provider",
    "parameters": [
      {
        "name": "ServiceProviderSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "WebhookMethod": {
        "type": "string",
        "enum": [
          {
            "value": "get"
          },
          {
            "value": "post"
          }
        ]
      },
      "Webhook": {
        "type": "object",
        "properties": {
          "webhook_sid": {
            "type": "string",
            "format": "uuid"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "method": {
            "$ref": "#/components/schemas/WebhookMethod"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "url"
        ]
      },
      "AccountRecordFormat": {
        "type": "string",
        "enum": [
          {
            "value": "wav"
          },
          {
            "value": "mp3"
          }
        ]
      },
      "AccountBucketCredentialVendor": {
        "type": "string",
        "enum": [
          {
            "value": "aws_s3"
          },
          {
            "value": "s3_compatible"
          },
          {
            "value": "azure"
          },
          {
            "value": "google"
          }
        ]
      },
      "AccountBucketCredential": {
        "type": "object",
        "properties": {
          "vendor": {
            "$ref": "#/components/schemas/AccountBucketCredentialVendor"
          },
          "region": {
            "type": "string"
          },
          "name": {
            "type": "string",
            "description": "name of the bucket"
          },
          "access_key_id": {
            "type": "string"
          },
          "secret_access_key": {
            "type": "string"
          }
        }
      },
      "Account": {
        "type": "object",
        "properties": {
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "sip_realm": {
            "type": "string"
          },
          "registration_hook": {
            "description": "authentication webhook for registration",
            "$ref": "#/components/schemas/Webhook"
          },
          "device_calling_application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "record_all_calls": {
            "type": "boolean"
          },
          "record_format": {
            "$ref": "#/components/schemas/AccountRecordFormat"
          },
          "bucket_credential": {
            "description": "Credentials for recording storage",
            "$ref": "#/components/schemas/AccountBucketCredential"
          }
        },
        "required": [
          "account_sid",
          "name",
          "service_provider_sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_service_providers_get_service_provider_limits",
    "domain": "service-providers",
    "endpointSlug": "get-service-provider-limits",
    "sourcePath": "reference/rest-platform-management/service-providers/get-service-provider-limits.mdx",
    "method": "GET",
    "pathTemplate": "/v1/ServiceProviders/{ServiceProviderSid}/Limits",
    "operationId": "get-service-provider-limits",
    "summary": "retrieve call capacity and other limits from the service provider",
    "parameters": [
      {
        "name": "ServiceProviderSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "componentsSchemas": {
      "LimitsCategory": {
        "type": "string",
        "enum": [
          {
            "value": "voice_call_session"
          },
          {
            "value": "api_limit"
          },
          {
            "value": "devices"
          }
        ]
      },
      "Limits": {
        "type": "object",
        "properties": {
          "category": {
            "$ref": "#/components/schemas/LimitsCategory"
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_service_providers_list_service_providers",
    "domain": "service-providers",
    "endpointSlug": "list-service-providers",
    "sourcePath": "reference/rest-platform-management/service-providers/list-service-providers.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "GET",
    "pathTemplate": "/v1/ServiceProviders",
    "operationId": "list-service-providers",
    "summary": "list service providers",
    "parameters": [],
    "componentsSchemas": {
      "WebhookMethod": {
        "type": "string",
        "enum": [
          {
            "value": "get"
          },
          {
            "value": "post"
          }
        ]
      },
      "Webhook": {
        "type": "object",
        "properties": {
          "webhook_sid": {
            "type": "string",
            "format": "uuid"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "method": {
            "$ref": "#/components/schemas/WebhookMethod"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "url"
        ]
      },
      "ServiceProvider": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "root_domain": {
            "type": "string"
          },
          "registration_hook": {
            "description": "authentication webhook for registration",
            "$ref": "#/components/schemas/Webhook"
          },
          "ms_teams_fqdn": {
            "type": "string"
          },
          "test_number": {
            "type": "string",
            "description": "used for inbound testing for accounts on free plan"
          },
          "test_application_name": {
            "type": "string",
            "description": "name of test application that can be used for new signups"
          },
          "test_application_sid": {
            "type": "string",
            "description": "identifies test application that can be used for new signups"
          }
        },
        "required": [
          "service_provider_sid",
          "name"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_service_providers_update_service_provider",
    "domain": "service-providers",
    "endpointSlug": "update-service-provider",
    "sourcePath": "reference/rest-platform-management/service-providers/update-service-provider.mdx",
    "method": "PUT",
    "pathTemplate": "/v1/ServiceProviders/{ServiceProviderSid}",
    "operationId": "update-service-provider",
    "summary": "update service provider",
    "parameters": [
      {
        "name": "ServiceProviderSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "root_domain": {
            "type": "string"
          },
          "registration_hook": {
            "type": "object",
            "properties": {
              "webhook_sid": {
                "type": "string",
                "format": "uuid"
              },
              "url": {
                "type": "string",
                "format": "url"
              },
              "method": {
                "type": "string",
                "enum": [
                  {
                    "value": "get"
                  },
                  {
                    "value": "post"
                  }
                ]
              },
              "username": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }
            },
            "required": [
              "url"
            ]
          },
          "ms_teams_fqdn": {
            "type": "string"
          },
          "test_number": {
            "type": "string",
            "description": "used for inbound testing for accounts on free plan"
          },
          "test_application_name": {
            "type": "string",
            "description": "name of test application that can be used for new signups"
          },
          "test_application_sid": {
            "type": "string",
            "description": "identifies test application that can be used for new signups"
          }
        },
        "required": [
          "service_provider_sid",
          "name"
        ]
      }
    },
    "componentsSchemas": {
      "WebhookMethod": {
        "type": "string",
        "enum": [
          {
            "value": "get"
          },
          {
            "value": "post"
          }
        ]
      },
      "Webhook": {
        "type": "object",
        "properties": {
          "webhook_sid": {
            "type": "string",
            "format": "uuid"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "method": {
            "$ref": "#/components/schemas/WebhookMethod"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "url"
        ]
      },
      "ServiceProvider": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "root_domain": {
            "type": "string"
          },
          "registration_hook": {
            "description": "authentication webhook for registration",
            "$ref": "#/components/schemas/Webhook"
          },
          "ms_teams_fqdn": {
            "type": "string"
          },
          "test_number": {
            "type": "string",
            "description": "used for inbound testing for accounts on free plan"
          },
          "test_application_name": {
            "type": "string",
            "description": "name of test application that can be used for new signups"
          },
          "test_application_sid": {
            "type": "string",
            "description": "identifies test application that can be used for new signups"
          }
        },
        "required": [
          "service_provider_sid",
          "name"
        ]
      },
      "Service Providers_updateServiceProvider_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_settings_create_ms_teams_tenant",
    "domain": "settings",
    "endpointSlug": "create-ms-teams-tenant",
    "sourcePath": "reference/rest-platform-management/settings/create-ms-teams-tenant.mdx",
    "method": "POST",
    "pathTemplate": "/v1/MicrosoftTeamsTenants",
    "operationId": "create-ms-teams-tenant",
    "summary": "provision a customer tenant for MS Teams",
    "parameters": [],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "tenant_fqdn": {
            "type": "string"
          }
        },
        "required": [
          "service_provider_sid",
          "tenant_fqdn"
        ]
      }
    },
    "componentsSchemas": {
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_settings_delete_tenant",
    "domain": "settings",
    "endpointSlug": "delete-tenant",
    "sourcePath": "reference/rest-platform-management/settings/delete-tenant.mdx",
    "method": "DELETE",
    "pathTemplate": "/v1/MicrosoftTeamsTenants/{TenantSid}",
    "operationId": "delete-tenant",
    "summary": "delete an MS Teams tenant",
    "parameters": [
      {
        "name": "TenantSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Settings_deleteTenant_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_settings_get_tenant",
    "domain": "settings",
    "endpointSlug": "get-tenant",
    "sourcePath": "reference/rest-platform-management/settings/get-tenant.mdx",
    "method": "GET",
    "pathTemplate": "/v1/MicrosoftTeamsTenants/{TenantSid}",
    "operationId": "get-tenant",
    "summary": "retrieve an MS Teams tenant",
    "parameters": [
      {
        "name": "TenantSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "MsTeamsTenant": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "tenant_fqdn": {
            "type": "string"
          }
        },
        "required": [
          "service_provider_sid",
          "tenant_fqdn"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_settings_list_ms_teams_tenants",
    "domain": "settings",
    "endpointSlug": "list-ms-teams-tenants",
    "sourcePath": "reference/rest-platform-management/settings/list-ms-teams-tenants.mdx",
    "method": "GET",
    "pathTemplate": "/v1/MicrosoftTeamsTenants",
    "operationId": "list-ms-teams-tenants",
    "summary": "list MS Teams tenants",
    "parameters": [],
    "componentsSchemas": {
      "MsTeamsTenant": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "tenant_fqdn": {
            "type": "string"
          }
        },
        "required": [
          "service_provider_sid",
          "tenant_fqdn"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_settings_put_tenant",
    "domain": "settings",
    "endpointSlug": "put-tenant",
    "sourcePath": "reference/rest-platform-management/settings/put-tenant.mdx",
    "method": "PUT",
    "pathTemplate": "/v1/MicrosoftTeamsTenants/{TenantSid}",
    "operationId": "put-tenant",
    "summary": "update an MS Teams tenant",
    "parameters": [
      {
        "name": "TenantSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "tenant_fqdn": {
            "type": "string"
          }
        },
        "required": [
          "service_provider_sid",
          "tenant_fqdn"
        ]
      }
    },
    "componentsSchemas": {
      "MsTeamsTenant": {
        "type": "object",
        "properties": {
          "service_provider_sid": {
            "type": "string",
            "format": "uuid"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "application_sid": {
            "type": "string",
            "format": "uuid"
          },
          "tenant_fqdn": {
            "type": "string"
          }
        },
        "required": [
          "service_provider_sid",
          "tenant_fqdn"
        ]
      },
      "Settings_putTenant_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_speech_add_speech_credential_for_seervice_provider",
    "domain": "speech",
    "endpointSlug": "add-speech-credential-for-seervice-provider",
    "sourcePath": "reference/rest-platform-management/speech/add-speech-credential-for-seervice-provider.mdx",
    "method": "POST",
    "pathTemplate": "/v1/ServiceProviders/{ServiceProviderSid}/SpeechCredentials",
    "operationId": "add-speech-credential-for-seervice-provider",
    "summary": "create a speech credential for a service provider",
    "parameters": [
      {
        "name": "ServiceProviderSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "speech_credential_sid": {
            "type": "string",
            "format": "uuid"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "vendor": {
            "type": "string",
            "enum": [
              {
                "value": "google"
              },
              {
                "value": "aws"
              }
            ]
          },
          "service_key": {
            "type": "string"
          },
          "access_key_id": {
            "type": "string"
          },
          "secret_access_key": {
            "type": "string"
          },
          "aws_region": {
            "type": "string"
          },
          "last_used": {
            "type": "string",
            "format": "date-time"
          },
          "last_tested": {
            "type": "string",
            "format": "date-time"
          },
          "use_for_tts": {
            "type": "boolean"
          },
          "use_for_stt": {
            "type": "boolean"
          },
          "tts_tested_ok": {
            "type": "boolean"
          },
          "stt_tested_ok": {
            "type": "boolean"
          },
          "riva_server_uri": {
            "type": "string"
          }
        }
      }
    },
    "componentsSchemas": {
      "SpeechCredentialVendor": {
        "type": "string",
        "enum": [
          {
            "value": "google"
          },
          {
            "value": "aws"
          }
        ]
      },
      "SpeechCredential": {
        "type": "object",
        "properties": {
          "speech_credential_sid": {
            "type": "string",
            "format": "uuid"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "vendor": {
            "$ref": "#/components/schemas/SpeechCredentialVendor"
          },
          "service_key": {
            "type": "string"
          },
          "access_key_id": {
            "type": "string"
          },
          "secret_access_key": {
            "type": "string"
          },
          "aws_region": {
            "type": "string"
          },
          "last_used": {
            "type": "string",
            "format": "date-time"
          },
          "last_tested": {
            "type": "string",
            "format": "date-time"
          },
          "use_for_tts": {
            "type": "boolean"
          },
          "use_for_stt": {
            "type": "boolean"
          },
          "tts_tested_ok": {
            "type": "boolean"
          },
          "stt_tested_ok": {
            "type": "boolean"
          },
          "riva_server_uri": {
            "type": "string"
          }
        }
      },
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_speech_create_google_custom_voice",
    "domain": "speech",
    "endpointSlug": "create-google-custom-voice",
    "sourcePath": "reference/rest-platform-management/speech/create-google-custom-voice.mdx",
    "method": "POST",
    "pathTemplate": "/v1/GoogleCustomVoices",
    "operationId": "create-google-custom-voice",
    "summary": "create a Google custom voice",
    "parameters": [],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "speech_credential_sid": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "reported_usage": {
              "type": "string"
            },
            "model": {
              "type": "string"
            }
          },
          "required": [
            "speech_credential_sid",
            "name",
            "reported_usage",
            "model"
          ]
        }
      }
    },
    "componentsSchemas": {
      "GoogleCustomVoice": {
        "type": "object",
        "properties": {
          "speech_credential_sid": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "reported_usage": {
            "type": "string"
          },
          "model": {
            "type": "string"
          }
        },
        "required": [
          "speech_credential_sid",
          "name",
          "reported_usage",
          "model"
        ]
      },
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_speech_create_speech_credential",
    "domain": "speech",
    "endpointSlug": "create-speech-credential",
    "sourcePath": "reference/rest-platform-management/speech/create-speech-credential.mdx",
    "method": "POST",
    "pathTemplate": "/v1/Accounts/{AccountSid}/SpeechCredentials",
    "operationId": "create-speech-credential",
    "summary": "add a speech credential",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "speech_credential_sid": {
            "type": "string",
            "format": "uuid"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "vendor": {
            "type": "string",
            "enum": [
              {
                "value": "google"
              },
              {
                "value": "aws"
              }
            ]
          },
          "service_key": {
            "type": "string"
          },
          "access_key_id": {
            "type": "string"
          },
          "secret_access_key": {
            "type": "string"
          },
          "aws_region": {
            "type": "string"
          },
          "last_used": {
            "type": "string",
            "format": "date-time"
          },
          "last_tested": {
            "type": "string",
            "format": "date-time"
          },
          "use_for_tts": {
            "type": "boolean"
          },
          "use_for_stt": {
            "type": "boolean"
          },
          "tts_tested_ok": {
            "type": "boolean"
          },
          "stt_tested_ok": {
            "type": "boolean"
          },
          "riva_server_uri": {
            "type": "string"
          }
        }
      }
    },
    "componentsSchemas": {
      "SpeechCredentialVendor": {
        "type": "string",
        "enum": [
          {
            "value": "google"
          },
          {
            "value": "aws"
          }
        ]
      },
      "SpeechCredential": {
        "type": "object",
        "properties": {
          "speech_credential_sid": {
            "type": "string",
            "format": "uuid"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "vendor": {
            "$ref": "#/components/schemas/SpeechCredentialVendor"
          },
          "service_key": {
            "type": "string"
          },
          "access_key_id": {
            "type": "string"
          },
          "secret_access_key": {
            "type": "string"
          },
          "aws_region": {
            "type": "string"
          },
          "last_used": {
            "type": "string",
            "format": "date-time"
          },
          "last_tested": {
            "type": "string",
            "format": "date-time"
          },
          "use_for_tts": {
            "type": "boolean"
          },
          "use_for_stt": {
            "type": "boolean"
          },
          "tts_tested_ok": {
            "type": "boolean"
          },
          "stt_tested_ok": {
            "type": "boolean"
          },
          "riva_server_uri": {
            "type": "string"
          }
        }
      },
      "SuccessfulAdd": {
        "type": "object",
        "properties": {
          "sid": {
            "type": "string"
          }
        },
        "required": [
          "sid"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_speech_delete_google_custom_voice",
    "domain": "speech",
    "endpointSlug": "delete-google-custom-voice",
    "sourcePath": "reference/rest-platform-management/speech/delete-google-custom-voice.mdx",
    "method": "DELETE",
    "pathTemplate": "/v1/GoogleCustomVoices/{GoogleCustomVoiceSid}",
    "operationId": "delete-google-custom-voice",
    "summary": "delete a google custom voice",
    "parameters": [
      {
        "name": "GoogleCustomVoiceSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Speech_deleteGoogleCustomVoice_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_speech_delete_speech_credential_by_account",
    "domain": "speech",
    "endpointSlug": "delete-speech-credential-by-account",
    "sourcePath": "reference/rest-platform-management/speech/delete-speech-credential-by-account.mdx",
    "method": "DELETE",
    "pathTemplate": "/v1/Accounts/{AccountSid}/SpeechCredentials/{SpeechCredentialSid}",
    "operationId": "delete-speech-credential-by-account",
    "summary": "delete a speech credential",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "SpeechCredentialSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Speech_deleteSpeechCredentialByAccount_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_speech_get_google_custom_voice",
    "domain": "speech",
    "endpointSlug": "get-google-custom-voice",
    "sourcePath": "reference/rest-platform-management/speech/get-google-custom-voice.mdx",
    "method": "GET",
    "pathTemplate": "/v1/GoogleCustomVoices/{GoogleCustomVoiceSid}",
    "operationId": "get-google-custom-voice",
    "summary": "retrieve google custom voice",
    "parameters": [
      {
        "name": "GoogleCustomVoiceSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "GoogleCustomVoice": {
        "type": "object",
        "properties": {
          "speech_credential_sid": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "reported_usage": {
            "type": "string"
          },
          "model": {
            "type": "string"
          }
        },
        "required": [
          "speech_credential_sid",
          "name",
          "reported_usage",
          "model"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_speech_get_speech_credential_by_account",
    "domain": "speech",
    "endpointSlug": "get-speech-credential-by-account",
    "sourcePath": "reference/rest-platform-management/speech/get-speech-credential-by-account.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/SpeechCredentials/{SpeechCredentialSid}",
    "operationId": "get-speech-credential-by-account",
    "summary": "get a specific speech credential",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "SpeechCredentialSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "SpeechCredentialVendor": {
        "type": "string",
        "enum": [
          {
            "value": "google"
          },
          {
            "value": "aws"
          }
        ]
      },
      "SpeechCredential": {
        "type": "object",
        "properties": {
          "speech_credential_sid": {
            "type": "string",
            "format": "uuid"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "vendor": {
            "$ref": "#/components/schemas/SpeechCredentialVendor"
          },
          "service_key": {
            "type": "string"
          },
          "access_key_id": {
            "type": "string"
          },
          "secret_access_key": {
            "type": "string"
          },
          "aws_region": {
            "type": "string"
          },
          "last_used": {
            "type": "string",
            "format": "date-time"
          },
          "last_tested": {
            "type": "string",
            "format": "date-time"
          },
          "use_for_tts": {
            "type": "boolean"
          },
          "use_for_stt": {
            "type": "boolean"
          },
          "tts_tested_ok": {
            "type": "boolean"
          },
          "stt_tested_ok": {
            "type": "boolean"
          },
          "riva_server_uri": {
            "type": "string"
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_speech_list_google_custom_voices",
    "domain": "speech",
    "endpointSlug": "list-google-custom-voices",
    "sourcePath": "reference/rest-platform-management/speech/list-google-custom-voices.mdx",
    "method": "GET",
    "pathTemplate": "/v1/GoogleCustomVoices",
    "operationId": "list-google-custom-voices",
    "summary": "list google custom voices",
    "parameters": [
      {
        "name": "service_provider_sid",
        "in": "query",
        "required": false,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "account_sid",
        "in": "query",
        "required": false,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "speech_credential_sid",
        "in": "query",
        "required": false,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "GoogleCustomVoice": {
        "type": "object",
        "properties": {
          "speech_credential_sid": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "reported_usage": {
            "type": "string"
          },
          "model": {
            "type": "string"
          }
        },
        "required": [
          "speech_credential_sid",
          "name",
          "reported_usage",
          "model"
        ]
      }
    }
  },
  {
    "toolName": "jambonz_speech_list_speech_credentials",
    "domain": "speech",
    "endpointSlug": "list-speech-credentials",
    "sourcePath": "reference/rest-platform-management/speech/list-speech-credentials.mdx",
    "minimumPermissionLevel": "ADMIN",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/SpeechCredentials",
    "operationId": "list-speech-credentials",
    "summary": "retrieve all speech credentials for an account",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "SpeechCredentialVendor": {
        "type": "string",
        "enum": [
          {
            "value": "google"
          },
          {
            "value": "aws"
          }
        ]
      },
      "SpeechCredential": {
        "type": "object",
        "properties": {
          "speech_credential_sid": {
            "type": "string",
            "format": "uuid"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid"
          },
          "vendor": {
            "$ref": "#/components/schemas/SpeechCredentialVendor"
          },
          "service_key": {
            "type": "string"
          },
          "access_key_id": {
            "type": "string"
          },
          "secret_access_key": {
            "type": "string"
          },
          "aws_region": {
            "type": "string"
          },
          "last_used": {
            "type": "string",
            "format": "date-time"
          },
          "last_tested": {
            "type": "string",
            "format": "date-time"
          },
          "use_for_tts": {
            "type": "boolean"
          },
          "use_for_stt": {
            "type": "boolean"
          },
          "tts_tested_ok": {
            "type": "boolean"
          },
          "stt_tested_ok": {
            "type": "boolean"
          },
          "riva_server_uri": {
            "type": "string"
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_speech_supported_languages_and_voices_by_account",
    "domain": "speech",
    "endpointSlug": "supported-languages-and-voices-by-account",
    "sourcePath": "reference/rest-platform-management/speech/supported-languages-and-voices-by-account.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/SpeechCredentials/speech/supportedLanguagesAndVoices",
    "operationId": "supported-languages-and-voices-by-account",
    "summary": "get supported languages, voices and models",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      {
        "name": "vendor",
        "in": "query",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "label",
        "in": "query",
        "required": false,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "LanguageVoice": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "value": {
            "type": "string"
          }
        }
      },
      "LanguageVoices": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "value": {
            "type": "string"
          },
          "voices": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/LanguageVoice"
            }
          }
        }
      },
      "TtsModel": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "value": {
            "type": "string"
          }
        }
      },
      "SpeechLanguagesVoices": {
        "type": "object",
        "properties": {
          "tts": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/LanguageVoices"
            }
          },
          "stt": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/LanguageVoice"
            }
          },
          "ttsModel": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/TtsModel"
            }
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_speech_synthesize",
    "domain": "speech",
    "endpointSlug": "synthesize",
    "sourcePath": "reference/rest-platform-management/speech/synthesize.mdx",
    "method": "POST",
    "pathTemplate": "/v1/Accounts/{AccountSid}/TtsCache/Synthesize",
    "operationId": "synthesize",
    "summary": "get TTS from provider",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "speech_credential_sid": {
            "type": "string",
            "description": "Speech credential Sid"
          },
          "text": {
            "type": "string",
            "description": "the text to convert to audio"
          },
          "language": {
            "type": "string",
            "description": "language is used in text"
          },
          "voice": {
            "type": "string",
            "description": "voice ID"
          },
          "encodingMp3": {
            "type": "boolean",
            "description": "convert audio to mp3."
          }
        },
        "required": [
          "speech_credential_sid",
          "text",
          "language",
          "voice"
        ]
      }
    },
    "componentsSchemas": {}
  },
  {
    "toolName": "jambonz_speech_test_speech_credential_by_account",
    "domain": "speech",
    "endpointSlug": "test-speech-credential-by-account",
    "sourcePath": "reference/rest-platform-management/speech/test-speech-credential-by-account.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Accounts/{AccountSid}/SpeechCredentials/{SpeechCredentialSid}/test",
    "operationId": "test-speech-credential-by-account",
    "summary": "test a speech credential",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      {
        "name": "SpeechCredentialSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "componentsSchemas": {
      "AccountsAccountSidSpeechCredentialsSpeechCredentialSidTestGetResponsesContentApplicationJsonSchemaTtsStatus": {
        "type": "string",
        "enum": [
          {
            "value": "success"
          },
          {
            "value": "fail"
          },
          {
            "value": "not tested"
          }
        ]
      },
      "AccountsAccountSidSpeechCredentialsSpeechCredentialSidTestGetResponsesContentApplicationJsonSchemaTts": {
        "type": "object",
        "properties": {
          "status": {
            "$ref": "#/components/schemas/AccountsAccountSidSpeechCredentialsSpeechCredentialSidTestGetResponsesContentApplicationJsonSchemaTtsStatus"
          },
          "reason": {
            "type": "string"
          }
        }
      },
      "AccountsAccountSidSpeechCredentialsSpeechCredentialSidTestGetResponsesContentApplicationJsonSchemaSttStatus": {
        "type": "string",
        "enum": [
          {
            "value": "success"
          },
          {
            "value": "fail"
          }
        ]
      },
      "AccountsAccountSidSpeechCredentialsSpeechCredentialSidTestGetResponsesContentApplicationJsonSchemaStt": {
        "type": "object",
        "properties": {
          "status": {
            "$ref": "#/components/schemas/AccountsAccountSidSpeechCredentialsSpeechCredentialSidTestGetResponsesContentApplicationJsonSchemaSttStatus"
          },
          "reason": {
            "type": "string"
          }
        }
      },
      "Speech_testSpeechCredentialByAccount_Response_200": {
        "type": "object",
        "properties": {
          "tts": {
            "$ref": "#/components/schemas/AccountsAccountSidSpeechCredentialsSpeechCredentialSidTestGetResponsesContentApplicationJsonSchemaTts"
          },
          "stt": {
            "$ref": "#/components/schemas/AccountsAccountSidSpeechCredentialsSpeechCredentialSidTestGetResponsesContentApplicationJsonSchemaStt"
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_speech_update_google_custom_voice",
    "domain": "speech",
    "endpointSlug": "update-google-custom-voice",
    "sourcePath": "reference/rest-platform-management/speech/update-google-custom-voice.mdx",
    "method": "PUT",
    "pathTemplate": "/v1/GoogleCustomVoices/{GoogleCustomVoiceSid}",
    "operationId": "update-google-custom-voice",
    "summary": "update google custom voice",
    "parameters": [
      {
        "name": "GoogleCustomVoiceSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "speech_credential_sid": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "reported_usage": {
            "type": "string"
          },
          "model": {
            "type": "string"
          }
        },
        "required": [
          "speech_credential_sid",
          "name",
          "reported_usage",
          "model"
        ]
      }
    },
    "componentsSchemas": {
      "GoogleCustomVoice": {
        "type": "object",
        "properties": {
          "speech_credential_sid": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "reported_usage": {
            "type": "string"
          },
          "model": {
            "type": "string"
          }
        },
        "required": [
          "speech_credential_sid",
          "name",
          "reported_usage",
          "model"
        ]
      },
      "Speech_updateGoogleCustomVoice_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_speech_update_speech_credential_by_account",
    "domain": "speech",
    "endpointSlug": "update-speech-credential-by-account",
    "sourcePath": "reference/rest-platform-management/speech/update-speech-credential-by-account.mdx",
    "method": "PUT",
    "pathTemplate": "/v1/Accounts/{AccountSid}/SpeechCredentials/{SpeechCredentialSid}",
    "operationId": "update-speech-credential-by-account",
    "summary": "update a speech credential",
    "parameters": [
      {
        "name": "AccountSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "SpeechCredentialSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "use_for_tts": {
            "type": "boolean"
          },
          "use_for_stt": {
            "type": "boolean"
          }
        }
      }
    },
    "componentsSchemas": {
      "SpeechCredentialUpdate": {
        "type": "object",
        "properties": {
          "use_for_tts": {
            "type": "boolean"
          },
          "use_for_stt": {
            "type": "boolean"
          }
        }
      },
      "Speech_updateSpeechCredentialByAccount_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_users_create_user",
    "domain": "users",
    "endpointSlug": "create-user",
    "sourcePath": "reference/rest-platform-management/users/create-user.mdx",
    "method": "POST",
    "pathTemplate": "/v1/Users",
    "operationId": "create-user",
    "summary": "create a new user",
    "parameters": [],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "username"
          },
          "email": {
            "type": "string",
            "description": "user email address"
          },
          "is_active": {
            "type": "boolean",
            "description": "user account is active"
          },
          "force_change": {
            "type": "boolean",
            "description": "require the user to change password on next login"
          },
          "initial_password": {
            "type": "string",
            "description": "users password"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid",
            "description": "account sid the account the user will have access to, if not set will create a Service Provider account"
          },
          "service_provider_sid": {
            "type": "string",
            "format": "uuid",
            "description": "The service provider sid, the account is under, if not set account will be admin level"
          },
          "is_view_only": {
            "type": "boolean",
            "description": "if set to true the user will not be able to make changes"
          }
        },
        "required": [
          "name",
          "email",
          "is_active",
          "force_change",
          "initial_password",
          "is_view_only"
        ]
      }
    },
    "componentsSchemas": {
      "Users_createUser_Response_200": {
        "type": "object",
        "properties": {
          "user_sid": {
            "type": "string",
            "format": "uuid",
            "description": "The sid of the newly created user"
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_users_delete_user",
    "domain": "users",
    "endpointSlug": "delete-user",
    "sourcePath": "reference/rest-platform-management/users/delete-user.mdx",
    "method": "DELETE",
    "pathTemplate": "/v1/Users/{UserSid}",
    "operationId": "delete-user",
    "summary": "delete a user",
    "parameters": [
      {
        "name": "UserSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "Users_deleteUser_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  },
  {
    "toolName": "jambonz_users_get_user",
    "domain": "users",
    "endpointSlug": "get-user",
    "sourcePath": "reference/rest-platform-management/users/get-user.mdx",
    "method": "GET",
    "pathTemplate": "/v1/Users/{UserSid}",
    "operationId": "get-user",
    "summary": "retrieve user information",
    "parameters": [
      {
        "name": "UserSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "componentsSchemas": {
      "UsersUserSidGetResponsesContentApplicationJsonSchemaIsActive": {
        "type": "string",
        "enum": [
          {
            "value": "0"
          },
          {
            "value": "1"
          }
        ]
      },
      "UsersUserSidGetResponsesContentApplicationJsonSchemaForceChange": {
        "type": "string",
        "enum": [
          {
            "value": "0"
          },
          {
            "value": "1"
          }
        ]
      },
      "UsersUserSidGetResponsesContentApplicationJsonSchemaProvider": {
        "type": "string",
        "enum": [
          {
            "value": "local"
          }
        ]
      },
      "UsersUserSidGetResponsesContentApplicationJsonSchemaScope": {
        "type": "string",
        "enum": [
          {
            "value": "read-write"
          }
        ]
      },
      "UsersUserSidGetResponsesContentApplicationJsonSchemaEmailValidated": {
        "type": "string",
        "enum": [
          {
            "value": "0"
          },
          {
            "value": "1"
          }
        ]
      },
      "UsersUserSidGetResponsesContentApplicationJsonSchemaPhoneValidated": {
        "type": "string",
        "enum": [
          {
            "value": "0"
          },
          {
            "value": "1"
          }
        ]
      },
      "UsersUserSidGetResponsesContentApplicationJsonSchemaEmailContentOptOut": {
        "type": "string",
        "enum": [
          {
            "value": "0"
          },
          {
            "value": "1"
          }
        ]
      },
      "Users_getUser_Response_200": {
        "type": "object",
        "properties": {
          "user_sid": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "description": "username"
          },
          "email": {
            "type": "string",
            "description": "user email address"
          },
          "is_active": {
            "description": "user account is active",
            "$ref": "#/components/schemas/UsersUserSidGetResponsesContentApplicationJsonSchemaIsActive"
          },
          "force_change": {
            "description": "require the user to change password on next login",
            "$ref": "#/components/schemas/UsersUserSidGetResponsesContentApplicationJsonSchemaForceChange"
          },
          "account_sid": {
            "type": "string",
            "format": "uuid",
            "description": "account sid the account the user will have access to, if not set will create a Service Provider account"
          },
          "service_provider_sid": {
            "type": "string",
            "format": "uuid",
            "description": "The service provider sid, the account is under, if not set account will be admin level"
          },
          "is_view_only": {
            "type": "boolean",
            "description": "If set to true the user will not be able to make changes"
          },
          "provider": {
            "$ref": "#/components/schemas/UsersUserSidGetResponsesContentApplicationJsonSchemaProvider"
          },
          "provider_user_id": {
            "type": "string"
          },
          "scope": {
            "$ref": "#/components/schemas/UsersUserSidGetResponsesContentApplicationJsonSchemaScope"
          },
          "phone_activation_code": {
            "type": "string"
          },
          "email_activation_code": {
            "type": "string"
          },
          "email_validated": {
            "$ref": "#/components/schemas/UsersUserSidGetResponsesContentApplicationJsonSchemaEmailValidated"
          },
          "phone_validated": {
            "$ref": "#/components/schemas/UsersUserSidGetResponsesContentApplicationJsonSchemaPhoneValidated"
          },
          "email_content_opt_out": {
            "$ref": "#/components/schemas/UsersUserSidGetResponsesContentApplicationJsonSchemaEmailContentOptOut"
          },
          "pending_email": {
            "type": "string"
          },
          "phone": {
            "type": "string"
          }
        }
      }
    }
  },
  {
    "toolName": "jambonz_users_update_user",
    "domain": "users",
    "endpointSlug": "update-user",
    "sourcePath": "reference/rest-platform-management/users/update-user.mdx",
    "method": "PUT",
    "pathTemplate": "/v1/Users/{UserSid}",
    "operationId": "update-user",
    "summary": "update user information",
    "parameters": [
      {
        "name": "UserSid",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": false,
      "contentType": "application/json",
      "schema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "email_activation_code": {
            "type": "string"
          },
          "old_password": {
            "type": "string",
            "description": "existing password, which is to be replaced"
          },
          "new_password": {
            "type": "string",
            "description": "new password"
          },
          "is_active": {
            "type": "boolean"
          },
          "force_change": {
            "type": "boolean"
          },
          "is_view_only": {
            "type": "boolean",
            "description": "if set to true the user will not be able to make changes"
          }
        }
      }
    },
    "componentsSchemas": {
      "Users_updateUser_Response_204": {
        "type": "object",
        "properties": {}
      }
    }
  }
];
