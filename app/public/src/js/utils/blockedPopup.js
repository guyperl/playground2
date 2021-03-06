/**
 * 
 * Copyright (C) 2013 Christophe Rosset <tophe@topheman.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */

define(function(){
    
    var blockedPopup;
    
    blockedPopup = {
        
        /**
         * 
         * @param {window} popup
         * @param {Function} isBlockedCallback
         * @param {Function} isUnBlockedCallback
         */
        isBlocked : function(popup, isBlockedCallback, isUnBlockedCallback){
            console.log('blockedPopup.isBlocked()');
            if (!popup){
                console.log('no popup');
                isBlockedCallback();
            }
            else {
                popup.onload = function() {
                    setTimeout(function() {
                        if (popup.screenX === 0){
                            if(typeof isBlockedCallback === "function"){
                                isBlockedCallback();
                            }
                        }
                        else{
                            if(typeof isUnBlockedCallback === "function"){
                                isUnBlockedCallback();
                            }
                        }
                    }, 0);
                };
            }
        },
                
        /**
         * 
         * @param {window} popup
         * @param {Function} callback
         */
        onUnblock: function(popup, callback){
            var check = (function(popup,callback){
                return function(){
                    console.log('check',popup);
                    if(popup){
                        if(popup.screenX === 0){
                            setTimeout(check,10);
                        }
                        else{
                            if(typeof callback === "function"){
                                callback();
                            }
                        }
                    }
                    else{
                        setTimeout(check,10);
                    }
                };
            })(popup,callback);
            check();
        }
        
    };
    
    return blockedPopup;

});