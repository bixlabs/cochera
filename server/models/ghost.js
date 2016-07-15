var app = require('../server');
var request = require('request');
var async = require('async');
var _ = require('lodash');

module.exports = function(Ghost) {
    var API = {
        ghost_invite: '/ghost/api/v0.1/users',
        ghost_token: '/ghost/api/v0.1/authentication/token'
    };

    var ghostCredentials = {
        username: process.env.GHOST_ADMIN,
        password: process.env.GHOST_ADMIN_PASSWORD,
        grant_type: 'password',
        client_id: 'ghost-admin',
        client_secret: '1b1bcef7747f'
    };

    function findGhostUrl(cb) {
        var url = process.env.GHOST_URL;
        if(!url){
            app.models.Url.findOne({where: {name: 'ghost'}}, function (err, res) {
                cb(err, res.url);
            });
        }else{
            cb(null, url);
        }

    }

    function authRequest(cb, res) {
        request.post(process.env.GHOST_URL + '/ghost/api/v0.1/authentication/token', {form: ghostCredentials}, function (err, res, body) {
            if(!err){
                cb(err, JSON.parse(body).access_token);
            }else{
                console.log('GHOST AUTHENTICATION ERROR!');
                cb(err);
            }
        });
    }

    function tokenGhost(cb) {
        async.auto({
            url: findGhostUrl,
            token: ['url', authRequest]
        }, cb);
    }

    function ghostInvite(email, res, cb) {
        var body = JSON.stringify({
            users: [
                {email: email}
            ]
        });
        var options = {
            url: res.url + API.ghost_invite,
            headers: {
                Authorization: 'Bearer ' + res.token,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: body
        };
        request(options, function (err, res, body) {
            cb(err, body);
        });
    }

    Ghost.inviteUser = function (email, cb) {
        async.waterfall([
            tokenGhost,
            async.apply(ghostInvite, email)
        ], cb);
    };

};
