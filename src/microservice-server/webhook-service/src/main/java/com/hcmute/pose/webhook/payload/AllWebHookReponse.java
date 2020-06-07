package com.hcmute.pose.webhook.payload;

import com.hcmute.pose.webhook.model.WebHookData;

import java.util.List;

public class AllWebHookReponse {
    List<WebHookData> webHookReponseList;

    public AllWebHookReponse(List<WebHookData> webHookReponseList) {
        this.webHookReponseList = webHookReponseList;
    }

    public List<WebHookData> getWebHookReponseList() {
        return webHookReponseList;
    }

    public void setWebHookReponseList(List<WebHookData> webHookReponseList) {
        this.webHookReponseList = webHookReponseList;
    }
}
