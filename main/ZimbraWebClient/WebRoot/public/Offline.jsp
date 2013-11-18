<!--
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
-->
<html manifest="<%=request.getParameter("url")%>">
<head>
    <script>
        window.onload = function(){
            if (navigator.onLine){
                if (<%=request.getParameter("reload")%>){
                    window.applicationCache.addEventListener('updateready', function(e) {
                        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                            window.parent.location.reload();
                        }
                    }, false);
                }
                window.applicationCache.addEventListener('cached', function(e) {
                    window.parent.ZmOffline._checkAppCacheDone();
                }, false);
                window.applicationCache.addEventListener('noupdate', function(e) {
                    window.parent.ZmOffline._checkAppCacheDone();
                }, false);
            }
        }
</script>
</head>
    <body></body>
</html>
