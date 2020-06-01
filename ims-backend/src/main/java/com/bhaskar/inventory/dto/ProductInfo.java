package com.bhaskar.inventory.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductInfo {
    private String productId;
    private String offerId;
    private Double price;
    private Integer quantity;
    BigDecimal tax;
}
