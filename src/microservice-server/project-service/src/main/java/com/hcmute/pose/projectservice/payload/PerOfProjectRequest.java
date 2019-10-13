package com.hcmute.pose.projectservice.payload;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class PerOfProjectRequest {

    @NotBlank(message = "Not null idListPer")
    private List<Long> idListPer;

    @NotBlank(message = "Not null idListPer")
    private Long idPro;

    public PerOfProjectRequest(@NotBlank(message = "Not null idListPer") List<Long> idListPer, @NotBlank(message = "Not null idListPer") Long idPro) {
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
