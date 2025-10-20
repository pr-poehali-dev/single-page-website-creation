'''
Business: Загрузка изображений на CDN сервер
Args: event - dict с httpMethod, body (base64 encoded image)
      context - object с request_id
Returns: HTTP response с URL загруженного изображения
'''

import json
import base64
import uuid
import os
from typing import Dict, Any
import boto3
from botocore.client import Config

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        
        image_base64 = body_data.get('image')
        file_extension = body_data.get('extension', 'jpg')
        
        if not image_base64:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'No image provided'})
            }
        
        if ',' in image_base64:
            image_base64 = image_base64.split(',')[1]
        
        image_data = base64.b64decode(image_base64)
        
        file_id = str(uuid.uuid4())
        file_name = f"{file_id}.{file_extension}"
        
        s3_client = boto3.client(
            's3',
            endpoint_url='https://storage.yandexcloud.net',
            aws_access_key_id=os.environ.get('S3_ACCESS_KEY'),
            aws_secret_access_key=os.environ.get('S3_SECRET_KEY'),
            config=Config(signature_version='s3v4'),
            region_name='ru-central1'
        )
        
        bucket_name = 'poehali-cdn'
        
        content_type_map = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'webp': 'image/webp'
        }
        
        s3_client.put_object(
            Bucket=bucket_name,
            Key=f'files/{file_name}',
            Body=image_data,
            ContentType=content_type_map.get(file_extension, 'image/jpeg'),
            ACL='public-read'
        )
        
        image_url = f'https://cdn.poehali.dev/files/{file_name}'
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'url': image_url,
                'file_id': file_id
            })
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }
