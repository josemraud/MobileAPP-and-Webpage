import json
import os
from urllib import error, request


def send_temporary_password(correo, password):
    """
    Send the temporary password from the server.
    Returns False when email delivery is not configured or the provider rejects the message.
    """
    service_id = os.getenv('EMAILJS_SERVICE_ID')
    template_id = os.getenv('EMAILJS_TEMPLATE_RESET')
    public_key = os.getenv('EMAILJS_PUBLIC_KEY')
    if not service_id or not template_id or not public_key:
        return False

    body = json.dumps({
        'service_id': service_id,
        'template_id': template_id,
        'user_id': public_key,
        'template_params': {
            'from_name': 'Plaza',
            'correo': correo,
            'message': 'Hola ' + correo + ' tu contraseña temporal es ' + password,
            'reply_to': correo,
        },
    }).encode('utf-8')
    req = request.Request(
        'https://api.emailjs.com/api/v1.0/email/send',
        data=body,
        headers={'Content-Type': 'application/json'},
        method='POST',
    )
    try:
        with request.urlopen(req, timeout=10) as response:
            return 200 <= response.status < 300
    except error.URLError:
        return False
