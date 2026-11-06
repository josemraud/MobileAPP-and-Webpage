import base64
import json
import os
import unittest

os.environ.setdefault('JWT_SECRET_KEY', 'test-secret')

from src.config import env_flag, env_int
from src.shared.security.tokens import confirm_token, decode, employee_token, user_token


class EnvParsingTests(unittest.TestCase):
    def test_false_string_is_false(self):
        os.environ['DEBUG'] = 'False'
        self.assertFalse(env_flag('DEBUG'))

    def test_true_string_is_true(self):
        os.environ['DEBUG'] = 'true'
        self.assertTrue(env_flag('DEBUG'))

    def test_multiplied_content_length(self):
        os.environ['MAX_CONTENT_LENGTH'] = '16*1024*1024'
        self.assertEqual(env_int('MAX_CONTENT_LENGTH', 1), 16 * 1024 * 1024)


class TokenTests(unittest.TestCase):
    def test_user_and_employee_types_differ(self):
        user = decode(user_token('person@example.com'))
        employee = decode(employee_token('staff@example.com', 1))
        self.assertEqual(user['data']['typ'], 'user')
        self.assertEqual(employee['data']['typ'], 'employee')
        self.assertEqual(employee['data']['rol'], 1)
        self.assertFalse(user['error'])

    def test_confirm_token_round_trip(self):
        data = decode(confirm_token(15))
        self.assertEqual(data['data']['typ'], 'confirm')
        self.assertEqual(data['data']['user_id'], '15')

    def test_none_algorithm_is_rejected(self):
        def segment(value):
            raw = json.dumps(value).encode('utf-8')
            return base64.urlsafe_b64encode(raw).rstrip(b'=').decode('ascii')

        forged = segment({'alg': 'none', 'typ': 'JWT'}) + '.' + segment(
            {'sub': 'person@example.com', 'typ': 'user'}
        ) + '.'
        data = decode(forged)
        self.assertTrue(data['error'])


if __name__ == '__main__':
    unittest.main()
