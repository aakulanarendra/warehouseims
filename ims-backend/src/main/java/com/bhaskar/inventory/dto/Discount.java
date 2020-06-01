package com.bhaskar.inventory.dto;

import lombok.Data;

@Data
public class Discount {
    private String offerType;
    private String offerValue;
    private String offerCode;
}
