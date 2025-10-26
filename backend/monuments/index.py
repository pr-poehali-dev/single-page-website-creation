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
            'isBase64Encoded': False,
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
            monument_id = event.get('queryStringParameters', {}).get('id')
            
            if monument_id:
                cursor.execute(
                    "SELECT * FROM t_p78642605_single_page_website_.monuments WHERE id = %s",
                    (monument_id,)
                )
                monument = cursor.fetchone()
                
                if not monument:
                    return {
                        'statusCode': 404,
                        'headers': headers,
                        'isBase64Encoded': False,
                        'body': json.dumps({'error': 'Monument not found'})
                    }
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'isBase64Encoded': False,
                    'body': json.dumps(dict(monument))
                }
            else:
                cursor.execute(
                    "SELECT * FROM t_p78642605_single_page_website_.monuments ORDER BY created_at DESC"
                )
                monuments = cursor.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'isBase64Encoded': False,
                    'body': json.dumps([dict(m) for m in monuments], default=str)
                }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            title = body_data.get('title')
            image_url = body_data.get('image_url')
            price = body_data.get('price')
            size = body_data.get('size')
            
            if not all([title, image_url, price, size]):
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Missing required fields'})
                }
            
            cursor.execute(
                """
                INSERT INTO t_p78642605_single_page_website_.monuments (title, image_url, price, size)
                VALUES (%s, %s, %s, %s)
                RETURNING *
                """,
                (title, image_url, price, size)
            )
            
            new_monument = cursor.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': headers,
                'isBase64Encoded': False,
                'body': json.dumps(dict(new_monument), default=str)
            }
        
        elif method == 'PUT':
            monument_id = event.get('queryStringParameters', {}).get('id')
            
            if not monument_id:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Monument ID required'})
                }
            
            body_data = json.loads(event.get('body', '{}'))
            
            cursor.execute(
                """
                UPDATE t_p78642605_single_page_website_.monuments 
                SET title = %s, image_url = %s, price = %s, size = %s, 
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
                RETURNING *
                """,
                (
                    body_data.get('title'),
                    body_data.get('image_url'),
                    body_data.get('price'),
                    body_data.get('size'),
                    monument_id
                )
            )
            
            updated_monument = cursor.fetchone()
            conn.commit()
            
            if not updated_monument:
                return {
                    'statusCode': 404,
                    'headers': headers,
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Monument not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': headers,
                'isBase64Encoded': False,
                'body': json.dumps(dict(updated_monument), default=str)
            }
        
        elif method == 'DELETE':
            monument_id = event.get('queryStringParameters', {}).get('id')
            
            print(f"DELETE request for monument ID: {monument_id}")
            
            if not monument_id:
                print("Error: No monument ID provided")
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Monument ID required'})
                }
            
            print(f"Executing DELETE query for ID: {monument_id}")
            cursor.execute(
                "DELETE FROM t_p78642605_single_page_website_.monuments WHERE id = %s RETURNING id",
                (monument_id,)
            )
            
            deleted = cursor.fetchone()
            conn.commit()
            
            print(f"Delete result: {deleted}")
            
            if not deleted:
                print(f"Monument with ID {monument_id} not found")
                return {
                    'statusCode': 404,
                    'headers': headers,
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Monument not found'})
                }
            
            print(f"Monument {monument_id} successfully deleted")
            return {
                'statusCode': 200,
                'headers': headers,
                'isBase64Encoded': False,
                'body': json.dumps({'message': 'Monument deleted successfully'})
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': headers,
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'isBase64Encoded': False,
            'body': json.dumps({'error': str(e)})
        }
    
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()