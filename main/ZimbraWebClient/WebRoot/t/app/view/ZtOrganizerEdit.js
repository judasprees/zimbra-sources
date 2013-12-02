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
 *
 *
 *  This view displays the interface for editing an organizer.
 *
 */
Ext.define('ZCS.view.ZtOrganizerEdit', {

    extend: 'ZCS.common.ZtLeftMenu',

    requires: [
        'Ext.ux.ColorSelector'
    ],

    xtype: 'organizeredit',

    config: {

        /**
         *  Record that represents the folder being edited.
         */
        folder: undefined,

        /**
         *  Record that represents the location of the folder being edited.
         */
        parentFolder: undefined,

        /**
         *  Record that represents the tag being edited.
         */
        tag: undefined,

        layout: 'card',
        items: [{
            xtype: 'titlebar',
            docked: 'top',
            items: [{
                cls: 'zcs-text-btn',
                text: 'Cancel',
                action: 'cancel',
                align: 'left'
            }, {
                cls: 'zcs-text-btn',
                text: 'Save',
                action: 'save',
                align: 'right'
            }]
        }, {
            xtype: 'container',
            itemId: 'folderEditCard',
            cls: 'zcs-folder-edit',
            padding: 12,
            flex: 1,
            items: [{
                xtype: 'container',
                cls: 'zcs-textfield',
                items: [{
                    xtype: 'textfield',
                    placeHolder: 'Folder name',
                    itemId: 'folderName',
                    clearIcon: false
                }]
            }, {
                xtype: 'label',
                html: 'Location:'
            }, {
                xtype: 'button',
                itemId: 'folderLocation',
                cls:   'zcs-folder-loc-btn',
                iconCls: 'forward',
                iconAlign: 'right'
            }, {
                xtype: 'container',
                items: [{
                    xtype: 'button',
                    action: 'delete',
                    cls:   'zcs-folder-del-btn',
                    text: 'Delete',
                    centered: true
                }]
            }]
        }, {
            xtype: 'container',
            itemId: 'tagEditCard',
            cls: 'zcs-folder-edit',
            padding: 12,
            flex: 1,
            items: [{
                xtype: 'container',
                cls: 'zcs-textfield',
                items: [{
                    xtype: 'textfield',
                    placeHolder: 'Tag name',
                    itemId: 'tagName',
                    clearIcon: false
                }]
            }, {
                xtype: 'label',
                html: 'Color:'
            }, {
                xtype: 'colorselector',
                itemId: 'colorPicker'
           }]
        }, {
            xtype: 'container',
            flex: 1,
            itemId: 'locationSelectionCard',
            layout: 'fit'
        }]
    },

    initialize: function() {
        var folderLocationSelector = this.down('#locationSelectionCard'),
            selectorData,
            selectorStore;

        // Prepare a store for the folder-selector list
        selectorData = ZCS.session.getOrganizerData('mail', null, 'location');
        selectorData = selectorData.filter(function (item) {return item.folderType == 'mailFolder';});
        selectorStore = Ext.create('ZCS.store.ZtOrganizerStore', {
            storeId:    'foldereditlocationselector',
            data:       {items: selectorData}
        });

        // Create the nested folder-selector list and add it to its card
        var selectorList = Ext.create('ZCS.view.ZtOrganizerList', {
            flex:           1,
            displayField:   'displayName',
            store:          selectorStore,
            grouped:        true,
            editing:        true,
            title:          'Select Location:',
            updateTitleText:    false,
            useTitleAsBackText: false
        });
        folderLocationSelector.add(selectorList);

        this.setDimensions();
        this.callParent(arguments);
    }

});