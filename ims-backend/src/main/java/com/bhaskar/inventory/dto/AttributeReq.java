package com.bhaskar.inventory.dto;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

@Data
public class AttributeReq {
    private String attributeType;
    private Map<String,String> attributeValue;
}
