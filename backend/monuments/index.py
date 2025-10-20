'''
Business: CRUD API для управления каталогом памятников
Args: event - dict с httpMethod, body, queryStringParameters, pathParams
      context - object с request_id
Returns: HTTP response с данными памятников или результатом операции
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if method == 'GET':
            monument_id = event.get('pathParams', {}).get('id')
            
            if monument_id:
                cursor.execute(
                    "SELECT * FROM monuments WHERE id = %s",
                    (monument_id,)
                )
                monument = cursor.fetchone()
                
                if not monument:
                    return {
                        'statusCode': 404,
                        'headers': headers,
                        'body': json.dumps({'error': 'Monument not found'})
                    }
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps(dict(monument))
                }
            else:
                cursor.execute(
                    "SELECT * FROM monuments ORDER BY created_at DESC"
                )
                monuments = cursor.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps([dict(m) for m in monuments], default=str)
                }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            title = body_data.get('title')
            image_url = body_data.get('image_url')
            price = body_data.get('price')
            size = body_data.get('size')
            description = body_data.get('description', '')
            
            if not all([title, image_url, price, size]):
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Missing required fields'})
                }
            
            cursor.execute(
                """
                INSERT INTO monuments (title, image_url, price, size, description)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING *
                """,
                (title, image_url, price, size, description)
            )
            
            new_monument = cursor.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': headers,
                'body': json.dumps(dict(new_monument), default=str)
            }
        
        elif method == 'PUT':
            monument_id = event.get('pathParams', {}).get('id')
            
            if not monument_id:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Monument ID required'})
                }
            
            body_data = json.loads(event.get('body', '{}'))
            
            cursor.execute(
                """
                UPDATE monuments 
                SET title = %s, image_url = %s, price = %s, size = %s, 
                    description = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
                RETURNING *
                """,
                (
                    body_data.get('title'),
                    body_data.get('image_url'),
                    body_data.get('price'),
                    body_data.get('size'),
                    body_data.get('description', ''),
                    monument_id
                )
            )
            
            updated_monument = cursor.fetchone()
            conn.commit()
            
            if not updated_monument:
                return {
                    'statusCode': 404,
                    'headers': headers,
                    'body': json.dumps({'error': 'Monument not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(dict(updated_monument), default=str)
            }
        
        elif method == 'DELETE':
            monument_id = event.get('pathParams', {}).get('id')
            
            if not monument_id:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Monument ID required'})
                }
            
            cursor.execute(
                "DELETE FROM monuments WHERE id = %s RETURNING id",
                (monument_id,)
            )
            
            deleted = cursor.fetchone()
            conn.commit()
            
            if not deleted:
                return {
                    'statusCode': 404,
                    'headers': headers,
                    'body': json.dumps({'error': 'Monument not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'message': 'Monument deleted successfully'})
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': headers,
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }
    
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()
