var eventHandlerMap = {};

var Event = {
  thisEventHandlerMap: {},

  triggerEvent(name) {
    var otherArguments = Array.prototype.slice.call(arguments, 1);
    var _this = this;

    if (eventHandlerMap[name]) {
      var handlers = eventHandlerMap[name];
      handlers.forEach(function (handler) {
        setTimeout(function () {
          handler.apply(_this, otherArguments);
        }, 0);
      });
    }
  },

  bindEvent(name, callback) {
    var handlers = eventHandlerMap[name] || [];
    if (handlers.indexOf(callback) < 0) {
      handlers.push(callback);
    }

    eventHandlerMap[name] = handlers;
  },

  unbindEvent(name, callback) {
    var handlers = eventHandlerMap[name];
    if (handlers) {
      eventHandlerMap[name] = handlers.filter(function (handler) {
        return handler != callback;
      });
    }

    var thisHandlers = this.thisEventHandlerMap[name];
    if (thisHandlers) {
      this.thisEventHandlerMap[name] = thisHandlers.filter(function (handler) {
        return handler != callback;
      });
    }
  },

  componentDidMount() {
    if (this.events) {
      for (var name in this.events) {
        var callback = this.events[name];
        if (callback) {
          if (typeof callback == 'string' && this[callback]) {
            this.bindEvent(name, this[callback]);
          } else if (typeof callback == 'function') {
            this.bindEvent(name, callback);
          }
        } else {
          warning(true, 'Bind event ' + name + ' fail, the callback is empty or undefined');
        }
      }
    }
  },

  componentWillUnmount() {
    for (var name in this.thisEventHandlerMap) {
      var thisHandlers = this.thisEventHandlerMap[name];
      var handlers = eventHandlerMap[name];
      if (handlers) {
        eventHandlerMap[name] = handlers.filter(this._checkIfHandlerInThisHandlers.bind(this, thisHandlers));
      }
    }
  },

  _checkIfHandlerInThisHandlers(thisHandlers, handler) {
    return thisHandlers.indexOf(handler) < 0;
  }
};

module.exports = Event;
