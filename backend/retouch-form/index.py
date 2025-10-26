import json
import os
import base64
import mimetypes
from typing import Dict, Any
from urllib import request, parse

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
        
        if not bot_token or not chat_id:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Telegram credentials not configured'}),
                'isBase64Encoded': False
            }
        
        # Parse multipart form data
        content_type = event.get('headers', {}).get('content-type', '')
        body = event.get('body', '')
        is_base64 = event.get('isBase64Encoded', False)
        
        if is_base64:
            body = base64.b64decode(body)
        else:
            body = body.encode('utf-8')
        
        # Parse form data
        boundary = content_type.split('boundary=')[-1].encode()
        parts = body.split(b'--' + boundary)
        
        form_data = {}
        photo_data = None
        photo_filename = 'photo.jpg'
        
        for part in parts:
            if b'Content-Disposition' in part:
                # Extract field name
                if b'name="' in part:
                    name_start = part.find(b'name="') + 6
                    name_end = part.find(b'"', name_start)
                    field_name = part[name_start:name_end].decode('utf-8')
                    
                    # Extract value
                    content_start = part.find(b'\r\n\r\n') + 4
                    content_end = part.rfind(b'\r\n')
                    
                    if field_name == 'photo':
                        # Extract filename
                        if b'filename="' in part:
                            fn_start = part.find(b'filename="') + 10
                            fn_end = part.find(b'"', fn_start)
                            photo_filename = part[fn_start:fn_end].decode('utf-8')
                        
                        photo_data = part[content_start:content_end]
                    else:
                        field_value = part[content_start:content_end].decode('utf-8')
                        form_data[field_name] = field_value
        
        name = form_data.get('name', 'Не указано')
        phone = form_data.get('phone', 'Не указано')
        comment = form_data.get('comment', 'Нет комментария')
        
        # Send photo to Telegram
        if photo_data:
            telegram_api_url = f'https://api.telegram.org/bot{bot_token}/sendPhoto'
            
            # Create message caption
            caption = f"""🖼 Новая заявка на ретушь фото

👤 Имя: {name}
📞 Телефон: {phone}
💬 Комментарий: {comment}"""
            
            # Prepare multipart form data for Telegram
            boundary_tg = '----WebKitFormBoundary' + os.urandom(16).hex()
            body_parts = []
            
            # Add chat_id
            body_parts.append(f'--{boundary_tg}\r\n'.encode())
            body_parts.append(b'Content-Disposition: form-data; name="chat_id"\r\n\r\n')
            body_parts.append(f'{chat_id}\r\n'.encode())
            
            # Add caption
            body_parts.append(f'--{boundary_tg}\r\n'.encode())
            body_parts.append(b'Content-Disposition: form-data; name="caption"\r\n\r\n')
            body_parts.append(caption.encode('utf-8') + b'\r\n')
            
            # Add photo
            body_parts.append(f'--{boundary_tg}\r\n'.encode())
            body_parts.append(f'Content-Disposition: form-data; name="photo"; filename="{photo_filename}"\r\n'.encode())
            content_type_guess = mimetypes.guess_type(photo_filename)[0] or 'image/jpeg'
            body_parts.append(f'Content-Type: {content_type_guess}\r\n\r\n'.encode())
            body_parts.append(photo_data)
            body_parts.append(b'\r\n')
            
            body_parts.append(f'--{boundary_tg}--\r\n'.encode())
            
            body_tg = b''.join(body_parts)
            
            req = request.Request(
                telegram_api_url,
                data=body_tg,
                headers={
                    'Content-Type': f'multipart/form-data; boundary={boundary_tg}'
                }
            )
            
            with request.urlopen(req) as response:
                tg_result = json.loads(response.read().decode('utf-8'))
                
                if not tg_result.get('ok'):
                    raise Exception(f"Telegram API error: {tg_result}")
        
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
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': False, 'error': str(e)}),
            'isBase64Encoded': False
        }
