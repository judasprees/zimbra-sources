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
 * This class represents a compose form that can be used to compose, reply to, or forward a message. It has a toolbar
 * on top and the actual form below. The form has fields for entering addresses, a subject, and the body of the
 * message. The toolbar has button to cancel or send the message.
 *
 * @author Conrad Damon <cdamon@zimbra.com>
 *
 * TODO: This form sets some hard-coded widths for labels. That won't work when localized.
 */
Ext.define('ZCS.view.mail.ZtComposeForm', {

	extend: 'Ext.Sheet',

	requires: [
		'Ext.form.Panel',
		'Ext.field.Email',
		'Ext.field.Text',
		'Ext.field.TextArea',
		'ZCS.view.contacts.ZtContactField'
	],

	xtype: 'composepanel',

	config: {
		layout: 'fit',
		width: Ext.os.deviceType === "Phone" ? '100%' : '80%',
		height: '100%',
		hidden: true,
		modal: true,
		cls: 'zcs-compose-form'
	},

	initialize: function() {

		var composeForm = this,
			isPhone = Ext.os.deviceType === "Phone",
			toolbar = {
				xtype: 'titlebar',
				cls: 'zcs-item-titlebar',
				docked: 'top',
				title: ZtMsg.compose,
				items: [
					{
						xtype: 'button',
						text: ZtMsg.cancel,
						handler: function() {
							this.up('composepanel').fireEvent('cancel');
						}
					}, {
						xtype: 'button',
						text: ZtMsg.saveDraft,
						hidden: isPhone,
						align: 'right',
						handler: function() {
							this.up('composepanel').fireEvent('saveDraft');
						}
					}, {
						xtype: 'button',
						text: ZtMsg.send,
						align: 'right',
						handler: function() {
							this.up('composepanel').fireEvent('send');
						}
					}
				]
			},
			form = {
				// Scrolling container
				xtype: 'formpanel',
				scrollable: true,
				defaults: {
					inputCls: 'zcs-form-input',
					labelWidth: '5.5em'
				},
				listeners: {
					initialize: function () {
						/**
						 * Fixing dom bug caused by contenteditable where parent scroller
						 * gets pushed outside its fit container. Manually making sure the
						 * scroll container always fills its parent when scrolling starts.
						 */
						this.getScrollable().getScroller().on('scrollstart', function () {
							this.container.dom.scrollIntoView(false);
						});
					}
				},
				items: [{
					minHeight: '2.5em',
					cls: 'zcs-recipient-line',
					layout: {
						type: 'hbox'
					},
					items: [{
						xtype: 'button',
						height: '2.5em',
						itemId: 'showcc',
						cls: 'zcs-show-cc-btn',
						iconCls: 'collapsed',
						handler: function () {
							composeForm.showCcBcc(composeForm.down('#cc').isHidden());
						}
					}, {
						xtype: 'contactfield',
						name: ZCS.constant.TO,
						addressType: ZCS.constant.TO,
						flex: 1,
						label: ZtMsg.toHdr,
						labelWidth: '3em'
					}]
				}, {
					xtype: 'contactfield',
					name: ZCS.constant.CC,
					itemId: 'cc',
					addressType: ZCS.constant.CC,
					minHeight: '2.5em',
					hidden: true,
					label: ZtMsg.ccHdr,
					labelWidth: '5.5em'
				}, {
					xtype: 'contactfield',
					name: ZCS.constant.BCC,
					itemId: 'bcc',
					addressType: ZCS.constant.BCC,
					minHeight: '2.5em',
					hidden: true,
					label: ZtMsg.bccHdr,
					labelWidth: '5.5em'
				}, {
					cls: 'zcs-subjectline',
					height: '2.5em',
					layout: {
						type: 'hbox'
					},
					items: [{
						xtype: 'textfield',
						cls: 'zcs-subject',
						name: 'subject',
						flex: 1,
						height: '2.5em',
						label: ZtMsg.subjectHdr,
						labelWidth: '5.5em',
						listeners: {
							blur: function () {
								//Because this panel is floating, and a keystroke may have forced the whole window to scroll,
								//when we blur, reset the scroll.
								ZCS.htmlutil.resetWindowScroll();
							}
						}
					}]
				}, {
					xtype: 'container',
					items: [{
						xtype: 'component',
						cls: 'zcs-attachments',
						itemId: 'attachments',
						hidden: true,
						listeners: {
							initialize: function () {
								this.element.on('tap', function(e) {
									var el = Ext.fly(e.target);
									if (el.hasCls('zcs-link')) {
										composeForm.fireEvent('showOriginalAttachments');
									}
									if (el.hasCls('zcs-attachment-bubble')) {
										var idParams = ZCS.util.getIdParams(el.dom.id) || {};
										composeForm.fireEvent('originalAttachmentTap', el, {
											menuName:   ZCS.constant.MENU_ORIG_ATT,
											bubbleId:   el.dom.id
										});
									}
								});
							}
						}
					}, {
						xtype: 'filefield',
						height: '2.5em',
						hidden: true,
						listeners: {
							change: function (field, newValue, oldValue) {
								//When the value of this field is reset, newValue is null.
								if (newValue) {
									composeForm.fireEvent('attachmentAdded', field, newValue, oldValue);
								}
							}
						}
					}]
				}, {
					xtype: 'component',
					itemId: 'body',
					html: '<div contenteditable="true" class="zcs-editable zcs-body-field"></div>',
					listeners: {
						painted: function () {
							var heightToSet = Math.max(this.up('container').element.getHeight(), this.element.down('.zcs-body-field').dom.scrollHeight),
								bodyField = this.element.down('.zcs-body-field');

							bodyField.setMinHeight(heightToSet);
						}
					}
				}]
			};

		if (ZCS.constant.IS_ENABLED[ZCS.constant.FEATURE_ADD_ATTACHMENT] && Ext.feature.has.XHR2) {
			form.items[3].items.push({
				xtype: 'component',
				cls: 'x-form-label x-form-label-nowrap x-field zcs-toggle-field',
				itemId: 'attach',
				html: ZtMsg.attach,
				width: 80,
				listeners: {
					initialize: function () {
						var comp = this;
						this.element.on('tap', function () {
							composeForm.doAttach();
						});
					}
				}
			});
		}

		this.add([
			toolbar,
			form
		]);
	},

	// TODO: Separate toggles for CC and BCC
	showCcBcc: function(show) {
		if (show) {
			this.down('#cc').show();
			this.down('#bcc').show();
			this.down('#showcc').setIconCls('expanded');
		}
		else {
			this.down('#cc').hide();
			this.down('#bcc').hide();
			this.down('#showcc').setIconCls('collapsed');
		}
	},

	doAttach: function () {
		this.down('filefield').element.down('input').dom.click();
	},

	resetForm: function () {
		this.down('.formpanel').reset();
		this.down('#cc').hide();
		this.down('#bcc').hide();
		this.down('#showcc').setIconCls('collapsed');
		//This is necessary to reset the file input inside of the form.
		this.down('.formpanel').element.dom.reset();
		//Reset this so we don't parse out old attachment info next time we come to the form.
		this.down('#attachments').setHtml('');
	}
});