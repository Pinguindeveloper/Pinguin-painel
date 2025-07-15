
fx_version 'bodacious'
game 'gta5'

ui_page 'nui/index.html'

files {
	'nui/index.html',
	'nui/**/*',
	'nui/**/**/*'
}

shared_scripts {
    'shared.lua'
}

client_scripts {
    '@vrp/lib/utils.lua',
    'client.lua'
    -- 'entityiter.lua' -- Removido pois não existe
}

server_scripts {
    '@vrp/lib/utils.lua',
    'server.lua'
}                                          