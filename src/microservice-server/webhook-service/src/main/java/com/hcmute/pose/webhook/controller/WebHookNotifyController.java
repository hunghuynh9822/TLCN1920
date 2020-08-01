package com.hcmute.pose.webhook.controller;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.webhook.buz.WebHookBuz;
import com.hcmute.pose.webhook.model.WebHookData;
import com.hcmute.pose.webhook.payload.AllWebHookReponse;
import com.hcmute.pose.webhook.payload.NotifyResponse;
import com.hcmute.pose.webhook.payload.WebHookRequest;
import com.hcmute.pose.webhook.payload.WebHookRequestSendNotify;
import okhttp3.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/webhook")
public class WebHookNotifyController {
    private static Logger LOGGER = LoggerFactory.getLogger(WebHookNotifyController.class);

    static OkHttpClient client = new OkHttpClient();
    @Autowired
    private WebHookBuz webHookBuz;

    @PostMapping("/send/create_task")
    public ResponseEntity SendCreateTask(@Valid @RequestBody WebHookRequestSendNotify webHookRequestSendNotify) throws IOException {
        try {
            AllWebHookReponse allWebHookReponse = webHookBuz.getWebhook(webHookRequestSendNotify.getIdPro());
            List<Response> responses = new ArrayList<>();
            for (WebHookData webHookData: allWebHookReponse.getWebHookReponseList()) {
                LOGGER.info(webHookData.getName()+" abc");
                if (webHookData.isCreateTask() == true) {
                    String BASE_URL = "https://api.telegram.org/" + webHookData.getBotToken();
                    okhttp3.RequestBody formBody = new FormBody.Builder()
                            .add("chat_id", webHookData.getChatId())
                            .add("parse_mode" , "HTML")
                            .add("text", "Project : " +webHookRequestSendNotify.getProName()+ "\nUser : "+webHookRequestSendNotify.getUser()+"\nText : "+webHookRequestSendNotify.getData()).build();

                    final Request request = new Request.Builder()
                            .url(BASE_URL + "/sendMessage")
                            .post(formBody).build();

                    final Call call = client.newCall(request);
                    final Response response = call.execute();
                    Thread.sleep(3000);
                    responses.add(response);
                }
            }
            Map<String, Object> messages = new HashMap<>();
            if (responses.isEmpty()){
                messages.put("result", "Not register yet");
                return new ResponseEntity(new NotifyResponse(messages), HttpStatus.OK);
            }else{
                messages.put("result", "Success");
                return new ResponseEntity(new NotifyResponse(messages), HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping("/send/update_task")
    public ResponseEntity SendUpdateTask(@Valid @RequestBody WebHookRequestSendNotify webHookRequestSendNotify) throws IOException {
        try {
            AllWebHookReponse allWebHookReponse = webHookBuz.getWebhook(webHookRequestSendNotify.getIdPro());
            List<Response> responses = new ArrayList<>();
            for (WebHookData webHookData: allWebHookReponse.getWebHookReponseList()) {
                if (webHookData.isUpdateTask() == true) {
                    String BASE_URL = "https://api.telegram.org/" + webHookData.getBotToken();
                    okhttp3.RequestBody formBody = new FormBody.Builder()
                            .add("chat_id", webHookData.getChatId())
                            .add("parse_mode" , "HTML")
                            .add("text", "Project : " +webHookRequestSendNotify.getProName()+ "\nUser : "+webHookRequestSendNotify.getUser()+"\nText : "+webHookRequestSendNotify.getData()).build();

                    final Request request = new Request.Builder()
                            .url(BASE_URL + "/sendMessage")
                            .post(formBody).build();

                    final Call call = client.newCall(request);
                    final Response response = call.execute();
                    Thread.sleep(3000);
                    responses.add(response);
                }
            }
            Map<String, Object> messages = new HashMap<>();
            if (responses.isEmpty()){
                messages.put("result", "Not register yet");
                return new ResponseEntity(new NotifyResponse(messages), HttpStatus.OK);
            }else{
                messages.put("result", "Success");
                return new ResponseEntity(new NotifyResponse(messages), HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping("/send/update_state")
    public ResponseEntity SendUpdateState(@Valid @RequestBody WebHookRequestSendNotify webHookRequestSendNotify) throws IOException {
        try {
            AllWebHookReponse allWebHookReponse = webHookBuz.getWebhook(webHookRequestSendNotify.getIdPro());
            List<Response> responses = new ArrayList<>();
            for (WebHookData webHookData: allWebHookReponse.getWebHookReponseList()) {
                if (webHookData.isUpdateState() == true) {
                    String BASE_URL = "https://api.telegram.org/" + webHookData.getBotToken();
                    okhttp3.RequestBody formBody = new FormBody.Builder()
                            .add("chat_id", webHookData.getChatId())
                            .add("parse_mode" , "HTML")
                            .add("text", "Project : " +webHookRequestSendNotify.getProName()+ "\nUser : "+webHookRequestSendNotify.getUser()+"\nText : "+webHookRequestSendNotify.getData()).build();

                    final Request request = new Request.Builder()
                            .url(BASE_URL + "/sendMessage")
                            .post(formBody).build();

                    final Call call = client.newCall(request);
                    final Response response = call.execute();
                    Thread.sleep(3000);
                    responses.add(response);
                }
            }
            Map<String, Object> messages = new HashMap<>();
            if (responses.isEmpty()){
                messages.put("result", "Not register yet");
                return new ResponseEntity(new NotifyResponse(messages), HttpStatus.OK);
            }else{
                messages.put("result", "Success");
                return new ResponseEntity(new NotifyResponse(messages), HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
