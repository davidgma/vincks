"use strict";
this._output('network idle. frames: ' + page.frames().length);
var frame = page.mainFrame();
this._output('frame name: ' + frame.name());
this._output('childFrames: ' + frame.childFrames().length);
var handles = yield frame.$$('p');
this._output('paragraphs: ' + handles.length);
var children_length = yield frame.$eval('body', function (element) {
    return element.children.length;
});
this._output('children of body: ' + children_length);
var bodyHandle = yield frame.$('body');
if (bodyHandle != null) {
    for (var i = 0; i < children_length; i++) {
        var itemName = yield frame.evaluate(function (i, bodyHandle) {
            var item = bodyHandle.children.item(i);
            if (item != null)
                return item.nodeName;
        }, i, bodyHandle);
        this._output('itemName: ' + itemName);
    }
}
