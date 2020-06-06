package com.hcmute.pose.notifyservice.controller;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.notifyservice.buz.request.RequestServiceBuz;
import com.hcmute.pose.notifyservice.model.request.Request;
import com.hcmute.pose.notifyservice.payload.request.RequestRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class RequestServiceController {
    private static Logger LOGGER = LoggerFactory.getLogger(RequestServiceBuz.class);
    @Autowired
    private RequestServiceBuz requestServiceBuz;

    @PostMapping("/")
    public ResponseEntity createRequest(@Valid @RequestBody RequestRequest requestRequest){
        Request request;
        try{
            request = requestServiceBuz.createRequest(requestRequest);
            return new ResponseEntity(request, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/")
    public ResponseEntity getRequests(){
        try{
            List<Request> requestList = requestServiceBuz.getRequests();
            return new ResponseEntity(requestList,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{employeeid}")
    public ResponseEntity getRequestsById(@PathVariable("employeeid") Long employeeid){
        try{
            List<Request> requestList = requestServiceBuz.getRequestByEmployee(employeeid);
            return new ResponseEntity(requestList,HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity updatePoint (@PathVariable("id") Long id ,@RequestParam Boolean confirm ){
        try{
            requestServiceBuz.updateRequest(id,confirm);
            return new ResponseEntity("Update confirm success",HttpStatus.OK);
        }catch (Exception | TransactionException e){
            LOGGER.error("",e);
            return new ResponseEntity("update confirm fail",HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity updatePoint (@PathVariable("id") Long id  ){
        try{
            requestServiceBuz.deleteRequest(id);
            return new ResponseEntity("Delete confirm success",HttpStatus.OK);
        }catch (Exception | TransactionException e){
            LOGGER.error("",e);
            return new ResponseEntity("Delete confirm fail",HttpStatus.BAD_REQUEST);
        }
    }

}
