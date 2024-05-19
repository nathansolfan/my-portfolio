<?php

return [
    'api_key' => getenv('OPENAI_API_KEY'),
    'api_url' => 'https://api.openai.com/v1/chat/completions',
    'model' => 'gpt-3.5-turbo',
];
