package com.hcmute.pose.employeeservice.service.impl;

import com.hcmute.pose.employeeservice.dao.PositionDao;
import com.hcmute.pose.employeeservice.dao.RoleDao;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Position;
import com.hcmute.pose.employeeservice.model.Role;
import com.hcmute.pose.employeeservice.service.PositionService;
import com.hcmute.pose.employeeservice.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Set;

@Service
public class PositionServiceImpl implements PositionService {

    @Autowired
    private PositionDao positionDao;

    @Override
    public Position createPosition(String name) throws DatabaseException {
        return positionDao.createPosition(name).orElseThrow(()->new DatabaseException("[PositionServiceImpl] Can't create Position"));
    }

    @Override
    public Position findByName(String name) throws DatabaseException {
        return positionDao.findByName(name).orElseThrow(()->new DatabaseException(String.format("[PositionServiceImpl] Can't find Position by name %s",name)));
    }

    @Override
    public Position findById(Long id) throws DatabaseException {
        return positionDao.findById(id).orElseThrow(()->new DatabaseException(String.format("[PositionServiceImpl] Can't find Position by id %s",id)));
    }
}
