import json
import os
import base64
from typing import Dict, Any
import requests
from io import BytesIO
from multipart.multipart import MultipartParser

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Receives photo retouch orders and sends them to Telegram
    Args: event with httpMethod, body, headers; context with request_id
    Returns: HTTP response with success status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        chat_id = os.environ.get('TELEGRAM_CHAT_ID')
        
        print(f"Bot token present: {bool(bot_token)}, Chat ID present: {bool(chat_id)}")
        
        if not bot_token or not chat_id:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': False, 'error': 'Telegram credentials not configured'}),
                'isBase64Encoded': False
            }
        
        # Parse multipart form data using python-multipart library
        headers = event.get('headers', {})
        # Headers can be lowercase or mixed case
        content_type = headers.get('content-type') or headers.get('Content-Type', '')
        body = event.get('body', '')
        is_base64 = event.get('isBase64Encoded', False)
        
        print(f"All headers: {headers}")
        print(f"Content-Type: {content_type}, Is Base64: {is_base64}")
        
        if is_base64:
            body_bytes = base64.b64decode(body)
        else:
            body_bytes = body.encode('utf-8') if isinstance(body, str) else body
        
        # Extract boundary from Content-Type manually
        # Example: multipart/form-data; boundary=----WebKitFormBoundary...
        boundary = None
        if 'boundary=' in content_type:
            boundary = content_type.split('boundary=')[1].strip()
            if boundary.startswith('"') and boundary.endswith('"'):
                boundary = boundary[1:-1]
            boundary = boundary.encode('utf-8')
        
        if not boundary:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': False, 'error': 'No boundary in Content-Type'}),
                'isBase64Encoded': False
            }
        
        print(f"Extracted boundary: {boundary}")
        
        # Parse form data
        form_data = {}
        photo_data = None
        photo_filename = 'photo.jpg'
        
        def on_part(part):
            nonlocal photo_data, photo_filename, form_data
            name = part.name.decode('utf-8') if isinstance(part.name, bytes) else part.name
            
            if name == 'photo':
                photo_filename = part.filename.decode('utf-8') if isinstance(part.filename, bytes) else part.filename
                photo_data = part.file.read()
            else:
                value = part.file.read()
                form_data[name] = value.decode('utf-8', errors='ignore')
        
        parser = MultipartParser(BytesIO(body_bytes), boundary)
        for part in parser:
            on_part(part)
        
        name = form_data.get('name', 'Не указано')
        phone = form_data.get('phone', 'Не указано')
        comment = form_data.get('comment', 'Нет комментария')
        
        print(f"Parsed data - Name: {name}, Phone: {phone}, Photo size: {len(photo_data) if photo_data else 0}")
        
        # Send photo to Telegram
        if not photo_data or len(photo_data) < 100:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': False, 'error': 'Фото не загружено или повреждено'}),
                'isBase64Encoded': False
            }
        
        telegram_api_url = f'https://api.telegram.org/bot{bot_token}/sendPhoto'
        
        caption = f"""🖼 Новая заявка на ретушь фото

👤 Имя: {name}
📞 Телефон: {phone}
💬 Комментарий: {comment}"""
        
        files = {'photo': (photo_filename, photo_data, 'image/jpeg')}
        data = {'chat_id': chat_id, 'caption': caption}
        
        print(f"Sending to Telegram: {telegram_api_url}")
        response = requests.post(telegram_api_url, files=files, data=data, timeout=30)
        result = response.json()
        
        print(f"Telegram response: {result}")
        
        if not result.get('ok'):
            error_msg = result.get('description', 'Unknown error')
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': False, 'error': f'Telegram error: {error_msg}'}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Заявка отправлена'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': False, 'error': str(e)}),
            'isBase64Encoded': False
        }