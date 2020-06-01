package com.bhaskar.inventory.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderProduct {
    private List<String> imageUrls;
    private String sku;
    private String skuName;
    private BigDecimal price;
    private Integer quantity;
    private BigDecimal discount;
    private BigDecimal total;
    private BigDecimal tax;
}
