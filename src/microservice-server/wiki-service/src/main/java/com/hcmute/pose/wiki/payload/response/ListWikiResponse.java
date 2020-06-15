package com.hcmute.pose.wiki.payload.response;

import java.util.ArrayList;
import java.util.Collection;

public class ListWikiResponse extends ArrayList<WikiResponse> {
    public ListWikiResponse() {

    }

    public ListWikiResponse(Collection<? extends WikiResponse> c) {
        super(c);
    }
}
