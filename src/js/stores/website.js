var EventEmitter = require('events').EventEmitter;

var async = require('async');
var httpify = require('httpify');

// const apiUrl = (window.location.protocol === 'https:') ? 'https://randomuser.me/api?nat=au&results=16' : 'http://api.randomuser.me/?nat=au&results=16';

function WebSiteStore () {
    EventEmitter.call(this);

    // initialize internal cache
    var storage = this.cache = {
        website: []
    };
    var self = this;

    // Dispatchers
    this.starQueue = async.queue((data, callback) => {
        var { id, starred } = data;

        // update internal data
        self.cache.website
            .filter(person => person.id === id)
            .forEach(person => person.isStarred = starred);

        // emit events
        self.emit('website-updated', storage.website);

        callback();
    }, 1);

    this.refreshQueue = async.queue((_, callback) => {
        // update
        httpify({
            method: 'GET',
            url: apiUrl
        }, function (err, res) {
            if (err) return callback(err);
            storage.website = res.body.results.map(p => p.user);
            
            // post process new data
            storage.website.forEach((person, i) => {
                person.id = i;
                person.name.first = person.name.first[0].toUpperCase() + person.name.first.slice(1);
                person.name.last = person.name.last[0].toUpperCase() + person.name.last.slice(1);
                person.name.initials = person.name.first[0] + person.name.last[0];
                person.name.full = person.name.first + ' ' + person.name.last;
                person.category = Math.random() > 0.5 ? 'A' : 'B';
                person.github = person.name.first.toLowerCase() + person.name.last.toLowerCase();
                person.picture = person.picture.medium;
                person.twitter = '@' + person.name.first.toLowerCase() + (Math.random().toString(32).slice(2, 5));
            });

            // emit events
            self.emit('website-updated', storage.website);
            self.emit('refresh');

            callback(null, storage.website);
        });
    }, 1);

    // refresh immediately
    this.refresh();
}

Object.assign(WebSiteStore.prototype, EventEmitter.prototype);

// Intents
WebSiteStore.prototype.refresh = function (callback) {
    console.error('refresh');
    //this.refreshQueue.push(null, callback);
}

WebSiteStore.prototype.star = function ({ id }, starred, callback) {
    this.starQueue.push({ id, starred }, callback);
}

// Getters
WebSiteStore.prototype.getWebsite = function () { return this.cache.website; };

module.exports = WebSiteStore;
