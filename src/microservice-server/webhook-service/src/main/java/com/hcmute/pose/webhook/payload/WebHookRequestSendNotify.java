package com.hcmute.pose.webhook.payload;

public class WebHookRequestSendNotify {
    private Long idPro;
    private String user;
    private String proName;
    private String data;

    public WebHookRequestSendNotify(Long idPro, String user, String proName, String data) {
        this.idPro = idPro;
        this.user = user;
        this.proName = proName;
        this.data = data;
    }

    public Long getIdPro() {
        return idPro;
    }

    public void setIdPro(Long idPro) {
        this.idPro = idPro;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getProName() {
        return proName;
    }

    public void setProName(String proName) {
        this.proName = proName;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
