package com.hcmute.pose.notifyservice.controller;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.notifyservice.buz.notify.NotifyBuz;
import com.hcmute.pose.notifyservice.model.notify.Notify;
import com.hcmute.pose.notifyservice.payload.notify.NotifyRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notify")
public class NotifyServiceController {
    private static Logger LOGGER = LoggerFactory.getLogger(NotifyBuz.class);
    @Autowired
    private NotifyBuz notifyBuz;

    @PostMapping("/")
    public ResponseEntity createRequest(@Valid @RequestBody NotifyRequest notifyRequest){
        Optional<Notify> notify;
        try{
            notify = notifyBuz.createNotify(notifyRequest);
            return new ResponseEntity(notify, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{receive_id}")
    public ResponseEntity getRequestsById(@PathVariable("receive_id") Long receive_id){
        try{
            List<Notify> requestList = notifyBuz.getNotifyById(receive_id);
            return new ResponseEntity(requestList,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity updatePoint (@PathVariable("id") Long id ,@RequestParam Boolean view ){
        try{
            notifyBuz.updateView(id,view);
            return new ResponseEntity("Update view success",HttpStatus.OK);
        }catch (Exception | TransactionException e){
            LOGGER.error("",e);
            return new ResponseEntity("Update view fail",HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity updatePoint (@PathVariable("id") Long id  ){
        try{
            notifyBuz.deleteRequest(id);
            return new ResponseEntity("Delete notify success",HttpStatus.OK);
        }catch (Exception | TransactionException e){
            LOGGER.error("",e);
            return new ResponseEntity("Delete notify fail",HttpStatus.BAD_REQUEST);
        }
    }
}
