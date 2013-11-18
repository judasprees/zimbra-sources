/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2012, 2013 Zimbra Software, LLC.
 * 
 * The contents of this file are subject to the Zimbra Public License
 * Version 1.4 ("License"); you may not use this file except in
 * compliance with the License.  You may obtain a copy of the License at
 * http://www.zimbra.com/license.
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * ***** END LICENSE BLOCK *****
 */

/**
 * This class represents a conversation, which is made up of one or more messages.
 *
 * @author Conrad Damon <cdamon@zimbra.com>
 */
var urlBase = ZCS.constant.SERVICE_URL_BASE;

Ext.define('ZCS.model.mail.ZtConv', {

	extend: 'ZCS.model.mail.ZtMailItem',

	requires: [
		'ZCS.model.mail.ZtConvReader',
		'ZCS.model.mail.ZtConvWriter'
	],

	config: {

		fields: [
			{ name: 'senders', type: 'string' },
			{ name: 'numMsgs',  type: 'int' }
		],

		proxy: {
			type: 'soapproxy',
			api: {
				create  : '',
				read    : urlBase + 'SearchRequest',
				update  : urlBase + 'ConvActionRequest',
				destroy : urlBase + 'ConvActionRequest'
			},
			reader: 'convreader',
			writer: 'convwriter'
		},

		messages: []
	},

	handleModifyNotification: function(modify) {

		this.callParent(arguments);

		if (modify.n) {
			this.set('numMsgs', modify.n);
		}
		if (modify.addresses) {
			this.set('addresses', modify.addresses);
		}
		if (modify.senders) {
			this.set('senders', modify.senders);
		}
	}
});
