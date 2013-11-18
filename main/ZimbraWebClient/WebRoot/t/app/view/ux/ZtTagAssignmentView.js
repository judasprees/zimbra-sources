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
 * This class shows a user a list of tags to apply to the configured component/record.
 *
 * @author Macy Abbey
 */
Ext.define('ZCS.view.ux.ZtTagAssignmentView', {

	extend: 'ZCS.view.ux.ZtAssignmentView',

	alias: 'widget.tagview',

	config: {
		/**
		 * @cfg {Object} Organizer tree with which to populate the store
		 */
		organizerTree: null
	},

	constructor: function (config) {

		var cfg = config || {},
			organizerData = {
			items: cfg.organizerTree
		};

		var organizerStore = Ext.create('ZCS.store.ZtOrganizerStore', {
			storeId: [ cfg.app, 'assignment' ].join('-')
		});
		organizerStore.setRoot(organizerData);

		cfg.list = {
			xtype:              'foldersublist',    // tags are a list (no children)
			grouped:            false,
			ui:                 'dark',
			title:              cfg.listTitle,
			store:              organizerStore,
			canDisableItems:    true,
			itemTpl:            ZCS.template.TagAssignmentListItem
		};

		this.callParent([cfg]);
	}
});
