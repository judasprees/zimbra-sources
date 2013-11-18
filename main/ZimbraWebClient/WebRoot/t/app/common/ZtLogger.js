//<feature logger>
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2013 Zimbra Software, LLC.
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
 * This class adds a bit of custom logging to Ext.Logger. You can use it to limit
 * logging to only the messages you want to see, related to a particular feature
 * or problem, rather than to a set priority such as "warn". For example, assume
 * you want to debug code involving conversation display. First, you come up with a custom
 * log level, say "conv", and define it below in the list of priorities. That will result
 * in the creation of the function Ext.Logger.msg, which you then use to log whatever you
 * want about conversation display. To see those messages, you need to login with the
 * query parameter "debug" set to the custom level you want to see:
 *
 *     http://localhost:7070/?&client=touch&breakpoint&debug=conv
 *
 * That way, you'll only see "conv" messages logged to the console.
 *
 * To get something logged regardless of what the custom level is, use the special
 * priority called "force" via Ext.Logger.force().
 *
 * @author Conrad Damon <cdamon@zimbra.com>
 */
Ext.define('ZCS.common.ZtLogger', {

	extend: 'Ext.log.Logger',
	requires: [
		'Ext.log.writer.Console',
		'Ext.log.formatter.Default'
	],

	statics: {
        defaultPriority: 'info',
		priorities: [
			'force',        // special priority that means "always log this"

			// custom levels
			'iframe',
			'conv',
			'poll',
			'image',
			'event'
		]
	},

	log: function(message, priority, callerId) {

		var custom = ZCS.session.getDebugLevel(),
			priorities = Ext.log.Logger.priorities,
			priorityValue = priorities[priority];

		if (priorityValue && priorityValue >= 2) {
			message = '[' + priority.toUpperCase() + '] ' + message;
		}
		return ((priorityValue && !custom) || priority === 'force' || priority === custom) ? this.callParent(arguments) : this;
	}

}, function() {

	// copy what Ext.log.Logger does, using an array instead of an object
	Ext.each(this.priorities, function(priority) {
		this.override(priority, function(message, callerId) {
			if (!callerId) {
				callerId = 1;
			}

			if (typeof callerId == 'number') {
				callerId += 1;
			}

			this.log(message, priority, callerId);
		});
	}, this);
});
//</feature>
