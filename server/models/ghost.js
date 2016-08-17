var app = require('../server');
var request = require('request');
var async = require('async');
var _ = require('lodash');

module.exports = function(Ghost) {

    var ghost_url = process.env.GHOST_URL || 'http://apps.thedigitalgarage.io/community';
    var ghost_api_base = ghost_url + '/ghost/api/v0.1/';

    var API = {
        ghost_invite: ghost_api_base + 'users',
        ghost_token: ghost_api_base + 'authentication/token'
    };

    var credentials = {
        username: process.env.GHOST_ADMIN || 'eddsuarez@bixlabs.com',
        password:  process.env.GHOST_ADMIN_PASSWORD || '01100101e',
        grant_type: 'password',
        client_id: 'ghost-admin',
        client_secret: process.env.GHOST_CLIENT_SECRET || 'e4fb47ea88df'
    };

    function authRequest(cb) {
        request.post(API.ghost_token, {form: credentials},
                function (err, res) {
                    if(!err){
                        cb(err, JSON.parse(res.body).access_token);
                    }else{
                        cb(err);
                    }
            });
    }

    function api(endpoint, token, cb, limit, filter, fileds) {
        request({
                url: ghost_api_base+endpoint,
                qs: {
                    limit: limit,
                    filter: filter,
                    fields: fileds
                },
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            },
            function (err, res) {
                if(!err){
                    cb(err, JSON.parse(res.body)[endpoint]);
                }else{
                    cb(err);
                }
            });
    }

    Ghost.find = function(cb){
       async.auto({
            token: function(cb) {
                authRequest(cb);
            },
            posts: ['token', function (cb, res){
                api('posts', res.token, cb, 'all', 'status:published');
            }],
            tags: ['token', function (cb, res){
                api('tags', res.token, cb, 'all', 'visibility:public', 'name,slug');
            }]
        },function(err, results) {
            console.log('err = ', err);
            var data = [];
            _.forEach(results.posts, function(post) {
                post.type = "Post";
                data.push(post);
            });
            _.forEach(results.tags, function(tag) {
                data.push({title:tag.name, url:"tag/"+tag.slug, type:"Tag"});
            });

            cb(err, data);
        });
    }

    Ghost.remoteMethod('find', {
        accepts: [
        ],
        description: "Fetch a paginated set of published posts",
        http: {path: '/find', verb: 'GET'},
        returns: {type: 'array', root: true}
    });

    function ghostInvite(email, res, cb) {
        var body = JSON.stringify({
            users: [
                {email: email}
            ]
        });
        var options = {
            url: API.ghost_invite,
            headers: {
                Authorization: 'Bearer ' + res,
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
            authRequest,
            async.apply(ghostInvite, email)
        ], cb);
    };

};
