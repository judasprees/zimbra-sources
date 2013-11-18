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
 * This controller manages the app tabs, and is responsible for the initial construction
 * of the tab panel. Stuff that is not specific to a particular app can be found here.
 *
 * @author Conrad Damon <cdamon@zimbra.com>
 */
Ext.define('ZCS.controller.ZtMainController', {

	extend: 'ZCS.controller.ZtBaseController',

	requires: [
		'Ext.MessageBox'
	],

	mixins: {
		organizerNotificationHandler: 'ZCS.common.ZtOrganizerNotificationHandler'
	},

	config: {

		refs: {
			tabBar: 'tabbar',
			mainView: 'ztmain',
			settingsMenu: 'list[itemId=settingsMenu]'
		},

		control: {
			tabBar: {
				showMenu: 'showMenu'
			},
			mainView: {
				activeitemchange: function (tabPanel, tab, oldTab) {
				    ZCS.app.fireEvent('applicationSwitch', tab.config.app);
				    ZCS.session.setActiveApp(tab.config.app);
				},
				logout:     'doLogout'
			},
			settingsMenu: {
				itemtap:    'onMenuItemSelect'
			}
		}
	},

	launch: function() {

		// Initialize the main view
		Ext.Viewport.add(Ext.create('ZCS.view.ZtMain'));
		ZCS.app.on('serverError', this.handleError, this);
		window.onbeforeunload = this.unloadHandler;

		// handle organizer notifications
		ZCS.app.on('notifyFolderCreate', this.handleOrganizerCreate, this);
		ZCS.app.on('notifySearchCreate', this.handleOrganizerCreate, this);
		ZCS.app.on('notifyTagCreate', this.handleOrganizerCreate, this);

		ZCS.app.on('notifyFolderDelete', this.handleOrganizerDelete, this);
		ZCS.app.on('notifySearchDelete', this.handleOrganizerDelete, this);
		ZCS.app.on('notifyTagDelete', this.handleOrganizerDelete, this);

		ZCS.app.on('notifyFolderChange', this.handleOrganizerChange, this);
		ZCS.app.on('notifySearchChange', this.handleOrganizerChange, this);
		ZCS.app.on('notifyTagChange', this.handleOrganizerChange, this);

		ZCS.app.on('notifyRefresh', this.handleRefresh, this);
	},

	/**
	 * Logs off the application
	 */
	doLogout: function() {
        var qs = location.search;
        var pairs = [];
        var j = 0;
        var logoutUrl;
        if (qs) {
            var qsArgs = qs.split("&");
            for (var i = 0; i < qsArgs.length; i++) {
                var f = qsArgs[i].split("=");
                if (f[0] != 'loginOp') {
                    pairs[j++] = [f[0], f[1]].join("=");
                }
            }
            pairs[j] = ["loginOp", "logout"].join("=");
            logoutUrl = "/" + pairs.join("&");
        }  else {
            logoutUrl = "/?loginOp=logout";
        }
        //Append client=touch param to the logout url
        logoutUrl += "&client=touch";
		window.location.href = logoutUrl;
	},

	/**
	 * Cancels a pending poll if there is one, then sets up to poll after an interval.
	 */
	schedulePoll: function() {

		if (!ZCS.session.getSessionId()) {
			return;
		}

		if (this.pollId) {
			clearTimeout(this.pollId);
		}
		//<debug>
		Ext.Logger.poll('scheduling poll');
        //</debug>
		this.pollId = Ext.defer(this.sendPoll, ZCS.constant.POLL_INTERVAL * 1000, this);
	},

	/**
	 * Sends a poll to the server to fetch any pending notifications. Borrows the conv store's
	 * proxy to send the request.
	 */
	sendPoll: function() {

        //<debug>
		Ext.Logger.poll('sending poll');
        //</debug>
		var server = Ext.getStore('ZtConvStore').getProxy(),
			options = {
				url: ZCS.constant.SERVICE_URL_BASE + 'NoOpRequest',
				jsonData: server.getWriter().getSoapEnvelope(null, null, 'NoOp')
			};

		server.sendSoapRequest(options);
	},

	/**
	 * Generic handling for server errors. We log the user out if it is a fatal error.
	 * See ZtMsg for error codes.
	 *
	 * @param {Object}  fault       fault object from server
	 */
	handleError: function(fault) {

		var error = fault && fault.Detail && fault.Detail.Error && fault.Detail.Error.Code,
			msg = ZtMsg[error] || ZtMsg.unknownError,
			title = ZtMsg[error + '.title'] || ZtMsg.error,
			args;

		if (error === 'mail.SEND_ABORTED_ADDRESS_FAILURE') {
			args = Ext.Array.map(fault.Detail.Error.a, function(node) {
				return node._content;
			});
		}

		var text = Ext.String.format(msg, args);

		if (ZCS.constant.IS_FATAL_ERROR[error]) {
			if (this.pollId) {
				clearTimeout(this.pollId);
				this.pollId = null;
			}
			ZCS.session.setSessionId(null);

			Ext.Msg.alert(title, text, function() {
				this.doLogout();
			}, this);
		}
		else {
			Ext.Msg.alert(title, text);
		}
	},

	/**
	 * Note: Mobile Safari doesn't support onbeforeunload, so this is semi-useless (should work on
	 * Android). See http://stackoverflow.com/questions/3239834/window-onbeforeunload-not-working-on-the-ipad.
	 *
	 * @return {String|false}   a string if there are unsaved changes
	 */
	unloadHandler: function() {

		var composeCtlr = ZCS.app.getComposeController(),
			contactCtlr = ZCS.app.getContactController(),
			isDirty = (composeCtlr && composeCtlr.isDirty()) || (contactCtlr && contactCtlr.isDirty());

		if (isDirty) {
			return ZtMsg.appExitWarning;
		}
	},

	/**
	 * Returns a list of known overviews.
	 * @return {Array}  list of ZtOverview
	 * @private
	 */
	getOverviewList: function() {
		return Ext.ComponentQuery.query('overview');
	},

	/**
	 * An organizer has just been created. We need to add it to our session data,
	 * and insert it into the organizer list component.
	 *
	 * @param {ZtOrganizer}     folder          undefined (arg not passed)
	 * @param {Object}          notification    JSON with organizer data
	 */
	handleOrganizerCreate: function(folder, notification) {
		this.addOrganizer(this.getOverviewList(), notification, 'overview');
	},

	/**
	 * An organizer has just changed. If it is a move, we need to relocate it within
	 * the organizer nested list.
	 *
	 * @param {ZtOrganizer}     folder          organizer that changed
	 * @param {Object}          notification    JSON with new data
	 */
	handleOrganizerChange: function(folder, notification) {
		this.modifyOrganizer(this.getOverviewList(), folder, notification, 'overview');
	},

	/**
	 * An organizer has been hard-deleted. Remove it from overview stores.
	 *
	 * @param {ZtOrganizer}     folder          organizer that changed
	 */
	handleOrganizerDelete: function(folder) {
		this.removeOrganizer(this.getOverviewList(), folder);
	},

	/**
	 * We got a <refresh> block. Reload the overviews.
	 */
	handleRefresh: function() {
		this.reloadOverviews(this.getOverviewList(), 'overview');
	}
});
