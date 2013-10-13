;(function(window, undefined){
	/** support methods **/
	var _support = _support || {};
	_support.extend = function(target, source) {
	  target = target || {};
	  for (var prop in source) {
	    if (typeof source[prop] === 'object') {
	      target[prop] = extend(target[prop], source[prop]);
	    } else {
	      target[prop] = source[prop];
	    }
	  }
	  return target;
	};
	
	/** logging framework **/
	var _logSub = _logSub || {};
	_logSub.subscriptions = [];
	_logSub.publish = function(level, msg){
		if(this.subscriptions.length < 1){
			return true;
		}
		//todo: loop through subscribers and execute a notice function in a setTimeout
		// -- the setTimeout invokes a thread
		
		var notify = function(){
		}
		
		for(var sub in this.subscriptions){
			//invoke notify
		}
	};
	 
	
	

	/** Project Blue Start -- Outline the API **/
	var blue = (function(){
        var _blue = function(){
            if(!(this instanceof _blue)){
                return new _blue();
            }
            return this;
        };
        
        _blue.fn = _blue.prototype = {
            constructor: _blue
        };
         
        return _blue;
    })();
    
    window.Blue = blue;

})(window);