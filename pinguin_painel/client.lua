local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")

src = {}
Tunnel.bindInterface(GetCurrentResourceName(), src)
vSERVER = Tunnel.getInterface(GetCurrentResourceName())

-- Estado da NUI
local nuiOpen = false

-- Função para abrir/fechar a NUI
local function toggleNUI(show)
    nuiOpen = show
    SendNUIMessage({
        type = "setShow",
        detail = show
    })
    SetNuiFocus(show, show)
end

-- Comando para abrir o painel
RegisterCommand('painel', function(rawCommand, type, detail)
    if vSERVER.CheckPermission() then
        if GetEntityHealth(PlayerPedId()) > 101 then
            if not IsPedInAnyVehicle(PlayerPedId()) then 
                toggleNUI(true)
            else
                TriggerEvent('Notify', 'negado', 'Você não pode usar isso em um veículo.')
            end
        else
            TriggerEvent('Notify', 'negado', 'Você não pode fazer isso morto.')
        end
    else
        TriggerEvent('Notify', 'negado', 'Você não tem permissão para usar este comando.')
    end
end)

-- Callback para kit Influencer
RegisterNUICallback('setGun', function(data, cb)
    if nuiOpen then
        vSERVER.INFLUENCER()
        toggleNUI(false)
    end
    cb('ok')
end)

-- Callback para kit Investidor
RegisterNUICallback('setGun2', function(data, cb)
    if nuiOpen then
        vSERVER.INVESTIDOR()
        toggleNUI(false)
    end
    cb('ok')
end)

-- Callback para spawnar carro
RegisterNUICallback('setCar', function(data, cb)
    if nuiOpen then
        vSERVER.CARRO()
        toggleNUI(false)
    end
    cb('ok')
end)

-- Callback para spawnar moto
RegisterNUICallback('setMoto', function(data, cb)
    if nuiOpen then
        vSERVER.MOTO()
        toggleNUI(false)
    end
    cb('ok')
end)

-- Callback para fechar a NUI
RegisterNUICallback('closeNui', function(data, cb)
    toggleNUI(false)
    cb('ok')
end)

-- Thread para detectar ESC
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        
        if nuiOpen then
            -- Desabilitar controles enquanto a NUI estiver aberta
            DisableControlAction(0, 1, true) -- LookLeftRight
            DisableControlAction(0, 2, true) -- LookUpDown
            DisableControlAction(0, 24, true) -- Attack
            DisableControlAction(0, 257, true) -- Attack2
            DisableControlAction(0, 25, true) -- Aim
            DisableControlAction(0, 263, true) -- MeleeAttack1
            DisableControlAction(0, 32, true) -- MoveUpOnly
            DisableControlAction(0, 34, true) -- MoveLeftOnly
            DisableControlAction(0, 31, true) -- MoveUpDown
            DisableControlAction(0, 30, true) -- MoveLeftRight
            
            -- Detectar ESC para fechar
            if IsControlJustPressed(1, 322) then -- ESC
                toggleNUI(false)
            end
        else
            Citizen.Wait(500) -- Reduzir uso de CPU quando NUI fechada
        end
    end
end)

-- Função para fechar NUI quando o jogador morrer
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1000)
        
        if nuiOpen and GetEntityHealth(PlayerPedId()) <= 101 then
            toggleNUI(false)
            TriggerEvent('Notify', 'negado', 'Painel fechado devido à morte.')
        end
    end
end)

-- Função para fechar NUI quando entrar em veículo
Citizen.CreateThread(function()
    local wasInVehicle = false
    
    while true do
        Citizen.Wait(500)
        
        local isInVehicle = IsPedInAnyVehicle(PlayerPedId())
        
        if nuiOpen and isInVehicle and not wasInVehicle then
            toggleNUI(false)
            TriggerEvent('Notify', 'negado', 'Painel fechado ao entrar no veículo.')
        end
        
        wasInVehicle = isInVehicle
    end
end)

-- Cleanup quando o resource for parado
AddEventHandler('onResourceStop', function(resourceName)
    if GetCurrentResourceName() == resourceName then
        if nuiOpen then
            toggleNUI(false)
        end
    end
end)

