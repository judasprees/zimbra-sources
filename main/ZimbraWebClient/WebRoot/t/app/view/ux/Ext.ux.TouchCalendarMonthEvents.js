/*
 * ***** BEGIN LICENSE BLOCK *****
 *
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
 *
 * ***** END LICENSE BLOCK *****
 */
/**
 * Ext.ux.TouchCalendarMonthEvents
 */
Ext.define('Ext.ux.TouchCalendarMonthEvents', {

    extend: 'Ext.ux.TouchCalendarEventsBase',

	eventFilterFn: function(record, id, currentDateTime){
		var startDate = Ext.Date.clearTime(record.get(this.getPlugin().getStartEventField()), true).getTime(),
			endDate = Ext.Date.clearTime(record.get(this.getPlugin().getEndEventField()), true).getTime();

		return (startDate <= currentDateTime) && (endDate >= currentDateTime);
	},

	/**
	 * After the Event store has been processed, this method recursively creates and positions the Event Bars
	 * @method
	 * @private
	 * @param {Ext.data.Store} store The store to process - used to then recurse into
	 */
	renderEventBars: function(store){
		var me = this,
            dateIndices = [],
            moreEventsIndices = [];

		store.each(function(record){
			var eventRecord = this.getPlugin().getEventRecord(record.get('EventID')),
				dayEl = this.getCalendar().getDateCell(record.get('Date')),
				doesWrap = this.eventBarDoesWrap(record),
				hasWrapped = this.eventBarHasWrapped(record),
				cssClasses  = [
					this.getPlugin().getEventBarCls(),
					'e-' + record.get('EventID'),
					(doesWrap ? ' wrap-end' : ''),
					(hasWrapped ? ' wrap-start' : ''),
					eventRecord.get(this.getPlugin().getCssClassField())
                ],
                dateIndex = this.getCalendar().getStore().findBy(function(dateRec){
                    return dateRec.get('date').getTime() === Ext.Date.clearTime(record.get('Date'), true).getTime();
                }, this),
                frequency = [], // array of frequency
                max = 0,  // holds the max frequency element.
                result,   // holds the max frequency.
                index,
                eventBar;

            dateIndices.push(dateIndex);

            dateIndices.sort(function(a, b) { return a - b });

            // ZCS - moreEventsIndices stores indices that have more event link
            if (moreEventsIndices.indexOf(dateIndex) < 0) {

                // ZCS - Fix for restricting number of events to display in Month view
                for (index in dateIndices) {
                    frequency[dateIndices[index]]=(frequency[dateIndices[index]] || 0)+1; // increment frequency.

                    if (frequency[dateIndices[index]] > max) { // is this frequency > max so far ?
                        max = frequency[dateIndices[index]];  // update max.
                        result = dateIndices[index];          // update result.
                    }
                }

                if (max <= 4) {
                    if (max <= 3) {
                        // create the event bar
                        eventBar = Ext.DomHelper.append(this.getPlugin().getEventWrapperEl(), {
                            tag: 'div',
                            style: {
                                'background-color': eventRecord.get(this.getPlugin().colourField)
                            },
                            html: this.getPlugin().getEventBarTpl().apply(eventRecord.data),
                            eventID: record.get('EventID'),
                            cls: cssClasses.join(' ')
                        }, true);
                    }
                    else {
                        dateIndices = []; // ZCS - clear all date indices
                        moreEventsIndices.push(result); // push all those date indices with occurrence > 4

                        // ZCS - creates a link 'more events'
                        eventBar = Ext.DomHelper.append(this.getPlugin().getEventWrapperEl(), {
                            tag: 'div',
                            style: {
                                'background-color': eventRecord.get(this.getPlugin().colourField)
                            },
                            html: 'More events',
                            onClick: "ZCS.app.getCalendarController().toggleCalView('day'," + record.get('Date').getTime() + ")",
                            cls: 'more-events'
                        }, true);
                    }

                    if (eventBar) {
                        if (this.allowEventDragAndDrop) {

                            new Ext.util.Draggable(eventBar, {
                                revert: true,

                                /**
                                 * Override for Ext.util.Draggable's onStart method to process the Event Bar's element before dragging
                                 * and raise the 'eventdragstart' event
                                 * @method
                                 * @private
                                 * @param {Event} e
                                 */
                                onStart: function(e){

                                    var draggable = this,
                                        eventID = draggable.el.getAttribute('eventID'),
                                        eventRecord = me.getPlugin().getEventRecord(eventID),
                                        eventBarRecord = me.getEventBarRecord(eventID);

                                    // Resize dragged Event Bar so it is 1 cell wide
                                    draggable.el.setWidth(draggable.el.getWidth() / eventBarRecord.get('BarLength'));
                                    // Reposition dragged Event Bar so it is in the middle of the User's finger.
                                    draggable.el.setLeft(e.startX - (draggable.el.getWidth() / 2));

                                    // hide all linked Event Bars
                                    me.calendar.element.select('div.' + eventRecord.internalId, me.calendar.element.dom).each(function(eventBar){
                                        if (eventBar.dom !== draggable.el.dom) {
                                            eventBar.hide();
                                        }
                                    }, this);

                                    Ext.util.Draggable.prototype.onStart.apply(this, arguments);

                                    me.calendar.fireEvent('eventdragstart', draggable, eventRecord, e);

                                    return true;
                                }
                            });
                        }

                        var headerHeight = this.getCalendar().element.select('thead', this.getCalendar().element.dom).first().getHeight(),
                            bodyHeight = this.getCalendar().element.select('tbody', this.getCalendar().element.dom).first().getHeight(),
                            rowCount = this.getCalendar().element.select('tbody tr', this.getCalendar().element.dom).getCount(),
                            rowHeight = bodyHeight/rowCount,
                            rowIndex = Math.floor(dateIndex / 7) + 1,
                            eventY = headerHeight + (rowHeight * rowIndex),
                            barPosition = record.get('BarPosition'),
                            barLength = record.get('BarLength'),
                            dayCellX = (this.getCalendar().element.getWidth() / 7) * dayEl.dom.cellIndex,
                            dayCellWidth = dayEl.getWidth(),
                            eventBarHeight = eventBar.getHeight(),
                            spacing = this.getPlugin().getEventBarSpacing();

                        // set sizes and positions
                        eventBar.setLeft((dayEl.dom.offsetLeft + (hasWrapped ? 0 : 4)) || (dayCellX + (hasWrapped ? 0 : spacing)));
                        eventBar.setTop(eventY - eventBarHeight - (barPosition * eventBarHeight + (barPosition * spacing) + spacing) - 5);
                        eventBar.setWidth((dayCellWidth * barLength) - (spacing * (doesWrap ? (doesWrap && hasWrapped ? 0 : 1) : 2)) - 5);

                        if (record.linked().getCount() > 0) {
                            this.renderEventBars(record.linked());
                        }
                    }
                }

            }

		}, this);
	}

});