(function(window, undefined){

    var _logger = (function(){
        var _l = function(name, manager){
            if(!(this instanceof _l)){
                return new _l(name,manager);
            }
            
            this.name = name || '';
            this.manager = manager;
            return this;
        };
        
        _l.fn = _l.prototype = {
            error: function(msg){
                this._log('ERROR',msg);
            },
            warn: function(msg){
                this._log('WARN',msg);
            },
            info: function(msg){
                this._log('INFO',msg);
            },
            debug: function(msg){
                this._log('DEBUG',msg);
            },
            _log: function(level, msg){
                this.manager.log(this,level, msg);
            },
            toString: function(){
                return this.name;
            },
            getRootLogger: function(){
                return this.manager;
            }
        };
        
        return _l;
    })();
    
    var _subscriber = (function(){
        var _s = function(level, callback){
            if(!(this instanceof _s)){
                return new _s(level,callback);
            }
            this.level = level || 'DEBUG';
            this.callback = callback;            
            return this;
        };
        
        _s.fn = _s.prototype = {
            getLevel: function(){
                return this.level;
            },
            setLevel: function(level){
                this.level = level;
            },
            publish: function(level, msg){
                if(typeof this.callback == 'function'){
                    var subLevel = this._getLevelValue(this.level);
                    var logLevel = this._getLevelValue(level);
                    if(subLevel <= logLevel){
                        setTimeout(this.callback,0,msg);
                    }
                }
            },
            _getLevelValue: function(level){
                if(level == 'DEBUG'){
                    return 1;
                }else if(level == 'INFO'){
                    return 2;
                }else if (level == 'WARN'){
                    return 3;
                }else if(level == 'ERROR'){
                    return 4;
                }
                return 5;
            }
        };
        
        return _s;
    })();
    
    var loggerSingleton = (function(){        
        var _instance = function(){
            this._subscribers = [];
            
            this.defaultAppenders = {
            	consoleAppender : function(){
            		/** 
            		  * Appends log output to the browser console
            		 **/
            		return function(msg){
            			if(window && window.console){
            				window.console.log(msg);
            			}
            		};
            	},
            	divAppender : function(id){
            		/** 
            		  * Appends log output to a div
            		 **/
            		return function(msg){
            			var logDiv = document.getElementById(id);
					    var logEntry = document.createElement('div');
					    logEntry.innerHTML = msg;
					    logDiv.appendChild(logEntry);
            		};
            	}
            };
            
            return this;
        };
        
        _instance.fn = _instance.prototype = {
            newLogger: function(level){
                return new _logger(level,this);
            },            
            log: function(logger, level, msg){
                var ts = this._formatDate();
                var output = ts + ' [' + level + '] ' + logger + " - " + msg;
                this._notify(level, output);
            },
            _formatDate : function(){
            	var d = new Date();
            	var date = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
            	var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds();
            	return date + " " + time;
            },
            _notify: function(level, msg){
                for(var index in this._subscribers){
                    this._subscribers[index].publish(level,msg);
                }
            },
            subscribe: function(level, callback){
                var s = new _subscriber(level, callback);
                this._subscribers.push(s);
            }         
        };        
        return _instance;
    })();
    
    window.Logger = new loggerSingleton(); //singleton
})(window);

