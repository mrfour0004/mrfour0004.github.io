"use strict";

Array.prototype.contains = function (needle) {
   for (var i in this) {
      if (this[i] == needle) return true;
   }
   return false;
};