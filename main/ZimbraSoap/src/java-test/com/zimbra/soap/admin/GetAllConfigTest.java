/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Server
 * Copyright (C) 2011, 2012, 2013 Zimbra Software, LLC.
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
package com.zimbra.soap.admin;

import java.io.InputStream;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.Logger;
import org.apache.log4j.Level;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import com.zimbra.common.soap.Element;
import com.zimbra.common.soap.Element.KeyValuePair;
import com.zimbra.soap.admin.message.GetAllConfigResponse;
import com.zimbra.soap.admin.type.Attr;

/**
 * Unit test for {@link GetAllConfigResponse}.
 * com.zimbra.soap.admin.WSDLAdminTest.getAllConfigTest currently failing
 * due to what looks like metro issue : http://java.net/jira/browse/JAX_WS-807
 * This test uses a capture of the response which appeared to cause issues
 * to make sure that JAXB unmarshalling is ok.
 */
public class GetAllConfigTest {

    private static final Logger LOG = Logger.getLogger(GetAllConfigTest.class);
    
    private static Unmarshaller unmarshaller;

    static {
        BasicConfigurator.configure();
        Logger.getRootLogger().setLevel(Level.INFO);
        LOG.setLevel(Level.INFO);
    }

    @BeforeClass
    public static void init() throws Exception {
        JAXBContext jaxb = JAXBContext.newInstance(GetAllConfigResponse.class);
        unmarshaller = jaxb.createUnmarshaller();
    }

    @Test
    public void unmarshallGetAllConfigResponseTest()
    throws Exception {
        InputStream is = getClass().getResourceAsStream("GetAllConfigResponse.xml");
        Element elem = Element.parseXML(is);
        List<KeyValuePair> kvps = elem.listKeyValuePairs();
        is.close();
        is = getClass().getResourceAsStream("GetAllConfigResponse.xml");
        GetAllConfigResponse resp = (GetAllConfigResponse) unmarshaller.unmarshal(is);
        Assert.assertNotNull("Response", resp);
        List<Attr> attrs = resp.getAttrs();
        LOG.info("unmarshallGetAllConfigResponseTest:KVPS from elem=" + kvps.size() + " from jaxb=" + attrs.size());
        Assert.assertTrue("Have some attrs", attrs.size() > 20);
        Assert.assertEquals("Number of attrs from elem and from jaxb agree", kvps.size(), attrs.size());
    }
}
