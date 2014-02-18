var config = {};

config.hipchatApiKey = '1679eded41df8bff15e230ed7ba8ff';

//Keys:
//pushes to github on branches whose name .StartsWith(key) are messaged to the associated room
//changes in status of jira issues whose name .StartsWith(key) are messaged to the associated room
config.teams = [
    {team: 'Shipping News', roomId: 145799, key: 'bint'},
    {team: 'Lab Rats', roomId: 150485, key: 'lr'},
    {team: 'Yimby', roomId: 330575, key: 'yim'},
    {team: 'Thundercats', roomId: 173396, key: 'jgc'},
    {team: 'Platform', roomId:150454, key:'inf'},
    {team: 'JGTech', roomId:144926, key:'integration'},
    {team: 'JGTech', roomId:144926, key:'rc'},
    {team: 'JG.Mobile', roomId:378395 , key:'master', repo: 'JG.Mobile'}
]

module.exports = config;