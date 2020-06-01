package com.bhaskar.inventory.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderProductReq {
    private String skuId;
    private String skuName;
    private Integer quantity;
    private BigDecimal price;
}
