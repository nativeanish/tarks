State = State or {}
Handlers.add("register",Handlers.utils.hasMatchingTag("Action","register"),function (msg)
   table.insert(State,msg.Tags.wallet)
   Handlers.utils.reply("Registered")(msg)
end)