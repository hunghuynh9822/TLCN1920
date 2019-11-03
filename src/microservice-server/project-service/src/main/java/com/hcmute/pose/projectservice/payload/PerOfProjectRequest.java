package com.hcmute.pose.projectservice.payload;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class PerOfProjectRequest {


    private List<Long> idListPer;


    private Long idPro;

    public PerOfProjectRequest( List<Long> idListPer,  Long idPro) {
        this.idListPer = idListPer;
        this.idPro = idPro;
    }

    public List<Long> getIdListPer() {
        return idListPer;
    }

    public Long getIdPro() {
        return idPro;
    }
}
