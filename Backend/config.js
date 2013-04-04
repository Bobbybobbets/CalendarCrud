var configs = [];


exports.set = function(configName, configValue)
{
    configs[configName] = configValue;
};

exports.get = function(configName)
{
    return configs[configName];
};
