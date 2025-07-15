local Tunnel = module("vrp", "lib/Tunnel")
local Proxy = module("vrp", "lib/Proxy")
vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")

src = {}
Tunnel.bindInterface(GetCurrentResourceName(), src)
vCLIENT = Tunnel.getInterface(GetCurrentResourceName())
vGARAGE = Tunnel.getInterface('vrp_garages')
vADMIN = Tunnel.getInterface('vrp_admin')
---------------------------------------------------------------------------------------------------------------------------------------------------------
local Cooldown1 = {}
local Cooldown2 = {}
local Cooldown3 = {}
local Cooldown4 = {}

function SendWebhookMessage(webhook,message)
    if webhook ~= nil and webhook ~= "" then
        PerformHttpRequest(webhook, function(err, text, headers) end, 'POST', json.encode({content = message}), { ['Content-Type'] = 'application/json' })
    end
end
---------------------------------------------------------------------------------------------------------------------------------------
-- RECEBER O KIT INFLUENCER
---------------------------------------------------------------------------------------------------------------------------------------
function src.INFLUENCER()
    local source = source
    local user_id = vRP.getUserId(source)
    if user_id then
        if vRP.hasGroup(user_id, groupInfluencer) or vRP.hasPermission(user_id, 'mod.permissao') then
            if Cooldown1Lib() then
                SetCooldown1()
                for k,v in pairs(itensInfluencer) do
                    vRP.giveInventoryItem(user_id, v[1], v[2])
                end
                local minCd = parseInt(cooldown / 60)
                TriggerClientEvent('Notify', source, 'sucesso', '<b>KIT Influencer</b> recebido, iniciando cooldown de '..minCd..' minutos!')
                local identity = vRP.getUserIdentity(user_id)
                SendWebhookMessage(webhook,"```prolog\n[ID]: "..user_id.." "..identity.name.." "..identity.firstname.." \n[RESGATOU KIT INFLUENCER]" ..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
            end
        else
            TriggerClientEvent('Notify', source, "negado", "Você não é Influencer!")
        end
    end
end
---------------------------------------------------------------------------------------------------------------------------------------
-- RECEBER O KIT INVESTIDOR
---------------------------------------------------------------------------------------------------------------------------------------
function src.INVESTIDOR()
    local source = source
    local user_id = vRP.getUserId(source)
    if user_id then
        if vRP.hasGroup(user_id, groupInvestidor1) or vRP.hasGroup(user_id, groupInvestidor2) or vRP.hasPermission(user_id, 'mod.permissao') then
            if Cooldown2Lib() then
                SetCooldown2()
                for k,v in pairs(itensInvestidor) do
                    vRP.giveInventoryItem(user_id, v[1], v[2])
                end
                local minCd = parseInt(cooldown / 60)
                TriggerClientEvent('Notify', source, 'sucesso', '<b>KIT Investidor</b> recebido, iniciando cooldown de '..minCd.. ' minutos!')
                local identity = vRP.getUserIdentity(user_id)
                SendWebhookMessage(webhook,"```prolog\n[ID]: "..user_id.." "..identity.name.." "..identity.firstname.." \n[RESGATOU KIT INVESTIDOR]" ..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
            end
        else
            TriggerClientEvent("Notify", source, "negado", "Você não é Investidor!")
        end
    end
end
---------------------------------------------------------------------------------------------------------------------------------------
-- SPAWNAR O CARRO
---------------------------------------------------------------------------------------------------------------------------------------
function src.CARRO()
    local source = source
    local user_id = vRP.getUserId(source)
    if user_id then
        if Cooldown3Lib() then
            SetCooldown3()
            vADMIN.spawnVeh(source, carro)
            TriggerClientEvent('Notify', source, 'sucesso', '<b>'..vRP.vehicleName(carro)..'</b> spawnado com sucesso!')
        end
    end
end
---------------------------------------------------------------------------------------------------------------------------------------
-- SPAWNAR A MOTO
---------------------------------------------------------------------------------------------------------------------------------------
function src.MOTO()
    local source = source
    local user_id = vRP.getUserId(source)
    if user_id then
        if Cooldown4Lib() then
            SetCooldown4()
            vADMIN.spawnVeh(source, moto)
            TriggerClientEvent('Notify', source, 'sucesso', '<b>'..vRP.vehicleName(moto)..'</b> spawnada com sucesso!')
        end
    end
end
---------------------------------------------------------------------------------------------------------------------------------------
-- CHECAR PERMISSAO PARA ABRIR A NUI
---------------------------------------------------------------------------------------------------------------------------------------
function src.CheckPermission()
    local source = source
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id, permissao) or vRP.hasPermission(user_id, 'mod.permissao') then
        return true
    else
        return false
    end
end
---------------------------------------------------------------------------------------------------------------------------------------
-- FUNCTION PARA SETAR COOLDOWN - INFLUENCER
---------------------------------------------------------------------------------------------------------------------------------------
function SetCooldown1()
    local source = source
    local user_id = vRP.getUserId(source)
    Cooldown1[user_id] = os.time()
end

function Cooldown1Lib()
    local source = source
    local user_id = vRP.getUserId(source)
    if not Cooldown1[user_id] or os.time() > Cooldown1[user_id] + cooldown then
        return true
    end
    local minCd = parseInt(cooldown / 60)
    TriggerClientEvent('Notify', source, 'negado', 'Você deve aguardar '..minCd..' minutos para resgatar um <b>KIT INFLUENCER</b>.')
    return false
end
---------------------------------------------------------------------------------------------------------------------------------------
-- FUNCTION PARA SETAR COOLDOWN - INVESTIDOR
---------------------------------------------------------------------------------------------------------------------------------------
function SetCooldown2()
    local source = source
    local user_id = vRP.getUserId(source)
    Cooldown2[user_id] = os.time()
end

function Cooldown2Lib()
    local source = source
    local user_id = vRP.getUserId(source)
    if not Cooldown2[user_id] or os.time() > Cooldown2[user_id] + cooldown then
        return true
    end
    local minCd = parseInt(cooldown / 60)
    TriggerClientEvent('Notify', source, 'negado', 'Você deve aguardar '..minCd..' minutos para resgatar um <b>KIT INVESTIDOR</b>.')
    return false
end
---------------------------------------------------------------------------------------------------------------------------------------
-- FUNCTION PARA SETAR COOLDOWN - CARRO
---------------------------------------------------------------------------------------------------------------------------------------
function SetCooldown3()
    local source = source
    local user_id = vRP.getUserId(source)
    Cooldown3[user_id] = os.time()
end

function Cooldown3Lib()
    local source = source
    local user_id = vRP.getUserId(source)
    if not Cooldown3[user_id] or os.time() > Cooldown3[user_id] + cooldownCars then
        return true
    end
    TriggerClientEvent('Notify', source, 'negado', 'Você deve aguardar '..cooldownCars..' segundos para spawnar um(a) <b>' ..vRP.vehicleName(carro).. '</b>.')
    return false
end
---------------------------------------------------------------------------------------------------------------------------------------
-- FUNCTION PARA SETAR COOLDOWN - MOTO
---------------------------------------------------------------------------------------------------------------------------------------
function SetCooldown4()
    local source = source
    local user_id = vRP.getUserId(source)
    Cooldown4[user_id] = os.time()
end

function Cooldown4Lib()
    local source = source
    local user_id = vRP.getUserId(source)
    if not Cooldown4[user_id] or os.time() > Cooldown4[user_id] + cooldownCars then
        return true
    end
    TriggerClientEvent('Notify', source, 'negado', 'Você deve aguardar '..cooldownCars..' segundos para spawnar um(a) <b>' ..vRP.vehicleName(moto).. '</b>.')
    return false
end

