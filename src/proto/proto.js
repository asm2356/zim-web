/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.protocol = (function() {

    /**
     * Namespace protocol.
     * @exports protocol
     * @namespace
     */
    var protocol = {};

    protocol.MessageFile = (function() {

        /**
         * Properties of a MessageFile.
         * @memberof protocol
         * @interface IMessageFile
         * @property {string|null} [id] MessageFile id
         * @property {string|null} [messageId] MessageFile messageId
         * @property {string|null} [fileName] MessageFile fileName
         * @property {number|Long|null} [size] MessageFile size
         * @property {string|null} [suffix] MessageFile suffix
         * @property {string|null} [url] MessageFile url
         * @property {number|Long|null} [createTime] MessageFile createTime
         */

        /**
         * Constructs a new MessageFile.
         * @memberof protocol
         * @classdesc Represents a MessageFile.
         * @implements IMessageFile
         * @constructor
         * @param {protocol.IMessageFile=} [properties] Properties to set
         */
        function MessageFile(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageFile id.
         * @member {string} id
         * @memberof protocol.MessageFile
         * @instance
         */
        MessageFile.prototype.id = "";

        /**
         * MessageFile messageId.
         * @member {string} messageId
         * @memberof protocol.MessageFile
         * @instance
         */
        MessageFile.prototype.messageId = "";

        /**
         * MessageFile fileName.
         * @member {string} fileName
         * @memberof protocol.MessageFile
         * @instance
         */
        MessageFile.prototype.fileName = "";

        /**
         * MessageFile size.
         * @member {number|Long} size
         * @memberof protocol.MessageFile
         * @instance
         */
        MessageFile.prototype.size = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * MessageFile suffix.
         * @member {string} suffix
         * @memberof protocol.MessageFile
         * @instance
         */
        MessageFile.prototype.suffix = "";

        /**
         * MessageFile url.
         * @member {string} url
         * @memberof protocol.MessageFile
         * @instance
         */
        MessageFile.prototype.url = "";

        /**
         * MessageFile createTime.
         * @member {number|Long} createTime
         * @memberof protocol.MessageFile
         * @instance
         */
        MessageFile.prototype.createTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new MessageFile instance using the specified properties.
         * @function create
         * @memberof protocol.MessageFile
         * @static
         * @param {protocol.IMessageFile=} [properties] Properties to set
         * @returns {protocol.MessageFile} MessageFile instance
         */
        MessageFile.create = function create(properties) {
            return new MessageFile(properties);
        };

        /**
         * Encodes the specified MessageFile message. Does not implicitly {@link protocol.MessageFile.verify|verify} messages.
         * @function encode
         * @memberof protocol.MessageFile
         * @static
         * @param {protocol.IMessageFile} message MessageFile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageFile.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.messageId != null && Object.hasOwnProperty.call(message, "messageId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.messageId);
            if (message.fileName != null && Object.hasOwnProperty.call(message, "fileName"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.fileName);
            if (message.size != null && Object.hasOwnProperty.call(message, "size"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.size);
            if (message.suffix != null && Object.hasOwnProperty.call(message, "suffix"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.suffix);
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.url);
            if (message.createTime != null && Object.hasOwnProperty.call(message, "createTime"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.createTime);
            return writer;
        };

        /**
         * Encodes the specified MessageFile message, length delimited. Does not implicitly {@link protocol.MessageFile.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protocol.MessageFile
         * @static
         * @param {protocol.IMessageFile} message MessageFile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageFile.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageFile message from the specified reader or buffer.
         * @function decode
         * @memberof protocol.MessageFile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protocol.MessageFile} MessageFile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageFile.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protocol.MessageFile();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.messageId = reader.string();
                    break;
                case 3:
                    message.fileName = reader.string();
                    break;
                case 4:
                    message.size = reader.int64();
                    break;
                case 5:
                    message.suffix = reader.string();
                    break;
                case 6:
                    message.url = reader.string();
                    break;
                case 7:
                    message.createTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageFile message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protocol.MessageFile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protocol.MessageFile} MessageFile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageFile.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageFile message.
         * @function verify
         * @memberof protocol.MessageFile
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageFile.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.messageId != null && message.hasOwnProperty("messageId"))
                if (!$util.isString(message.messageId))
                    return "messageId: string expected";
            if (message.fileName != null && message.hasOwnProperty("fileName"))
                if (!$util.isString(message.fileName))
                    return "fileName: string expected";
            if (message.size != null && message.hasOwnProperty("size"))
                if (!$util.isInteger(message.size) && !(message.size && $util.isInteger(message.size.low) && $util.isInteger(message.size.high)))
                    return "size: integer|Long expected";
            if (message.suffix != null && message.hasOwnProperty("suffix"))
                if (!$util.isString(message.suffix))
                    return "suffix: string expected";
            if (message.url != null && message.hasOwnProperty("url"))
                if (!$util.isString(message.url))
                    return "url: string expected";
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                if (!$util.isInteger(message.createTime) && !(message.createTime && $util.isInteger(message.createTime.low) && $util.isInteger(message.createTime.high)))
                    return "createTime: integer|Long expected";
            return null;
        };

        /**
         * Creates a MessageFile message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protocol.MessageFile
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protocol.MessageFile} MessageFile
         */
        MessageFile.fromObject = function fromObject(object) {
            if (object instanceof $root.protocol.MessageFile)
                return object;
            var message = new $root.protocol.MessageFile();
            if (object.id != null)
                message.id = String(object.id);
            if (object.messageId != null)
                message.messageId = String(object.messageId);
            if (object.fileName != null)
                message.fileName = String(object.fileName);
            if (object.size != null)
                if ($util.Long)
                    (message.size = $util.Long.fromValue(object.size)).unsigned = false;
                else if (typeof object.size === "string")
                    message.size = parseInt(object.size, 10);
                else if (typeof object.size === "number")
                    message.size = object.size;
                else if (typeof object.size === "object")
                    message.size = new $util.LongBits(object.size.low >>> 0, object.size.high >>> 0).toNumber();
            if (object.suffix != null)
                message.suffix = String(object.suffix);
            if (object.url != null)
                message.url = String(object.url);
            if (object.createTime != null)
                if ($util.Long)
                    (message.createTime = $util.Long.fromValue(object.createTime)).unsigned = false;
                else if (typeof object.createTime === "string")
                    message.createTime = parseInt(object.createTime, 10);
                else if (typeof object.createTime === "number")
                    message.createTime = object.createTime;
                else if (typeof object.createTime === "object")
                    message.createTime = new $util.LongBits(object.createTime.low >>> 0, object.createTime.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a MessageFile message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protocol.MessageFile
         * @static
         * @param {protocol.MessageFile} message MessageFile
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageFile.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.messageId = "";
                object.fileName = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.size = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.size = options.longs === String ? "0" : 0;
                object.suffix = "";
                object.url = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.createTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.createTime = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.messageId != null && message.hasOwnProperty("messageId"))
                object.messageId = message.messageId;
            if (message.fileName != null && message.hasOwnProperty("fileName"))
                object.fileName = message.fileName;
            if (message.size != null && message.hasOwnProperty("size"))
                if (typeof message.size === "number")
                    object.size = options.longs === String ? String(message.size) : message.size;
                else
                    object.size = options.longs === String ? $util.Long.prototype.toString.call(message.size) : options.longs === Number ? new $util.LongBits(message.size.low >>> 0, message.size.high >>> 0).toNumber() : message.size;
            if (message.suffix != null && message.hasOwnProperty("suffix"))
                object.suffix = message.suffix;
            if (message.url != null && message.hasOwnProperty("url"))
                object.url = message.url;
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                if (typeof message.createTime === "number")
                    object.createTime = options.longs === String ? String(message.createTime) : message.createTime;
                else
                    object.createTime = options.longs === String ? $util.Long.prototype.toString.call(message.createTime) : options.longs === Number ? new $util.LongBits(message.createTime.low >>> 0, message.createTime.high >>> 0).toNumber() : message.createTime;
            return object;
        };

        /**
         * Converts this MessageFile to JSON.
         * @function toJSON
         * @memberof protocol.MessageFile
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageFile.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MessageFile;
    })();

    protocol.Message = (function() {

        /**
         * Properties of a Message.
         * @memberof protocol
         * @interface IMessage
         * @property {string|null} [id] Message id
         * @property {number|null} [code] Message code
         * @property {string|null} [fromId] Message fromId
         * @property {string|null} [toId] Message toId
         * @property {string|null} [content] Message content
         * @property {number|Long|null} [sendTime] Message sendTime
         * @property {number|null} [messageType] Message messageType
         * @property {number|null} [messageCategory] Message messageCategory
         * @property {number|null} [chatType] Message chatType
         * @property {string|null} [terminalType] Message terminalType
         * @property {string|null} [protocol] Message protocol
         * @property {string|null} [token] Message token
         * @property {string|null} [data] Message data
         * @property {protocol.IMessageFile|null} [messageFile] Message messageFile
         */

        /**
         * Constructs a new Message.
         * @memberof protocol
         * @classdesc Represents a Message.
         * @implements IMessage
         * @constructor
         * @param {protocol.IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Message id.
         * @member {string} id
         * @memberof protocol.Message
         * @instance
         */
        Message.prototype.id = "";

        /**
         * Message code.
         * @member {number} code
         * @memberof protocol.Message
         * @instance
         */
        Message.prototype.code = 0;

        /**
         * Message fromId.
         * @member {string} fromId
         * @memberof protocol.Message
         * @instance
         */
        Message.prototype.fromId = "";

        /**
         * Message toId.
         * @member {string} toId
         * @memberof protocol.Message
         * @instance
         */
        Message.prototype.toId = "";

        /**
         * Message content.
         * @member {string} content
         * @memberof protocol.Message
         * @instance
         */
        Message.prototype.content = "";

        /**
         * Message sendTime.
         * @member {number|Long} sendTime
         * @memberof protocol.Message
         * @instance
         */
        Message.prototype.sendTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Message messageType.
         * @member {number} messageType
         * @memberof protocol.Message
         * @instance
         */
        Message.prototype.messageType = 0;

        /**
         * Message messageCategory.
         * @member {number} messageCategory
         * @memberof protocol.Message
         * @instance
         */
        Message.prototype.messageCategory = 0;

        /**
         * Message chatType.
         * @member {number} chatType
         * @memberof protocol.Message
         * @instance
         */
        Message.prototype.chatType = 0;

        /**
         * Message terminalType.
         * @member {string} terminalType
         * @memberof protocol.Message
         * @instance
         */
        Message.prototype.terminalType = "";

        /**
         * Message protocol.
         * @member {string} protocol
         * @memberof protocol.Message
         * @instance
         */
        Message.prototype.protocol = "";

        /**
         * Message token.
         * @member {string} token
         * @memberof protocol.Message
         * @instance
         */
        Message.prototype.token = "";

        /**
         * Message data.
         * @member {string} data
         * @memberof protocol.Message
         * @instance
         */
        Message.prototype.data = "";

        /**
         * Message messageFile.
         * @member {protocol.IMessageFile|null|undefined} messageFile
         * @memberof protocol.Message
         * @instance
         */
        Message.prototype.messageFile = null;

        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof protocol.Message
         * @static
         * @param {protocol.IMessage=} [properties] Properties to set
         * @returns {protocol.Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };

        /**
         * Encodes the specified Message message. Does not implicitly {@link protocol.Message.verify|verify} messages.
         * @function encode
         * @memberof protocol.Message
         * @static
         * @param {protocol.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.fromId != null && Object.hasOwnProperty.call(message, "fromId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.fromId);
            if (message.toId != null && Object.hasOwnProperty.call(message, "toId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.toId);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.content);
            if (message.sendTime != null && Object.hasOwnProperty.call(message, "sendTime"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.sendTime);
            if (message.messageType != null && Object.hasOwnProperty.call(message, "messageType"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.messageType);
            if (message.messageCategory != null && Object.hasOwnProperty.call(message, "messageCategory"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.messageCategory);
            if (message.chatType != null && Object.hasOwnProperty.call(message, "chatType"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.chatType);
            if (message.terminalType != null && Object.hasOwnProperty.call(message, "terminalType"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.terminalType);
            if (message.protocol != null && Object.hasOwnProperty.call(message, "protocol"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.protocol);
            if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                writer.uint32(/* id 12, wireType 2 =*/98).string(message.token);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 13, wireType 2 =*/106).string(message.data);
            if (message.messageFile != null && Object.hasOwnProperty.call(message, "messageFile"))
                $root.protocol.MessageFile.encode(message.messageFile, writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link protocol.Message.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protocol.Message
         * @static
         * @param {protocol.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof protocol.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protocol.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protocol.Message();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    message.fromId = reader.string();
                    break;
                case 4:
                    message.toId = reader.string();
                    break;
                case 5:
                    message.content = reader.string();
                    break;
                case 6:
                    message.sendTime = reader.int64();
                    break;
                case 7:
                    message.messageType = reader.int32();
                    break;
                case 8:
                    message.messageCategory = reader.int32();
                    break;
                case 9:
                    message.chatType = reader.int32();
                    break;
                case 10:
                    message.terminalType = reader.string();
                    break;
                case 11:
                    message.protocol = reader.string();
                    break;
                case 12:
                    message.token = reader.string();
                    break;
                case 13:
                    message.data = reader.string();
                    break;
                case 14:
                    message.messageFile = $root.protocol.MessageFile.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protocol.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protocol.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Message message.
         * @function verify
         * @memberof protocol.Message
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Message.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.fromId != null && message.hasOwnProperty("fromId"))
                if (!$util.isString(message.fromId))
                    return "fromId: string expected";
            if (message.toId != null && message.hasOwnProperty("toId"))
                if (!$util.isString(message.toId))
                    return "toId: string expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            if (message.sendTime != null && message.hasOwnProperty("sendTime"))
                if (!$util.isInteger(message.sendTime) && !(message.sendTime && $util.isInteger(message.sendTime.low) && $util.isInteger(message.sendTime.high)))
                    return "sendTime: integer|Long expected";
            if (message.messageType != null && message.hasOwnProperty("messageType"))
                if (!$util.isInteger(message.messageType))
                    return "messageType: integer expected";
            if (message.messageCategory != null && message.hasOwnProperty("messageCategory"))
                if (!$util.isInteger(message.messageCategory))
                    return "messageCategory: integer expected";
            if (message.chatType != null && message.hasOwnProperty("chatType"))
                if (!$util.isInteger(message.chatType))
                    return "chatType: integer expected";
            if (message.terminalType != null && message.hasOwnProperty("terminalType"))
                if (!$util.isString(message.terminalType))
                    return "terminalType: string expected";
            if (message.protocol != null && message.hasOwnProperty("protocol"))
                if (!$util.isString(message.protocol))
                    return "protocol: string expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!$util.isString(message.data))
                    return "data: string expected";
            if (message.messageFile != null && message.hasOwnProperty("messageFile")) {
                var error = $root.protocol.MessageFile.verify(message.messageFile);
                if (error)
                    return "messageFile." + error;
            }
            return null;
        };

        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protocol.Message
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protocol.Message} Message
         */
        Message.fromObject = function fromObject(object) {
            if (object instanceof $root.protocol.Message)
                return object;
            var message = new $root.protocol.Message();
            if (object.id != null)
                message.id = String(object.id);
            if (object.code != null)
                message.code = object.code | 0;
            if (object.fromId != null)
                message.fromId = String(object.fromId);
            if (object.toId != null)
                message.toId = String(object.toId);
            if (object.content != null)
                message.content = String(object.content);
            if (object.sendTime != null)
                if ($util.Long)
                    (message.sendTime = $util.Long.fromValue(object.sendTime)).unsigned = false;
                else if (typeof object.sendTime === "string")
                    message.sendTime = parseInt(object.sendTime, 10);
                else if (typeof object.sendTime === "number")
                    message.sendTime = object.sendTime;
                else if (typeof object.sendTime === "object")
                    message.sendTime = new $util.LongBits(object.sendTime.low >>> 0, object.sendTime.high >>> 0).toNumber();
            if (object.messageType != null)
                message.messageType = object.messageType | 0;
            if (object.messageCategory != null)
                message.messageCategory = object.messageCategory | 0;
            if (object.chatType != null)
                message.chatType = object.chatType | 0;
            if (object.terminalType != null)
                message.terminalType = String(object.terminalType);
            if (object.protocol != null)
                message.protocol = String(object.protocol);
            if (object.token != null)
                message.token = String(object.token);
            if (object.data != null)
                message.data = String(object.data);
            if (object.messageFile != null) {
                if (typeof object.messageFile !== "object")
                    throw TypeError(".protocol.Message.messageFile: object expected");
                message.messageFile = $root.protocol.MessageFile.fromObject(object.messageFile);
            }
            return message;
        };

        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protocol.Message
         * @static
         * @param {protocol.Message} message Message
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Message.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.code = 0;
                object.fromId = "";
                object.toId = "";
                object.content = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.sendTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.sendTime = options.longs === String ? "0" : 0;
                object.messageType = 0;
                object.messageCategory = 0;
                object.chatType = 0;
                object.terminalType = "";
                object.protocol = "";
                object.token = "";
                object.data = "";
                object.messageFile = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.fromId != null && message.hasOwnProperty("fromId"))
                object.fromId = message.fromId;
            if (message.toId != null && message.hasOwnProperty("toId"))
                object.toId = message.toId;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            if (message.sendTime != null && message.hasOwnProperty("sendTime"))
                if (typeof message.sendTime === "number")
                    object.sendTime = options.longs === String ? String(message.sendTime) : message.sendTime;
                else
                    object.sendTime = options.longs === String ? $util.Long.prototype.toString.call(message.sendTime) : options.longs === Number ? new $util.LongBits(message.sendTime.low >>> 0, message.sendTime.high >>> 0).toNumber() : message.sendTime;
            if (message.messageType != null && message.hasOwnProperty("messageType"))
                object.messageType = message.messageType;
            if (message.messageCategory != null && message.hasOwnProperty("messageCategory"))
                object.messageCategory = message.messageCategory;
            if (message.chatType != null && message.hasOwnProperty("chatType"))
                object.chatType = message.chatType;
            if (message.terminalType != null && message.hasOwnProperty("terminalType"))
                object.terminalType = message.terminalType;
            if (message.protocol != null && message.hasOwnProperty("protocol"))
                object.protocol = message.protocol;
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = message.data;
            if (message.messageFile != null && message.hasOwnProperty("messageFile"))
                object.messageFile = $root.protocol.MessageFile.toObject(message.messageFile, options);
            return object;
        };

        /**
         * Converts this Message to JSON.
         * @function toJSON
         * @memberof protocol.Message
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Message.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Message;
    })();

    return protocol;
})();

module.exports = $root;
