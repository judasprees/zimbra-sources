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
 * This class represents a calendar
 *
 * @author Ajinkya Chhatre <achhatre@zimbra.com>
 */

var urlBase = ZCS.constant.SERVICE_URL_BASE;
Ext.define('ZCS.model.calendar.ZtCalendar', {

    extend: 'ZCS.model.ZtItem',

    requires: [
        'ZCS.model.calendar.ZtCalendarReader',
        'ZCS.model.calendar.ZtCalendarWriter'
    ],

    config: {
        fields: [
            {
                name: 'event',
                type: 'string'
            },
            {
                name: 'title',
                type: 'string'
            },
            {
                name: 'start',
                type: 'date',
                dateFormat: 'c'
            },
            {
                name: 'end',
                type: 'date',
                dateFormat: 'c'
            },
            {
                name: 'invId',
                type: 'string'
            },
            {
                name: 'isAllDay',
                type: 'boolean'
            }
        ],

        proxy: {
            type: 'soapproxy',
            api: {
                read: urlBase + 'SearchRequest',
                create: urlBase + 'CreateAppointmentRequest'
            },

            reader: 'calendarreader',
            writer: 'calendarwriter'
        }
    }
});
